---
summary: "Desktop interaction blueprint for OpenSoul macOS and Control UI surfaces"
read_when:
  - Designing or refactoring the desktop app UX
  - Aligning menu bar, chat, settings, and dashboard interactions
title: "Desktop App Interaction Design"
---

# Desktop App Interaction Design (v1.1)

## 1) Product Frame

- Target users:
  - Solo builders and developers running OpenSoul as an always-on assistant.
  - Operators managing channels, sessions, skills, nodes, and automation from one control point.
- Core task loop:
  - Observe status -> Intervene quickly -> Configure safely -> Verify health.
- Primary platform constraints:
  - Menu bar app is a core entry point (`apps/macos/Sources/OpenSoul/MenuBar.swift`).
  - Quick controls are exposed in menu content (`apps/macos/Sources/OpenSoul/MenuContentView.swift`).
  - Full chat lives in a floating window/panel (`apps/macos/Sources/OpenSoul/WebChatSwiftUI.swift`).
  - Settings are tab-based (`apps/macos/Sources/OpenSoul/SettingsRootView.swift`).
  - Browser Control UI provides deep operations (`ui/src/ui/navigation.ts`).

## 2) Existing Feature Coverage (Must Keep)

### Desktop app surfaces

- Onboarding flow:
  - Welcome, gateway selection, auth, wizard, permissions, CLI, onboarding chat, ready state
  - Source: `apps/macos/Sources/OpenSoul/OnboardingView+Pages.swift`.
- Menu bar quick controls:
  - Active/pause, heartbeat, browser control, camera, exec approvals, canvas, voice wake, mic selection
  - Open dashboard, open chat, open canvas, talk mode, settings/about/debug/quit
  - Source: `apps/macos/Sources/OpenSoul/MenuContentView.swift`.
- Settings tabs:
  - General, Channels, Voice Wake, Config, Instances, Sessions, Cron, Skills, Permissions, Debug, About
  - Source: `apps/macos/Sources/OpenSoul/SettingsRootView.swift`.

### Control UI surfaces

- Chat, overview, channels, instances, sessions, usage, cron, agents, skills, nodes, config, debug, logs
- Source: `ui/src/ui/navigation.ts`.

## 3) Design Direction

Use a hybrid of:

- GitHub-like structured workbench for status-heavy operations.
- Notion-like calm canvas for writing, onboarding, and long-form assistant interaction.
- Cursor-like high-speed command interaction for power users.

Direction rules:

- Dark-first visual language with light-theme parity as secondary.
- Keep information density high but scannable.
- Preserve keyboard-first flows for daily operations.
- Use semantic status colors and explicit state labeling.
- Minimize mode confusion between menu bar quick actions and deep configuration.

## 4) Information Architecture

## 4.1 Surface model

- Surface A: `Menu Quick Surface` (status + immediate controls).
- Surface B: `Desktop Workbench` (power-user operational window).
- Surface C: `Settings Center` (stable system configuration).
- Surface D: `Control UI` (browser parity + remote operations).

## 4.2 Desktop Workbench navigation

Use four top-level domains:

1. `Assist`
   - Chat
   - Canvas
   - Session switcher
2. `Operate`
   - Channels
   - Instances
   - Sessions
   - Cron
   - Usage
3. `Build`
   - Agents
   - Skills
   - Nodes
4. `System`
   - Overview/health
   - Config
   - Logs
   - Debug (gated by debug mode)

## 4.3 Necessary settings grouping

Group settings by user intent, while preserving all existing controls:

1. `Runtime`
   - OpenSoul active, launch at login, dock icon, icon animations.
2. `Connectivity`
   - Local/remote mode, SSH/direct transport, remote test, gateway status.
3. `Capabilities`
   - Canvas, camera, voice wake, talk mode, microphone routing.
4. `Operations`
   - Channels, sessions defaults, cron, instances behavior.
5. `Agent Platform`
   - Skills, agent capabilities, node permissions.
6. `Security`
   - Permissions, exec approval defaults, pairing states.
7. `Advanced`
   - Config raw/form editing, debug tools, logs.
8. `About`
   - Version/update/license.

## 4.4 Feature-to-surface mapping (implementation baseline)

| Existing capability | Primary surface | Secondary surface |
| --- | --- | --- |
| Quick status and toggles | Menu Quick Surface | Settings Center |
| Daily assistant chat | Menu chat panel | Desktop Workbench (Assist) |
| Channel operations | Desktop Workbench (Operate) | Control UI `/channels` |
| Sessions and usage analysis | Desktop Workbench (Operate) | Control UI `/sessions`, `/usage` |
| Cron management | Desktop Workbench (Operate) | Control UI `/cron` |
| Skills and agents | Desktop Workbench (Build) | Control UI `/skills`, `/agents` |
| Node and pairing operations | Desktop Workbench (Build/System) | Control UI `/nodes` |
| Config editing and debug tools | Settings Center (Advanced) | Control UI `/config`, `/debug`, `/logs` |

## 5) Key Screen Specs

## 5.1 Screen A: Menu Quick Surface

- Purpose:
  - Give immediate confidence and control in under 5 seconds.
- Layout:
  - Status block (gateway + heartbeat + pending approvals).
  - Quick toggles block.
  - Action launcher block.
  - System block (settings/about/quit).
- Interaction:
  - Single-click menu icon opens chat panel.
  - Right-click opens quick menu.
  - All toggles reflect real backend state within one refresh cycle.

## 5.2 Screen B: Desktop Workbench Home

- Purpose:
  - Serve as the power-user control center while keeping menu-first onboarding.
- Layout:
  - Left rail: four domains.
  - Top bar: connection state, active session, global command input.
  - Main pane: selected domain.
  - Context pane: details, recent actions, warnings.
- Interaction:
  - `Cmd+K` command palette.
  - `Cmd+1..4` switch domains.
  - `Cmd+Shift+L` focus logs.

## 5.3 Screen C: Assist (Chat + Canvas)

- Purpose:
  - Keep conversational work and visual outputs together.
- Layout:
  - Chat timeline pane.
  - Tool events timeline strip.
  - Optional canvas preview pane with resizable divider.
- Interaction:
  - Keep run controls sticky at the bottom.
  - Show tool output in side drawer, not modal.
  - Preserve context when switching sessions.

## 5.4 Screen D: Operate (Channels/Sessions/Cron/Usage)

- Purpose:
  - Run and monitor operations safely.
- Layout:
  - Table-first pages with filter/search row.
  - Persistent state chips (ok/degraded/disconnected/pending auth).
- Interaction:
  - Fast filtering, batched actions, clear rollback for destructive actions.
  - Require explicit confirmation only for irreversible actions.

## 5.5 Screen E: Settings Center

- Purpose:
  - Keep advanced controls available without overwhelming first-time users.
- Layout:
  - Vertical section list by intent (Runtime, Connectivity, ...).
  - Main form pane with inline validation and explainers.
  - Optional diagnostics side panel for current gateway health.
- Interaction:
  - Mark changed fields before save.
  - Keep "Test remote" near remote transport fields.
  - Keep sensitive actions visually separated (debug, reset, delete).

## 6) Component and State Matrix

| Component | Default | Hover | Focus | Active | Loading | Success | Error | Disabled | Permission |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Global status chip | Shows mode | Elevate | Focus ring | N/A | Pulsing dot | Green badge | Red badge + reason | Muted | Tooltip |
| Quick toggle row | Label + state | Highlight row | Focus outline | Switch on/off | Spinner for async save | Check toast | Inline error text | Reduced contrast | Shield icon |
| Action launcher button | Label + icon | Fill +1 | Focus ring | Pressed depth | Spinner icon | Check icon | Warning icon | Muted | Lock icon |
| Table row (sessions/channels) | Compact row | Row highlight | Outline | Selected fill | Skeleton row | Status chip | Error badge | Muted text | Restricted badge |
| Destructive action | Secondary style | Warn tint | Warn focus | Confirm step | Busy lock | Undo toast | Sticky alert | Disabled | N/A |

## 7) Token and Visual Rules

- Typography:
  - Use SF Pro for UI text, SF Mono for technical values (paths, ids, commands).
  - 3-level hierarchy: title, section, compact body.
- Color:
  - Dark-first neutral base for structure.
  - Suggested core palette:
    - `bg.app` `#0D1117`
    - `bg.panel` `#161B22`
    - `bg.elevated` `#1F2630`
    - `border.default` `#30363D`
    - `text.primary` `#E6EDF3`
    - `text.secondary` `#9DA7B3`
    - `accent.primary` `#2F81F7`
    - `accent.muted` `#1F6FEB`
    - `success` `#3FB950`
    - `warning` `#D29922`
    - `danger` `#F85149`
  - Keep contrast and spacing calm like Notion; keep status semantics explicit like GitHub.
  - Semantic tokens only for state (success/warn/error/info).
  - Do not encode status with color alone; always add text/icon.
- Spacing:
  - 4/8/12/16/24 scale.
  - Dense tables use 8-12 vertical rhythm.
- Motion:
  - 120-180ms for panel transitions.
  - 80-120ms for button/toggle feedback.
  - No decorative motion on critical status updates.

## 8) Accessibility and Usability Baseline

- Full keyboard path for all primary operations.
- Visible focus ring for every interactive element.
- Hit target >= 32 px for compact controls and >= 40 px for primary actions.
- Contrast target:
  - 4.5:1 for body text.
  - 3:1 for large text and icons.
- Avoid hidden critical actions behind hover-only affordances.

## 9) Rollout Plan

1. Phase 1: Navigation and IA alignment
   - Add unified domain model across desktop workbench and Control UI tabs.
   - Keep existing actions and APIs unchanged.
2. Phase 2: Settings intent regrouping
   - Reorder settings by user intent without removing current options.
   - Add inline explainers and state chips.
3. Phase 3: Visual and interaction polish
   - Apply tokenized spacing/type/color.
   - Add command palette and keyboard map overlay.
4. Phase 4: Cross-surface consistency
   - Align labels and states between menu, settings, and dashboard.

## 10) Final Product Decisions

- Keep menu-first as the default entry mode; `Desktop Workbench` is an advanced/power surface.
- Keep `Debug` hidden by default for non-advanced users.
- Keep `Control UI` browser-first; desktop app provides deep links and state parity, not full embed in v1.
- Use dark-first visual strategy with GitHub + Notion interaction tone.
