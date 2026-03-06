# AIRI -> OpenSoul 可映射改造与相关性全量分析（2026-03-06）

## 0. 文档目标

本文件用于系统化回答三件事：

1. AIRI 中哪些能力/实现可以映射到 OpenSoul。
2. 两者能力相关性有多高、差异在哪里。
3. OpenSoul 具体可以优化什么、按什么顺序做、做到什么算完成。

文档导向是“可落地改造”，不是泛泛技术点评。

---

## 1. 范围与证据基线

### 1.1 对照仓库

- AIRI: `C:\Users\ZhuanZ2\projects\agent\airi`
- OpenSoul: `C:\Users\ZhuanZ2\projects\agent\opensoul`（`NJX-njx/opensoul` 本地代码）

### 1.2 核心证据文件（节选）

#### AIRI（映射来源）

- `packages/plugin-sdk/src/plugin-host/core.ts`
- `packages/plugin-sdk/src/plugin-host/core.test.ts`
- `packages/plugin-sdk/src/plugin-host/transports/index.ts`
- `packages/plugin-sdk/src/plugin-host/runtimes/node/index.ts`
- `packages/plugin-protocol/src/types/events.ts`
- `packages/server-runtime/src/middlewares/route.ts`
- `packages/server-runtime/src/middlewares/route/match-expression.ts`
- `packages/server-sdk/src/client.ts`
- `packages/stage-ui/src/libs/providers/validators/run.ts`
- `packages/stage-ui/src/stores/providers/converters.ts`
- `packages/stage-ui/src/stores/providers/openai-compatible-builder.ts`
- `packages/stage-ui/src/stores/mods/api/context-bridge.ts`
- `packages/stage-ui/src/stores/devtools/websocket-inspector.ts`
- `packages/stage-ui/src/stores/devtools/plugin-host-debug.ts`
- `packages/stage-ui/src/stores/perf-tracer-bridge.ts`
- `packages/stage-ui/src/composables/use-local-first.ts`
- `packages/stage-ui/src/database/storage.ts`
- `packages/stage-ui/src/stores/character/orchestrator/agents/event-handler-spark-notify/index.ts`

#### OpenSoul（目标落点）

- `src/plugins/loader.ts`
- `src/plugins/registry.ts`
- `src/plugins/hooks.ts`
- `src/plugins/hook-runner-global.ts`
- `src/plugins/runtime.ts`
- `src/plugins/runtime/index.ts`
- `src/plugins/runtime/types.ts`
- `src/plugins/manifest.ts`
- `src/plugins/schema-validator.ts`
- `src/plugins/types.ts`
- `src/plugins/providers.ts`
- `src/plugins/services.ts`
- `src/routing/resolve-route.ts`
- `src/routing/bindings.ts`
- `src/config/types.agents.ts`
- `src/gateway/client.ts`
- `src/gateway/protocol/index.ts`
- `src/gateway/server-methods-list.ts`
- `src/gateway/server-startup.ts`
- `src/gateway/server-broadcast.ts`
- `src/gateway/ws-log.ts`
- `src/infra/diagnostic-events.ts`
- `src/agents/pi-embedded-runner/run/attempt.ts`
- `src/agents/pi-tools.before-tool-call.ts`
- `src/agents/session-tool-result-guard-wrapper.ts`
- `src/auto-reply/reply/dispatch-from-config.ts`
- `ui/src/ui/app-gateway.ts`
- `ui/src/ui/views/debug.ts`
- `ui/src/ui/gateway.ts`
- `src/memory/manager.ts`

---

## 2. 总体结论（先看）

1. **OpenSoul 在“工程完成度”上明显高于 AIRI 的部分模块**：插件注册、网关协议、内存索引、诊断事件、hooks 落地链路都已成熟。
2. **AIRI 的强项在“编排模型”**：插件生命周期状态机、能力依赖等待、配置 validate/plan/commit、复杂路由表达式、前端跨窗口协同。
3. 最有价值的映射不是“重写 OpenSoul 能力”，而是把 AIRI 的“治理层”叠加到 OpenSoul 现有能力上：
   - 插件生命周期治理
   - 依赖能力就绪治理
   - 配置流程化治理
   - 路由策略表达力治理
4. 对 OpenSoul 而言，推荐优先级：
   - **P0**: 生命周期 + capability wait + 配置三段式
   - **P1**: 路由 DSL + Provider 验证编排 + 多窗口防重
   - **P2**: 插件 runtime 隔离、local-first/offline 等可选项

---

## 3. 相关性矩阵（全量）

相关性评分：`1=弱`，`5=极强`。

| 领域 | AIRI能力 | OpenSoul现状 | 相关性 | 结论 |
|---|---|---|---:|---|
| 插件生命周期治理 | PluginHost 状态机、phase 迁移、失败回退 | 插件为同步注册流，`register Promise` 被忽略 | 5 | 高优先级映射 |
| 能力依赖等待 | capability announce/ready/wait/timeout | 无显式 capability wait 层 | 5 | 高优先级映射 |
| 插件配置流程 | validate/plan/commit 事件闭环 | 主要是 manifest JSON Schema 一次校验 | 5 | 高优先级映射 |
| 路由表达式 | `and/or/glob/label/plugin/instance` | binding 匹配以 channel/account/peer 为主 | 4 | 中高优先级映射 |
| Provider 运行时验证 | 分层 validator + schedule | Provider 插件接口强，但缺少统一探活管线 | 4 | 中优先级映射 |
| 多窗口协同 | BroadcastChannel + Web Locks + generation guard | UI 有事件日志，但多 tab 并发防重较弱 | 4 | 中优先级映射 |
| 可观测性编排 | websocket inspector + plugin host inspector + perf relay | 已有 debug timeline + diagnostics，粒度可再细化 | 3 | 增强型映射 |
| 协议兼容协商 | module compatibility request/result | 网关协议版本化完善，插件 API 兼容协商弱 | 3 | 可做增强 |
| 插件运行时隔离 | transport 抽象（设计先进） | runtime 注入集中、全局状态明显 | 3 | 长期治理项 |
| 本地优先持久化 | local/outbox 双存储 | 服务端 memory 成熟，UI offline 非核心痛点 | 2 | 低优先级 |
| 多 Agent 指令协议 | spark notify/command + intent/priority | 节点命令/审批健全，缺统一多 agent 命令语义层 | 3 | 按需映射 |

---

## 4. AIRI -> OpenSoul 可映射修改清单（详细）

> 说明：每项都包含来源、落点、差距、改造建议、验收标准、风险。

### M1. 插件生命周期状态机化（P0，相关性 5）

#### AIRI来源

- `plugin-host/core.ts` 中 `PluginHostSession`、phase 迁移、transition 校验与失败回退。
- `plugin-host/core.test.ts` 中 wait-deps、timeout、phase 断言用例。

#### OpenSoul落点

- `src/plugins/loader.ts`
- `src/plugins/registry.ts`
- `src/plugins/services.ts`
- `src/gateway/server-startup.ts`

#### 现状差距

- OpenSoul 目前加载路径是“发现 -> 校验 -> 执行 register”。
- `register` 若返回 Promise 仅 warning，异步注册被忽略（`loader.ts`）。
- 缺乏插件会话级状态（loaded/configuring/running/degraded/failed）。

#### 建议修改

1. 新增 `PluginLifecycleManager`（建议 `src/plugins/lifecycle.ts`）：
   - 状态：`discovered -> validated -> loaded -> registering -> configured -> running -> degraded/failed -> stopped`。
2. `loader.ts` 改为返回结构化生命周期结果（而不仅是 registry）。
3. 把 `register` Promise 改为可等待并带超时控制。
4. 将 `services.start` 挂入生命周期（running 前后）。
5. 对外暴露 lifecycle snapshot（供 UI debug 与 gateway method 查询）。

#### 验收标准

- 异步 register 插件可稳定加载。
- 插件失败不影响其他插件进入 running。
- 可查询插件 phase + 错误原因 + 启动耗时。

#### 风险

- 启动路径重构会影响插件相关测试；需分层迁移（先加 manager，再接 loader）。

---

### M2. Capability Registry + 依赖等待（P0，相关性 5）

#### AIRI来源

- `plugin-host/core.ts`：`announceCapability`、`markCapabilityReady`、`waitForCapabilities`。
- `core.test.ts`：capability wait timeout 行为。

#### OpenSoul落点

- `src/plugins/registry.ts`
- `src/plugins/runtime.ts`
- `src/gateway/server-startup.ts`

#### 现状差距

- OpenSoul 现有 registry 记录了 tools/hooks/channels/providers，但没有“能力状态机”。
- 插件间依赖更多是隐式约定，缺少显式就绪门控。

#### 建议修改

1. 新增 capability descriptor：
   - `{ key, state: announced|ready|degraded|withdrawn, updatedAt, metadata }`。
2. 插件 API 增加：
   - `announceCapability(key, metadata)`
   - `markCapabilityReady(key, metadata)`
   - `waitForCapabilities(keys, timeoutMs)`
3. `server-startup.ts` 可在 sidecar 启动前等待关键 capability（如 provider bridge、memory slot）。
4. diagnostics 增加 capability wait 超时事件。

#### 验收标准

- 可配置关键 capability 的启动门控。
- 超时后可降级启动并有可视化诊断。

#### 风险

- 需要定义 capability 命名规范，避免插件 key 冲突。

---

### M3. 插件配置 Validate/Plan/Commit 流程化（P0，相关性 5）

#### AIRI来源

- `plugin-protocol/events.ts`：
  - `module:configuration:validate:*`
  - `module:configuration:plan:*`
  - `module:configuration:commit:*`

#### OpenSoul落点

- `src/plugins/manifest.ts`
- `src/plugins/schema-validator.ts`
- `src/plugins/loader.ts`
- `src/gateway/server-methods/config.ts`（建议扩展）
- `ui/src/ui/views/config.ts`

#### 现状差距

- OpenSoul 以 JSON Schema + Ajv 为主，适合静态结构校验。
- 缺 runtime plan（例如凭证有效性、连接性、额度、外部依赖）阶段。

#### 建议修改

1. 插件可选导出：
   - `validateConfigRuntime(config)`
   - `planConfig(config)`
   - `commitConfig(config, plan)`
2. `config.apply/patch` 之前支持 `config.plugin.plan` dry-run。
3. UI 显示 plan 输出：
   - missing 字段、invalid 原因、迁移建议、warnings。
4. 与 diagnostics 结合记录 commit 失败的结构化原因。

#### 验收标准

- 插件配置可在不重启/不生效前先验证可行性。
- 配置失败错误可分“结构错误/连接错误/权限错误”。

#### 风险

- 需要保持与现有 `configSchema` 的兼容，不可破坏现有插件。

---

### M4. 路由表达式 DSL（P1，相关性 4）

#### AIRI来源

- `server-runtime/middlewares/route/match-expression.ts`
- `plugin-protocol/events.ts` 中 `RouteTargetExpression`

#### OpenSoul落点

- `src/config/types.agents.ts`
- `src/routing/resolve-route.ts`
- `src/routing/bindings.ts`

#### 现状差距

- OpenSoul routing/binding 功能健全，但表达模式偏固定字段匹配。
- 缺少组合逻辑（and/or/inverted label/glob）。

#### 建议修改

1. 扩展 `AgentBinding.match`：
   - 新增可选 `expr`（支持 and/or/glob/label/plugin/instance）。
2. `resolve-route.ts` 先兼容旧 match，再判定新 expr。
3. 提供 `bindings lint` 命令检查冲突与不可达规则。
4. `matchedBy` 增加 `binding.expr`，便于诊断。

#### 验收标准

- 单条规则可表达复合路由条件。
- 路由冲突可提前被 lint 告警。

#### 风险

- 规则复杂度上升，必须配套可视化解释器/调试输出。

---

### M5. Provider 运行时验证编排（P1，相关性 4）

#### AIRI来源

- `stage-ui/libs/providers/validators/run.ts`
- `stage-ui/stores/providers/converters.ts`
- `stage-ui/stores/providers/openai-compatible-builder.ts`

#### OpenSoul落点

- `src/plugins/types.ts`（ProviderPlugin）
- `src/plugins/providers.ts`
- `src/gateway/server-methods/models.ts` 或新增 provider health methods
- `ui/src/ui/views/channels*` / `views/config.ts`

#### 现状差距

- OpenSoul ProviderPlugin 能力强（auth、refreshOAuth），但缺统一健康探测编排。

#### 建议修改

1. 定义 provider validators：
   - config validators（静态）
   - runtime validators（连接/API权限/模型可用）
2. 定义 schedule：
   - `once` 或 `interval`。
3. 将验证结果注入 diagnostics + UI 状态卡片。
4. onboarding 直接消费验证结果并给修复建议。

#### 验收标准

- Provider 可输出稳定的 health 状态（valid/invalid/degraded + reason）。
- 模型列表失败时可给确定性原因而非泛化错误。

#### 风险

- 增加外部请求，需做节流和缓存。

---

### M6. 多窗口/多标签并发防重（P1，相关性 4）

#### AIRI来源

- `stage-ui/stores/mods/api/context-bridge.ts`：
  - `BroadcastChannel`
  - `navigator.locks`
  - `remoteStreamGuard + generation`

#### OpenSoul落点

- `ui/src/ui/app-gateway.ts`
- `ui/src/ui/app-chat.ts`
- `ui/src/ui/gateway.ts`

#### 现状差距

- 目前 UI 有事件日志与断线重连，但缺“同账号多 tab 并发写入”的强约束。

#### 建议修改

1. 新增 browser 侧会话锁：
   - key 示例：`opensoul:chat:send:${sessionKey}`。
2. 仅 leader tab 执行发送/敏感操作；其他 tab 转发请求或只读。
3. runId + generation guard，避免旧流覆盖新会话。
4. debug 页增加“当前 tab 角色（leader/follower）”。

#### 验收标准

- 多 tab 同时打开，不出现重复发送/重复执行工具调用。

#### 风险

- 需兼容不支持 Web Locks 的环境（回退到心跳选主）。

---

### M7. 诊断与调试面板增强（P1，相关性 3）

#### AIRI来源

- `websocket-inspector.ts`
- `plugin-host-debug.ts`
- `perf-tracer-bridge.ts`

#### OpenSoul落点

- `src/infra/diagnostic-events.ts`
- `src/gateway/server-broadcast.ts`
- `ui/src/ui/views/debug.ts`
- `ui/src/ui/app-gateway.ts`

#### 现状差距

- OpenSoul 已有 event timeline 与 diagnostics，但“插件生命周期视图/跨窗口 trace relay”还不完整。

#### 建议修改

1. Debug 页新增分区：
   - plugin lifecycle
   - capability state
   - provider health timeline
2. 增加事件过滤（sessionKey/agentId/pluginId/runId）。
3. 增加 trace relay（多窗口共享关键 tracing 事件）。

#### 验收标准

- 可从 UI 快速定位“哪个插件在哪个阶段失败”。

#### 风险

- 事件量变大，需控制内存与渲染开销。

---

### M8. 插件 API 兼容协商（P1，相关性 3）

#### AIRI来源

- `module:compatibility:request/result` 机制（`plugin-host/core.ts` + `plugin-protocol/events.ts`）。

#### OpenSoul落点

- `src/plugins/manifest.ts`
- `src/plugins/loader.ts`
- `src/plugin-sdk/index.ts`（导出版本信息）

#### 现状差距

- OpenSoul 已有 gateway 协议版本控制，但插件 API 兼容策略较弱。

#### 建议修改

1. manifest 增加：
   - `hostApiVersion`
   - `supportedHostApiVersions`
2. loader 在 register 前校验兼容性，输出 deterministic diagnostics。
3. UI 给出“需要升级 host 或插件”的明确提示。

#### 验收标准

- 插件版本不匹配时，不再仅在运行时报错。

---

### M9. 插件运行时隔离分层（P2，相关性 3）

#### AIRI来源

- transport 抽象：`in-memory/websocket/worker/electron`（设计层面）。

#### OpenSoul落点

- `src/plugins/runtime/index.ts`
- `src/plugins/runtime/types.ts`

#### 现状差距

- OpenSoul runtime 注入面非常广，耦合度高，插件可见能力较多。

#### 建议修改

1. 把 runtime 能力切为 capability facade（最小授权）。
2. 先做逻辑隔离（接口分层），再考虑执行隔离（worker/sandbox）。
3. 结合现有 `exec approvals` 做插件能力白名单。

#### 验收标准

- 插件仅访问声明能力，未声明能力不可见。

#### 风险

- 会影响现有插件编写方式，需要过渡期。

---

### M10. 多 Agent 命令语义层（P2，相关性 3）

#### AIRI来源

- `spark:notify/spark:command` 的 intent/priority/destination schema。

#### OpenSoul落点

- `src/gateway/server-methods/agent*.ts`
- `src/gateway/node-registry.ts`
- `src/gateway/node-command-policy.ts`

#### 现状差距

- OpenSoul 有节点命令与审批，但“多 agent 协同命令语义”较弱。

#### 建议修改

1. 定义内部 command envelope：
   - `intent`
   - `priority`
   - `interruptPolicy`
   - `destinations`
2. 对 scheduler/queue 进行优先级和中断策略扩展。
3. 与 diagnostics 结合展示 command path。

#### 验收标准

- 复杂任务下可稳定执行“计划->下发->回执”的多代理链路。

---

### M11. Local-first/outbox（P3，可选，相关性 2）

#### AIRI来源

- `use-local-first.ts`
- `database/storage.ts`

#### OpenSoul落点

- `ui/src/ui/storage.ts`
- `ui/src/ui/app-settings.ts`

#### 结论

- 对 OpenSoul 价值偏场景化（离线控制台/弱网需求强时有意义）。
- 不建议近期优先，除非产品方向明确支持离线操作。

---

### M12. 测试策略迁移（横向）

#### AIRI启发

- 生命周期、capability wait、失败路径有明确 test coverage。

#### OpenSoul建议

1. 为新增 lifecycle/capability/config pipeline 增加：
   - unit tests（phase transition、timeout、error taxonomy）
   - gateway e2e tests（启动过程门控）
2. UI 增加 multi-tab 并发行为测试（browser tests）。

---

## 5. OpenSoul 已有成熟能力（不要重复造轮子）

1. **插件 hooks 执行体系已成熟**：
   - typed hook、priority、并发/串行策略、错误隔离都已具备（`plugins/hooks.ts`）。
2. **hooks 已深入 agent/reply/tool 链路**：
   - `before_agent_start`、`before_tool_call`、`tool_result_persist`、`message_received` 均已有调用点。
3. **网关协议与客户端稳定性较好**：
   - AJV schema 校验、`connect.challenge`、onGap、tick/watchdog、backoff 重连完善。
4. **内存系统成熟且性能导向明确**：
   - sqlite-vec + FTS + hybrid search + watcher + batch fallback + extensive tests。
5. **诊断体系已有基础设施**：
   - diagnostics event bus、gateway ws logging、debug timeline 已可用。

---

## 6. OpenSoul 可优化点汇总（按 ROI 排序）

| 优先级 | 优化点 | 价值 | 实施复杂度 | 推荐周期 |
|---|---|---|---|---|
| P0 | 生命周期状态机化 | 高（稳定性/可诊断） | 中 | 1-2 周 |
| P0 | capability wait | 高（插件依赖可控） | 中 | 1 周 |
| P0 | 配置 validate/plan/commit | 高（降低配置故障） | 中高 | 2-3 周 |
| P1 | 路由 DSL | 中高（复杂场景可表达） | 中高 | 2 周 |
| P1 | Provider 验证编排 | 中高（可用性治理） | 中 | 1-2 周 |
| P1 | 多窗口防重 | 中（避免重复动作） | 中 | 1 周 |
| P1 | 调试面板增强 | 中（排障效率） | 中 | 1 周 |
| P2 | 插件兼容协商 | 中（演进安全） | 中 | 1 周 |
| P2 | 插件运行时隔离分层 | 中高（安全/治理） | 高 | 3-5 周 |
| P3 | local-first/offline outbox | 低到中（取决场景） | 中 | 按需 |

---

## 7. 建议实施路线图

### Phase 0（先稳态，3-4 周）

1. 生命周期状态机 + lifecycle snapshot API。
2. capability registry + wait/timeout。
3. 配置 plan 接口（先只读，不写入）。
4. 补齐单测与关键 e2e。

### Phase 1（增强治理，2-3 周）

1. 路由 DSL（expr）与 bindings lint。
2. Provider 验证编排 + diagnostics 输出。
3. 多 tab 防重与 leader/follower 机制。
4. Debug 面板新增 plugin/capability 视图。

### Phase 2（长期演进，3-6 周）

1. 插件 API 兼容协商与版本策略。
2. runtime capability facade。
3. 视需要探索 worker/sandbox 级插件隔离。

---

## 8. 风险矩阵与控制策略

| 风险 | 影响 | 控制策略 |
|---|---|---|
| 生命周期改造影响启动流程 | 中高 | 分层切换：先旁路 manager，后替换 loader 主路径 |
| capability key 无规范导致冲突 | 中 | 制定命名约定（`domain:feature:action`）并加 lint |
| 配置流程化增加复杂度 | 中 | 先对 memory/provider 类插件试点，再全量推广 |
| 路由 DSL 可读性下降 | 中 | 提供规则解释器和冲突检测输出 |
| UI 多 tab 机制兼容性 | 中 | Web Locks + fallback 选主双路径 |
| 插件 API 演进破坏兼容 | 中高 | 版本协商 + 清晰 deprecation policy |

---

## 9. 文件级映射索引（便于直接开改）

### 9.1 AIRI -> OpenSoul 一对一重点映射

1. 生命周期治理
   - AIRI: `packages/plugin-sdk/src/plugin-host/core.ts`
   - OpenSoul: `src/plugins/loader.ts`, `src/plugins/services.ts`
2. 能力依赖等待
   - AIRI: `packages/plugin-sdk/src/plugin-host/core.ts`
   - OpenSoul: `src/plugins/registry.ts`, `src/gateway/server-startup.ts`
3. 配置三段式
   - AIRI: `packages/plugin-protocol/src/types/events.ts`
   - OpenSoul: `src/plugins/manifest.ts`, `src/plugins/schema-validator.ts`, `src/gateway/server-methods/config.ts`
4. 路由表达式
   - AIRI: `packages/server-runtime/src/middlewares/route/match-expression.ts`
   - OpenSoul: `src/routing/resolve-route.ts`, `src/config/types.agents.ts`
5. Provider 验证编排
   - AIRI: `packages/stage-ui/src/libs/providers/validators/run.ts`
   - OpenSoul: `src/plugins/types.ts`, `src/plugins/providers.ts`
6. 多窗口并发防重
   - AIRI: `packages/stage-ui/src/stores/mods/api/context-bridge.ts`
   - OpenSoul: `ui/src/ui/app-gateway.ts`, `ui/src/ui/gateway.ts`
7. 调试面板治理
   - AIRI: `packages/stage-ui/src/stores/devtools/*`
   - OpenSoul: `ui/src/ui/views/debug.ts`, `src/infra/diagnostic-events.ts`

### 9.2 OpenSoul 已有能力（映射时应复用）

1. hooks 执行层：`src/plugins/hooks.ts`
2. hooks 调用链路：
   - `src/auto-reply/reply/dispatch-from-config.ts`
   - `src/agents/pi-tools.before-tool-call.ts`
   - `src/agents/session-tool-result-guard-wrapper.ts`
   - `src/agents/pi-embedded-runner/run/attempt.ts`
3. 客户端稳定性：`src/gateway/client.ts`, `ui/src/ui/gateway.ts`
4. 内存索引：`src/memory/manager.ts`
5. 诊断与日志：`src/infra/diagnostic-events.ts`, `src/gateway/ws-log.ts`

---

## 10. 最终建议（执行层）

1. 立项时不要叫“迁移 AIRI”，而叫“给 OpenSoul 增加插件治理层”。
2. 第一批只做 P0，目标是：
   - 启动行为可预测
   - 依赖就绪可控制
   - 配置失败可预演
3. 第二批再做路由 DSL 与 Provider 编排，不要和 P0 混在同一迭代。
4. 多 transport 插件宿主不要直接照搬 AIRI 当前实现（AIRI 该部分仍是 alpha，生产风险高）。

