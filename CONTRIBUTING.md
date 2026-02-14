# Contributing to OpenSoul

Thank you for your interest in contributing to OpenSoul! This guide will help you get started.

## Getting Started

### Prerequisites

- **Node.js** ≥ 22
- **pnpm** (managed via `packageManager` field in `package.json`)
- **Git**

### Setup

```bash
# Fork and clone the repository
git clone https://github.com/<your-username>/opensoul.git
cd opensoul

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in development mode
pnpm dev
```

### Verify Your Setup

```bash
# Run the full check (type-check + lint + format)
pnpm check

# Run tests
pnpm test
```

## Project Structure

```
src/          — Core agent engine (TypeScript, ESM)
extensions/   — Channel integrations and feature plugins
skills/       — Built-in agent skills
apps/         — Native platform apps (macOS, iOS, Android, Windows)
ui/           — Web Control UI
packages/     — Internal packages
docs/         — Documentation
scripts/      — Build and utility scripts
```

## Development Workflow

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make your changes** following our [coding style](#coding-style).

3. **Run checks** before committing:
   ```bash
   pnpm check
   pnpm test
   ```

4. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add support for new channel"
   ```

5. **Push and create a Pull Request**.

## Coding Style

- **Language**: TypeScript (ESM modules)
- **Formatting**: [Oxfmt](https://oxc.rs/) — run `pnpm format:fix` to auto-format
- **Linting**: [Oxlint](https://oxc.rs/) — run `pnpm lint:fix` to auto-fix
- **Naming**:
  - `camelCase` for functions and variables
  - `kebab-case` for file names
  - `UPPER_SNAKE_CASE` for constants
- **Exports**: Prefer named exports over default exports
- **Functions**: Prefer `function foo()` over `const foo = () =>`
- **Arrays**: Use `Array<T>` instead of `T[]`

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Description |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance tasks |

## What to Contribute

### Good First Issues

Look for issues labeled [`good first issue`](https://github.com/NJX-njx/opensoul/labels/good%20first%20issue) — these are beginner-friendly tasks.

### Ideas for Contributions

- **New channel extensions** — Add support for more messaging platforms
- **New skills** — Build skills for popular tools and services
- **Documentation** — Improve guides, add examples, fix typos
- **Bug fixes** — Check the [issue tracker](https://github.com/NJX-njx/opensoul/issues)
- **Tests** — Improve test coverage
- **Translations** — Help translate docs to more languages

### Adding a New Extension

Extensions live in `extensions/<name>/`. Each extension is a self-contained module. See existing extensions for reference patterns.

### Adding a New Skill

Skills live in `skills/<name>/`. Follow the structure of existing skills to create your own.

## Reporting Bugs

Use the [Bug Report template](https://github.com/NJX-njx/opensoul/issues/new?template=bug_report.md) and include:

- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, install method)
- Relevant logs or screenshots

## Requesting Features

Use the [Feature Request template](https://github.com/NJX-njx/opensoul/issues/new?template=feature_request.md) and describe:

- The problem you're trying to solve
- Your proposed solution
- Alternatives you've considered

## Code of Conduct

Be respectful, inclusive, and constructive. We are building a welcoming community for everyone.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for helping make OpenSoul better! 🎉
