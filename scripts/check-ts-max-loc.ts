import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

type ParsedArgs = {
  maxLines: number;
  maxFunctionLines: number;
  topCount: number;
  reportPath?: string;
};

function parseArgs(argv: string[]): ParsedArgs {
  let maxLines = 500;
  let maxFunctionLines = 150;
  let topCount = 10;
  let reportPath: string | undefined;

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === "--max") {
      const next = argv[index + 1];
      if (!next || Number.isNaN(Number(next))) {
        throw new Error("Missing/invalid --max value");
      }
      maxLines = Number(next);
      index++;
      continue;
    }
    if (arg === "--max-function") {
      const next = argv[index + 1];
      if (!next || Number.isNaN(Number(next))) {
        throw new Error("Missing/invalid --max-function value");
      }
      maxFunctionLines = Number(next);
      index++;
      continue;
    }
    if (arg === "--top") {
      const next = argv[index + 1];
      if (!next || Number.isNaN(Number(next))) {
        throw new Error("Missing/invalid --top value");
      }
      topCount = Number(next);
      index++;
      continue;
    }
    if (arg === "--report") {
      const next = argv[index + 1];
      if (!next) {
        throw new Error("Missing --report value");
      }
      reportPath = next;
      index++;
      continue;
    }
  }

  return { maxLines, maxFunctionLines, topCount, reportPath };
}

function gitLsFilesAll(): string[] {
  // Include untracked files too so local refactors don’t “pass” by accident.
  const stdout = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    encoding: "utf8",
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function countLines(filePath: string): Promise<{ lines: number; content: string }> {
  const content = await readFile(filePath, "utf8");
  return { lines: content.split("\n").length, content };
}

type FunctionSpan = {
  name: string;
  lines: number;
  startLine: number;
};

function getFunctionSpans(filePath: string, content: string): FunctionSpan[] {
  const extension = path.extname(filePath).toLowerCase();
  const scriptKind = extension === ".tsx" ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
  const spans: FunctionSpan[] = [];

  const visit = (node: ts.Node) => {
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isConstructorDeclaration(node) ||
      ts.isGetAccessorDeclaration(node) ||
      ts.isSetAccessorDeclaration(node)
    ) {
      const start = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
      const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
      const lines = Math.max(1, end.line - start.line + 1);
      let name = "<anonymous>";
      if ("name" in node && node.name && ts.isIdentifier(node.name)) {
        name = node.name.text;
      } else if (ts.isMethodDeclaration(node) && node.name && ts.isIdentifier(node.name)) {
        name = node.name.text;
      }
      spans.push({ name, lines, startLine: start.line + 1 });
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return spans;
}

async function main() {
  // Makes `... | head` safe.
  process.stdout.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EPIPE") {
      process.exit(0);
    }
    throw error;
  });

  const { maxLines, maxFunctionLines, topCount, reportPath } = parseArgs(process.argv.slice(2));
  const files = gitLsFilesAll()
    .filter((filePath) => existsSync(filePath))
    .filter((filePath) => filePath.endsWith(".ts") || filePath.endsWith(".tsx"));

  const results = await Promise.all(
    files.map(async (filePath) => {
      const { lines, content } = await countLines(filePath);
      const functionSpans = getFunctionSpans(filePath, content);
      const maxFunction = functionSpans.reduce((max, span) => Math.max(max, span.lines), 0);
      return { filePath, lines, maxFunction, functionSpans };
    }),
  );

  const fileOffenders = results
    .filter((result) => result.lines > maxLines)
    .toSorted((a, b) => b.lines - a.lines);
  const functionOffenders = results.flatMap((result) =>
    result.functionSpans
      .filter((span) => span.lines > maxFunctionLines)
      .map((span) => ({
        filePath: result.filePath,
        name: span.name,
        lines: span.lines,
        startLine: span.startLine,
      })),
  );

  const topFiles = results.toSorted((a, b) => b.lines - a.lines).slice(0, topCount);

  if (reportPath) {
    const payload = {
      maxLines,
      maxFunctionLines,
      topFiles: topFiles.map((entry) => ({ filePath: entry.filePath, lines: entry.lines })),
      fileOffenders: fileOffenders.map((entry) => ({
        filePath: entry.filePath,
        lines: entry.lines,
      })),
      functionOffenders,
    };
    await import("node:fs/promises").then((fs) =>
      fs.writeFile(reportPath, JSON.stringify(payload, null, 2)),
    );
  }

  if (fileOffenders.length === 0 && functionOffenders.length === 0) {
    return;
  }

  for (const offender of fileOffenders) {
    console.log(`FILE\t${offender.lines}\t${offender.filePath}`);
  }
  for (const offender of functionOffenders) {
    console.log(
      `FUNC\t${offender.lines}\t${offender.filePath}:${offender.startLine}\t${offender.name}`,
    );
  }

  process.exitCode = 1;
}

await main();
