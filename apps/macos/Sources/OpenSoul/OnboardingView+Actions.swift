import AppKit
import OpenSoulDiscovery
import OpenSoulIPC
import Foundation
import SwiftUI

extension OnboardingView {
    func selectLocalGateway() {
        self.state.connectionMode = .local
        self.preferredGatewayID = nil
        self.showAdvancedConnection = false
        GatewayDiscoveryPreferences.setPreferredStableID(nil)
    }

    func selectUnconfiguredGateway() {
        Task { await self.onboardingWizard.cancelIfRunning() }
        self.state.connectionMode = .unconfigured
        self.preferredGatewayID = nil
        self.showAdvancedConnection = false
        GatewayDiscoveryPreferences.setPreferredStableID(nil)
    }

    func selectRemoteGateway(_ gateway: GatewayDiscoveryModel.DiscoveredGateway) {
        Task { await self.onboardingWizard.cancelIfRunning() }
        self.preferredGatewayID = gateway.stableID
        GatewayDiscoveryPreferences.setPreferredStableID(gateway.stableID)

        if self.state.remoteTransport == .direct {
            if let url = GatewayDiscoveryHelpers.directUrl(for: gateway) {
                self.state.remoteUrl = url
            }
        } else if let host = GatewayDiscoveryHelpers.sanitizedTailnetHost(gateway.tailnetDns) ?? gateway.lanHost {
            let user = NSUserName()
            self.state.remoteTarget = GatewayDiscoveryModel.buildSSHTarget(
                user: user,
                host: host,
                port: gateway.sshPort)
            OpenSoulConfigFile.setRemoteGatewayUrl(host: host, port: gateway.gatewayPort)
        }
        self.state.remoteCliPath = gateway.cliPath ?? ""

        self.state.connectionMode = .remote
        MacNodeModeCoordinator.shared.setPreferredGatewayStableID(gateway.stableID)
    }

    func openSettings(tab: SettingsTab) {
        SettingsTabRouter.request(tab)
        self.openSettings()
        DispatchQueue.main.async {
            NotificationCenter.default.post(name: .opensoulSelectSettingsTab, object: tab)
        }
    }

    func handleBack() {
        withAnimation {
            self.currentPage = max(0, self.currentPage - 1)
        }
    }

    func handleNext() {
        if self.isWizardBlocking { return }
        if self.currentPage < self.pageCount - 1 {
            withAnimation { self.currentPage += 1 }
        } else {
            self.finish()
        }
    }

    func finish() {
        UserDefaults.standard.set(true, forKey: "opensoul.onboardingSeen")
        UserDefaults.standard.set(currentOnboardingVersion, forKey: onboardingVersionKey)
        OnboardingController.shared.close()
    }

    func copyToPasteboard(_ text: String) {
        let pb = NSPasteboard.general
        pb.clearContents()
        pb.setString(text, forType: .string)
        self.copied = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.2) { self.copied = false }
    }

    func startAnthropicOAuth() {
        guard !self.anthropicAuthBusy else { return }
        self.anthropicAuthBusy = true
        defer { self.anthropicAuthBusy = false }

        do {
            let pkce = try AnthropicOAuth.generatePKCE()
            self.anthropicAuthPKCE = pkce
            let url = AnthropicOAuth.buildAuthorizeURL(pkce: pkce)
            NSWorkspace.shared.open(url)
            self.anthropicAuthStatus = "Browser opened. After approving, paste the `code#state` value here."
        } catch {
            self.anthropicAuthStatus = "Failed to start OAuth: \(error.localizedDescription)"
        }
    }

    @MainActor
    func finishAnthropicOAuth() async {
        guard !self.anthropicAuthBusy else { return }
        guard let pkce = self.anthropicAuthPKCE else { return }
        self.anthropicAuthBusy = true
        defer { self.anthropicAuthBusy = false }

        guard let parsed = AnthropicOAuthCodeState.parse(from: self.anthropicAuthCode) else {
            self.anthropicAuthStatus = "OAuth failed: missing or invalid code/state."
            return
        }

        do {
            let creds = try await AnthropicOAuth.exchangeCode(
                code: parsed.code,
                state: parsed.state,
                verifier: pkce.verifier)
            try OpenSoulOAuthStore.saveAnthropicOAuth(creds)
            self.refreshAnthropicOAuthStatus()
            self.anthropicAuthStatus = "Connected. OpenSoul can now use Claude."
        } catch {
            self.anthropicAuthStatus = "OAuth failed: \(error.localizedDescription)"
        }
    }

    @MainActor
    func saveAnthropicApiKey() async {
        guard !self.anthropicApiKeySaving else { return }
        let trimmed = self.anthropicApiKey.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else {
            self.anthropicApiKeyStatus = "API key is required."
            return
        }
        if self.state.connectionMode != .local {
            self.anthropicApiKeyStatus = "Gateway is remote. Save the API key on the gateway host."
            return
        }
        self.anthropicApiKeySaving = true
        defer { self.anthropicApiKeySaving = false }

        do {
            let storeURL = self.authProfileStoreURL()
            try FileManager().createDirectory(
                at: storeURL.deletingLastPathComponent(),
                withIntermediateDirectories: true)
            var payload: [String: Any] = [:]
            if FileManager().fileExists(atPath: storeURL.path) {
                let data = try Data(contentsOf: storeURL)
                if let root = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                    payload = root
                }
            }
            var profiles = payload["profiles"] as? [String: Any] ?? [:]
            profiles["anthropic:default"] = [
                "type": "api_key",
                "provider": "anthropic",
                "key": trimmed,
            ]
            payload["version"] = payload["version"] ?? 1
            payload["profiles"] = profiles

            let data = try JSONSerialization.data(
                withJSONObject: payload,
                options: [.prettyPrinted, .sortedKeys])
            try data.write(to: storeURL, options: [.atomic])
            self.anthropicApiKey = ""
            self.anthropicApiKeyStatus = "Saved API key to \(storeURL.path)."
        } catch {
            self.anthropicApiKeyStatus = "Failed to save API key: \(error.localizedDescription)"
        }
    }

    func authProfileStoreURL() -> URL {
        let root = OpenSoulConfigFile.loadDict()
        let agentId = self.resolveDefaultAgentId(root: root)
        let agentDir = self.resolveAgentDir(root: root, agentId: agentId)
        return agentDir.appendingPathComponent("auth-profiles.json")
    }

    private func resolveDefaultAgentId(root: [String: Any]) -> String {
        let agents = root["agents"] as? [String: Any]
        let list = agents?["list"] as? [[String: Any]] ?? []
        if list.isEmpty {
            return "main"
        }
        if let preferred = list.first(where: { ($0["default"] as? Bool) == true }),
           let raw = preferred["id"] as? String
        {
            let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
            return trimmed.isEmpty ? "main" : trimmed.lowercased()
        }
        if let raw = list.first?["id"] as? String {
            let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
            return trimmed.isEmpty ? "main" : trimmed.lowercased()
        }
        return "main"
    }

    private func resolveAgentDir(root: [String: Any], agentId: String) -> URL {
        let agents = root["agents"] as? [String: Any]
        let list = agents?["list"] as? [[String: Any]] ?? []
        if let match = list.first(where: { entry in
            guard let raw = entry["id"] as? String else { return false }
            return raw.trimmingCharacters(in: .whitespacesAndNewlines).lowercased() == agentId.lowercased()
        }) {
            if let rawDir = match["agentDir"] as? String {
                let trimmed = rawDir.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty {
                    let expanded = NSString(string: trimmed).expandingTildeInPath
                    return URL(fileURLWithPath: expanded, isDirectory: true)
                }
            }
        }
        return OpenSoulPaths.stateDirURL
            .appendingPathComponent("agents", isDirectory: true)
            .appendingPathComponent(agentId.lowercased(), isDirectory: true)
            .appendingPathComponent("agent", isDirectory: true)
    }

    func pollAnthropicClipboardIfNeeded() {
        guard self.currentPage == self.anthropicAuthPageIndex else { return }
        guard self.anthropicAuthPKCE != nil else { return }
        guard !self.anthropicAuthBusy else { return }
        guard self.anthropicAuthAutoDetectClipboard else { return }

        let pb = NSPasteboard.general
        let changeCount = pb.changeCount
        guard changeCount != self.anthropicAuthLastPasteboardChangeCount else { return }
        self.anthropicAuthLastPasteboardChangeCount = changeCount

        guard let raw = pb.string(forType: .string), !raw.isEmpty else { return }
        guard let parsed = AnthropicOAuthCodeState.parse(from: raw) else { return }
        guard let pkce = self.anthropicAuthPKCE, parsed.state == pkce.verifier else { return }

        let next = "\(parsed.code)#\(parsed.state)"
        if self.anthropicAuthCode != next {
            self.anthropicAuthCode = next
            self.anthropicAuthStatus = "Detected `code#state` from clipboard."
        }

        guard self.anthropicAuthAutoConnectClipboard else { return }
        Task { await self.finishAnthropicOAuth() }
    }
}
