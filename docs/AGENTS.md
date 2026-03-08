# AGENTS.md - Documentation Translation Workspace

## Read When

- Maintaining `docs/zh-CN/**`
- Updating the Chinese translation pipeline (glossary/TM/prompt)
- Handling Chinese translation regressions or user feedback

## Pipeline (`docs-i18n`)

- Source docs: `docs/**/*.md`
- Target docs: `docs/zh-CN/**/*.md`
- Glossary: `docs/.i18n/glossary.zh-CN.json`
- Translation memory: `docs/.i18n/zh-CN.tm.jsonl`
- Prompt rules: `scripts/docs-i18n/translator.go`

Common commands:

```bash
# Batch translation (doc mode, parallelizable)
go run scripts/docs-i18n/main.go -mode doc -parallel 6 docs/**/*.md

# Single file
go run scripts/docs-i18n/main.go -mode doc docs/channels/matrix.md

# Small patch (segment mode, uses TM; not parallel)
go run scripts/docs-i18n/main.go -mode segment docs/channels/matrix.md
```

Notes:

- Use `doc` mode for full-page translation.
- Use `segment` mode for scoped patching with translation memory.
- For very large files, prefer targeted replacements or splitting the file before rerunning.
- After translation, verify quote style, CJK-Latin spacing, and term consistency.

## zh-CN Style Rules

- CJK-Latin spacing: follow W3C CLREQ (for example, `Gateway 网关`, `Skills 配置`).
- Chinese quotes: use `“”` in prose and headings.
- Keep ASCII quotes in code, CLI examples, and key names.
- Keep these terms in English: `Skills`, `local loopback`, `Tailscale`.
- Do not alter code blocks or inline code formatting.

## Key Terms (from #6995 fixes)

- `Gateway 网关`
- `Skills 配置`
- `沙箱`
- `预期键名`
- `配套应用`
- `分块流式传输`
- `设备发现`

## Feedback and Change Log

- Feedback source: GitHub issue #6995
- Reporters: @AaronWander, @taiyi747, @Explorer1092, @rendaoyuan
- Change summary: prompt rule updates, glossary expansion, TM cleanup, batch regeneration, and targeted fixes
- Reference: https://github.com/NJX-njx/opensoul/issues/6995
