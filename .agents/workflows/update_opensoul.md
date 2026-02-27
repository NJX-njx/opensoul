---
description: Update OpenSoul from upstream when branch has diverged (ahead/behind)
---

# OpenSoul Upstream Sync Workflow

Use this workflow when your fork has diverged from upstream (e.g., "18 commits ahead, 29 commits behind").

## Quick Reference

```bash
# Check divergence status
git fetch upstream && git rev-list --left-right --count main...upstream/main

# Full sync (rebase preferred)
git fetch upstream && git rebase upstream/main && pnpm install && pnpm build

# Check for Swift 6.2 issues after sync
grep -r "FileManager\.default\|Thread\.isMainThread" apps/ --include="*.swift"
```

---

## Step 1: Assess Divergence

```bash
git fetch upstream
git log --oneline --left-right main...upstream/main | head -20
```

This shows:

- `<` = your local commits (ahead)
- `>` = upstream commits you're missing (behind)

**Decision point:**

- Few local commits, many upstream → **Rebase** (cleaner history)
- Many local commits or shared branch → **Merge** (preserves history)

---

## Step 2A: Rebase Strategy (Preferred)

Replays your commits on top of upstream. Results in linear history.

```bash
git status
git rebase upstream/main
```

### Handling Rebase Conflicts

```bash
# Fix conflicts in the listed files, then:
git add <resolved-files>
git rebase --continue

# If a commit is no longer needed (already in upstream):
git rebase --skip

# To abort and return to original state:
git rebase --abort
```

### Common Conflict Patterns

| File             | Resolution                                       |
| ---------------- | ------------------------------------------------ |
| `package.json`   | Take upstream deps, keep local scripts if needed |
| `pnpm-lock.yaml` | Accept upstream, regenerate with `pnpm install`  |
| `*.patch` files  | Usually take upstream version                    |
| Source files     | Merge logic carefully, prefer upstream structure |

---

## Step 2B: Merge Strategy (Alternative)

Preserves all history with a merge commit.

```bash
git merge upstream/main --no-edit
```

Resolve conflicts same as rebase, then:

```bash
git add <resolved-files>
git commit
```

---

## Step 3: Rebuild Everything

After sync completes:

```bash
pnpm install
OPENSOUL_A2UI_SKIP_MISSING=1 pnpm build
pnpm ui:build
pnpm opensoul doctor
```

---

## Step 4: Rebuild macOS App (if applicable)

Skip this step if you are not developing on macOS.

```bash
./scripts/restart-mac.sh

# Or just package without restart
pnpm mac:package
```

---

## Step 5: Handle Swift/macOS Build Issues

Upstream updates may introduce Swift 6.2 / macOS 26 SDK incompatibilities.

### Common Swift 6.2 Fixes

**FileManager.default Deprecation:**

```bash
grep -r "FileManager\.default" apps/ --include="*.swift"
# Replace with: FileManager()
```

**Thread.isMainThread Deprecation:**

```bash
grep -r "Thread\.isMainThread" apps/ --include="*.swift"
# Replace with: MainActor.run { ... } or DispatchQueue.main.sync { ... }
```

### Rebuild After Fixes

```bash
rm -rf apps/macos/.build apps/macos/.swiftpm
pnpm canvas:a2ui:bundle
./scripts/restart-mac.sh
```

---

## Step 6: Verify and Push

```bash
pnpm opensoul health
pnpm test

# Push (force required after rebase)
git push origin main --force-with-lease

# Or regular push after merge
git push origin main
```

---

## Troubleshooting

### Build Fails After Sync

```bash
rm -rf node_modules dist
pnpm install
OPENSOUL_A2UI_SKIP_MISSING=1 pnpm build
```

### Type Errors (Bun/Node Incompatibility)

Common issue: `fetch.preconnect` type mismatch. Fix by using `FetchLike` type instead of `typeof fetch`.

### macOS App Crashes on Launch

Usually resource bundle mismatch. Full rebuild required:

```bash
cd apps/macos && rm -rf .build .swiftpm
./scripts/restart-mac.sh
```

### Patch Failures

```bash
pnpm install 2>&1 | grep -i patch
# If patches fail, they may need updating for new dep versions
```
