import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream, createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";
import type { SessionEntry } from "../config/sessions/types.js";
import type { RuntimeEnv } from "../runtime.js";
import { loadConfig } from "../config/config.js";
import { loadSessionStore, resolveSessionFilePath, resolveStorePath } from "../config/sessions.js";
import { resolveSessionTranscriptsDirForAgent } from "../config/sessions/paths.js";
import { normalizeAgentId } from "../routing/session-key.js";

type SessionLogPruneOptions = {
  days?: number;
  user?: string;
  agentId?: string;
  store?: string;
  archiveDir?: string;
  dryRun?: boolean;
  s3Bucket?: string;
  s3Prefix?: string;
  s3Region?: string;
  report?: string;
  metricsPath?: string;
};

type PruneReportEntry = {
  sessionKey: string;
  sessionId: string;
  filePath: string;
  sizeBytes: number;
  updatedAt: number;
  archivedPath?: string;
  uploadedKey?: string;
  reason: string;
};

function matchesUser(entry: SessionEntry, userId: string): boolean {
  const candidates = [
    entry.origin?.from,
    entry.origin?.to,
    entry.origin?.accountId,
    entry.lastTo,
    entry.lastAccountId,
    entry.deliveryContext?.to,
    entry.deliveryContext?.from,
  ].filter(Boolean);
  return candidates.some((value) => String(value).includes(userId));
}

function resolveArchiveDir(opts: SessionLogPruneOptions, agentId: string): string {
  if (opts.archiveDir) {
    return path.resolve(opts.archiveDir);
  }
  const base = resolveSessionTranscriptsDirForAgent(agentId);
  return path.join(base, "archive");
}

function formatMetricLine(name: string, value: number): string {
  return `${name} ${Math.round(value)}`;
}

export async function sessionLogPruneCommand(runtime: RuntimeEnv, opts: SessionLogPruneOptions) {
  const cfg = loadConfig();
  const agentId = normalizeAgentId(opts.agentId ?? "main");
  const storePath = resolveStorePath(opts.store ?? cfg.session?.store, { agentId });
  const store = loadSessionStore(storePath);
  const days = typeof opts.days === "number" && Number.isFinite(opts.days) ? opts.days : 30;
  const cutoffMs = Date.now() - Math.max(1, days) * 24 * 60 * 60 * 1000;
  const archiveDir = resolveArchiveDir(opts, agentId);
  const dryRun = Boolean(opts.dryRun);
  const userId = opts.user?.trim();

  const reportEntries: PruneReportEntry[] = [];
  let prunedBytes = 0;

  const s3Bucket = opts.s3Bucket?.trim();
  const s3Prefix = opts.s3Prefix?.trim() ?? "opensoul/session-logs";
  const s3Region = opts.s3Region?.trim();
  const s3Client =
    s3Bucket && s3Region ? new S3Client({ region: s3Region }) : s3Bucket ? new S3Client({}) : null;

  if (!dryRun) {
    await fs.mkdir(archiveDir, { recursive: true });
  }

  for (const [sessionKey, entry] of Object.entries(store)) {
    if (!entry?.updatedAt) {
      continue;
    }
    const isUserMatch = userId ? matchesUser(entry, userId) : true;
    if (!isUserMatch) {
      continue;
    }
    const isExpired = entry.updatedAt <= cutoffMs;
    if (!isExpired && !userId) {
      continue;
    }

    const filePath = resolveSessionFilePath(entry.sessionId, entry, { agentId });
    try {
      const stat = await fs.stat(filePath);
      const sizeBytes = stat.size;
      const fileName = path.basename(filePath);
      const archivePath = path.join(archiveDir, `${fileName}.gz`);
      const day = new Date(entry.updatedAt || Date.now());
      const prefix = `${s3Prefix}/${agentId}/${day.getUTCFullYear()}/${String(day.getUTCMonth() + 1).padStart(2, "0")}/${String(day.getUTCDate()).padStart(2, "0")}`;
      const s3Key = `${prefix}/${fileName}.gz`;

      if (!dryRun) {
        await pipeline(
          createReadStream(filePath),
          zlib.createGzip(),
          createWriteStream(archivePath),
        );
        await fs.unlink(filePath);
        if (s3Client && s3Bucket) {
          await s3Client.send(
            new PutObjectCommand({
              Bucket: s3Bucket,
              Key: s3Key,
              Body: createReadStream(archivePath),
              ContentType: "application/gzip",
            }),
          );
        }
      }

      prunedBytes += sizeBytes;
      reportEntries.push({
        sessionKey,
        sessionId: entry.sessionId,
        filePath,
        sizeBytes,
        updatedAt: entry.updatedAt,
        archivedPath: dryRun ? undefined : archivePath,
        uploadedKey: dryRun || !s3Bucket ? undefined : s3Key,
        reason: userId && !isExpired ? "user-match" : userId ? "retention+user" : "retention",
      });
    } catch (err) {
      runtime.error(`Failed to prune session ${sessionKey}: ${String(err)}`);
    }
  }

  const report = {
    cutoffMs,
    days,
    dryRun,
    storePath,
    archiveDir,
    prunedBytes,
    prunedCount: reportEntries.length,
    entries: reportEntries,
  };

  if (opts.report) {
    await fs.writeFile(path.resolve(opts.report), JSON.stringify(report, null, 2));
  }

  const metricsLines = [
    "# HELP pruned_bytes_total Total bytes pruned from session logs",
    "# TYPE pruned_bytes_total counter",
    formatMetricLine("pruned_bytes_total", prunedBytes),
  ].join("\n");

  if (opts.metricsPath) {
    await fs.writeFile(path.resolve(opts.metricsPath), metricsLines);
  } else {
    runtime.log(metricsLines);
  }
}
