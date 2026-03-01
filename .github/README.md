# .github

GitHub configuration for OpenSoul.

## Structure

```
.github/
├── README.md           # This file
├── actions/            # Composite actions
│   ├── detect-docs-only/   # Outputs docs_only for CI scope
│   └── setup-pnpm-store-cache/
├── workflows/          # GitHub Actions
│   ├── ci.yml          # Main CI (push/PR)
│   ├── welcome.yml     # First-time contributor welcome
│   ├── auto-response.yml   # Label-based auto-reply
│   ├── labeler.yml     # Auto-label by changed paths
│   ├── workflow-sanity.yml # Tab check in workflow files
│   ├── docker-release.yml  # Docker image on v* tags
│   ├── formal-conformance.yml  # Formal models (informational)
│   └── install-smoke.yml  # Install smoke (manual)
├── ISSUE_TEMPLATE/     # Issue templates
├── instructions/       # Copilot instructions (supplements)
├── dependabot.yml
├── labeler.yml         # Label rules
├── PULL_REQUEST_TEMPLATE.md
├── actionlint.yaml     # actionlint config
└── copilot-instructions.md  # AI agent instructions
```

## Validation

Run locally: `pnpm github:validate`
