---
summary: "Cross-platform client release-readiness matrix (Windows/macOS/iOS/Android)"
read_when:
  - Checking client availability before a release
  - Deciding which platforms to include in release notes
  - Updating platform status after a tagged release
title: "Client Release Readiness"
---

# Client Release-Readiness Matrix

This page is the single source of truth for native client availability across all platforms. It **must be reviewed and updated** at every tagged release (see the [release checklist](/reference/RELEASING)).

> **Scope:** native companion apps only. The Gateway (Node.js) and Web Control UI run on all platforms with Node 22+.

## Status legend

| Symbol | Meaning |
| ------ | ------- |
| ✅ GA | Publicly available, stable, auto-updates enabled |
| 🔶 Beta | Publicly available build with known rough edges |
| 🔷 Preview | Internal / limited distribution (not on public store/release) |
| 🚧 Planned | On the roadmap; no public build yet |
| ❌ N/A | Not planned for this platform |

## Matrix

| Platform | App status | Install route | Support level | Known blockers / notes |
| -------- | ---------- | ------------- | ------------- | ---------------------- |
| **macOS** | ✅ GA | GitHub Releases (zip) · Sparkle auto-update | Full | App must be Developer ID–signed + notarized. `APP_BUILD` must be monotonically increasing. See [macOS release](/platforms/mac/release). |
| **Windows** | 🔶 Beta | GitHub Releases (installer) · Velopack auto-update | Partial | Requires WebView2 runtime. System proxy detection added in v0.2.3. Store listing not yet submitted. Source: `apps/windows/`. |
| **iOS** | 🔷 Preview | Source only (`apps/ios/`) | Limited | Not on App Store. Internal preview build; pairing and Canvas work but push notifications are not yet wired to the Gateway. |
| **Android** | 🔷 Preview | Source only (`apps/android/`) | Limited | Not on Google Play. Sideload APK from CI artifacts or build locally. Camera/Canvas require foreground app. |

## Per-platform details

### macOS

- **App role:** menu-bar companion + Gateway broker (local mode) or remote node (remote mode).
- **Install:** download `OpenSoul-<version>.zip` from [Releases](https://github.com/NJX-njx/opensoul/releases), unzip, and move to `/Applications`. Sparkle handles subsequent updates.
- **Source:** `apps/macos/`
- **Full docs:** [macOS app](/platforms/macos)

### Windows

- **App role:** desktop companion (WebView2 shell). Connects to a local or remote Gateway.
- **Install:** download `OpenSoul-Windows-x64-<version>` installer from [Releases](https://github.com/NJX-njx/opensoul/releases) and run the setup wizard. Velopack handles subsequent updates.
- **Gateway on Windows:** use WSL2 (recommended). See [Windows platform docs](/platforms/windows).
- **Source:** `apps/windows/`
- **Blockers:** Microsoft Store submission pending; WebView2 bootstrap required on first install.

### iOS

- **App role:** node client (Canvas, Camera, Location, Talk mode, Voice wake).
- **Install (preview):** build from `apps/ios/` in Xcode and run on a provisioned device, or use an internal TestFlight link if one has been shared.
- **Blockers:** App Store review not yet initiated; push notification entitlement requires a paid Apple Developer account linked to the production bundle ID.
- **Full docs:** [iOS app](/platforms/ios)

### Android

- **App role:** node client (Canvas, Camera, Chat, foreground service).
- **Install (preview):** build from `apps/android/` with Android Studio, or sideload a debug APK from CI artifacts.
- **Blockers:** Google Play listing not yet submitted; background keep-alive restricted on some OEM builds (foreground service required).
- **Full docs:** [Android app](/platforms/android)

## Updating this matrix

When a new version is tagged:

1. Check the [release checklist](/reference/RELEASING) — step **"Client matrix refresh"** is a required gate.
2. Update the **App status** and **Known blockers** columns above for any platform whose build changed.
3. If a platform transitions from Preview → Beta → GA, update the install route accordingly.
4. Commit the change in the same release PR/branch so it ships with the tag.
