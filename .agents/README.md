# .agents

Agent workflows and skills for OpenSoul development and maintenance.

## Structure

```
.agents/
├── README.md           # This file
├── workflows/          # Reusable workflow guides
│   ├── pr-workflow.md  # PR review flow (review-pr → prepare-pr → merge-pr)
│   └── update_opensoul.md  # Upstream sync when fork has diverged
└── skills/             # Executable skills (Cursor/Codex)
    ├── review-pr/      # Review-only PR analysis
    ├── prepare-pr/     # Rebase, fix findings, run gates, push
    └── merge-pr/       # Squash merge after prep
```

## Workflows

| Workflow                                        | Description                                                                     |
| ----------------------------------------------- | ------------------------------------------------------------------------------- |
| [pr-workflow](workflows/pr-workflow.md)         | PR review instructions and maintainer checkpoints. Read before using PR skills. |
| [update_opensoul](workflows/update_opensoul.md) | Sync fork from upstream when branch has diverged (ahead/behind).                |

## Skills

| Skill        | Trigger      | Purpose                                              |
| ------------ | ------------ | ---------------------------------------------------- |
| `review-pr`  | `/reviewpr`  | Review PR, produce `.local/review.md`, no merge/push |
| `prepare-pr` | `/preparepr` | Rebase, fix findings, run gates, push to PR head     |
| `merge-pr`   | `/mergepr`   | Squash merge via `gh pr merge`, clean up worktree    |

Use skills in order: `review-pr` → `prepare-pr` → `merge-pr`. See [pr-workflow](workflows/pr-workflow.md) for full guidance.

## Conventions

- **Repo root:** Skills use `git rev-parse --show-toplevel` for portability (Windows/Unix).
- **Shell:** Commands assume Git Bash or WSL on Windows. Use `rg` (ripgrep) instead of `grep` where applicable.
- **Ports:** Do not kill processes on 18792 (browser CDP) or 19001 (gateway). See [AGENTS.md](../AGENTS.md).
