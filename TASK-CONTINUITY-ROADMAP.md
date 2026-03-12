# Task Continuity Roadmap

更新时间：2026-03-11

## 目标

把 OpenSoul 从“很多入口都能对话的 agent runtime”推进成“一个 agent 在多个表面持续执行同一个任务的 runtime”，并把这件事做成用户第一次进入 `Control UI` 就能感知到的旗舰体验。

这份文档分两部分：

1. 把当前 `alpha -> beta / production` 的推进清单整理成一份统一文档。
2. 在清单基础上继续落成一份可执行工程计划，按 `P0 / P1 / P2` 拆到具体任务项、涉及文件、测试项和验收标准。

## 当前阶段判断

当前已经不再是纯概念验证，而是一个“可见、可读、可串联”的 `alpha`：

- 已有 `task / event / commitment` 最小域模型与 SQLite 落库。
- inbound session、gateway agent run、subagent、cron 已经能挂接到同一个 `taskId`。
- continuity event sink 与保守 handoff policy 已经接通。
- `DM -> Control UI`、`DM -> Canvas` 的 handoff 执行链路和降级链路已经存在。
- 最小只读 `tasks.*` RPC 已经可用，`Control UI` 右侧 rail 已经能显示 task、event stream、commitments、surface handoff。
- README 与核心文档已经完成新的产品叙事切换。

当前仍然是 `alpha` 的根本原因不是“可见层还没做”，而是下面这些生产关键环节还没有闭环：

- commitment 还是“能存、能查、能显示”，但还不是“会自动产生、自动收敛、自动关闭”的执行闭环。
- task 状态机规则仍然偏保守，尚未被明确为稳定的业务状态机。
- handoff 缺少 retry / dedupe / success accounting / degraded accounting。
- gateway 重启后的恢复、一致性修复、孤儿任务修复还没有做成正式能力。
- `Control UI` 目前主要是观察面板，还不是操作面板。
- 缺少 continuity 主链路 e2e 与最小观测指标。

## 阶段门槛

### Alpha

定义：

- 能创建并复用 task。
- 能记录 event。
- 能把 subagent / cron / follow-up session 继续挂到同一个 task。
- 能在 `Control UI` 中看见 task timeline、surface trail、open commitments。
- API 以只读为主，更多是“观察系统”，不是“操作系统”。

### Beta 准入门槛

满足以下条件才能称为 `beta`：

- commitment 自动闭环上线，至少支持创建、去重、完成、取消。
- task 状态机被硬化，`open / running / waiting-user / completed / cancelled / failed` 的入场、退场、重开规则清晰。
- handoff 具备最小可靠性：重试、降级、去重、结果记录。
- gateway 重启后 continuity 数据能恢复到一致状态，至少不会把用户卡在脏状态里。
- `Control UI` 具备最小操作能力：完成/取消 commitment，关闭/重开 task，刷新/重试 handoff。
- 写接口补齐到支撑 UI 操作。
- 主链路 e2e 跑通。
- 最小日志与指标上线。

### Production 准入门槛

满足以下条件才适合正式对外主打：

- 有全局任务工作台，不局限于单 session 右 rail。
- handoff / surface policy 可配置而不是硬编码。
- 有权限与隔离模型，不同用户/设备/入口的可见性可控。
- continuity 数据支持保留、归档、导出、恢复、修复。
- 能在高频会话、长任务、混合 surfaces 下验证稳定性和性能。
- 发布、灰度、回滚策略成熟。

## 原始清单整理

### Must-Do

这些项本质上就是 `beta blockers`：

1. `Commitment 闭环`：把 `upsertCommitment()` / `updateCommitmentStatus()` 接入主执行链路，实现自动识别、去重、完成、取消。
2. `Task 状态机硬化`：明确定义 `open / running / waiting-user / completed / cancelled / failed` 的转移规则，以及 `run state` 与 `task state` 的边界。
3. `Handoff 可靠性`：为 `DM -> Control UI` 与 `DM -> Canvas` 增加 retry、degrade、dedupe、结果统计。
4. `重启恢复与一致性修复`：处理 gateway 重启、in-flight task、孤儿 event/task、session link 不一致、schema migration。
5. `最小可操作 UI`：让 `Control UI` 支持手动操作 commitment / task / handoff。
6. `写接口补齐`：至少补 `tasks.commitments.update`、`tasks.task.patch` 这一类写接口。
7. `主链路 e2e`：覆盖 `DM -> task -> run -> commitment -> UI`、`subagent`、`cron`、`restart continuity`。
8. `最小观测能力`：至少要能看 `task create/reuse rate`、`handoff success rate`、`stale waiting-user tasks`。

### Should-Do

这些项更偏 `beta -> production`：

1. `全局任务工作台`：跨 session / agent 搜索、过滤、管理 tasks。
2. `Surface policy 配置化`：按 `agent / channel / chatType / user class` 配置阈值、冷却、禁用策略。
3. `权限与隔离模型`：控制不同用户或设备对 continuity 数据的可见范围。
4. `数据生命周期管理`：归档、保留、导出、导入、备份、修复。
5. `更强恢复工具`：人工修复入口，例如 relink task、merge duplicate tasks。
6. `规模与性能验证`：验证长任务和高频任务下的稳定性。
7. `发布与回滚方案`：feature flag、灰度、回滚。

### Can Be Delayed

这些项不是近期 blocker：

1. `专门的 Tasks 页面设计打磨`：视觉 polish 可以晚于可操作性闭环。
2. `更炫的可视化`：先保证正确和可操作，再做复杂图形表达。
3. `更多 surfaces`：先把现有 DM / Control UI / Canvas / cron / subagent 做稳。
4. `模型驱动的高级 policy`：先用系统规则闭环，不急着引入早期智能决策。
5. `协作型 task`：多人共享、指派、协作流放到更后面。

## 可执行工程计划

优先级定义：

- `P0`：不做完，不能把 continuity 作为 `beta` 核心卖点推出去。
- `P1`：不做完，适合做公开 beta，但不适合做稳定 production 叙事。
- `P2`：明确能延后，不应该抢占 P0 / P1 资源。

---

## P0

### P0-1 Commitment 闭环

目标：

- 让 commitment 从“展示字段”升级成“任务执行系统里的第一等对象”。

具体任务项：

- 在 run 结束点引入保守 commitment 提取逻辑，优先使用结构化来源，其次才是有限规则。
- 为 commitment 建立稳定去重键，避免同一 task 内重复生成多个内容等价的 open commitments。
- 支持 commitment 的自动完成、自动取消、重开与显式更新。
- 在 commitment 创建、更新、完成、取消时同步写入 continuity event，保证 UI 时间线可解释。
- 把 open commitments 注入 continuity context，确保后续 run 能引用已有承诺而不是重新发明。

涉及文件：

- `src/continuity/service.ts`
- `src/continuity/store.ts`
- `src/continuity/types.ts`
- `src/continuity/context.ts`
- `src/continuity/event-sink.ts`
- `src/auto-reply/reply/session.ts`
- `src/auto-reply/reply/followup-runner.ts`
- `src/auto-reply/reply/agent-runner-execution.ts`
- `src/auto-reply/reply/agent-runner-memory.ts`

测试项：

- 扩充 `src/continuity/service.test.ts`，覆盖创建、去重、完成、取消、重开。
- 扩充 `src/auto-reply/reply/session.continuity.test.ts`，覆盖 inbound message 与 follow-up run 对 commitments 的影响。
- 新增 continuity event sink 侧测试，验证 lifecycle end / error 时 commitment 更新逻辑。

验收标准：

- 同一个 task 内，同一条承诺在重复 run 后不会生成多个语义重复的 `open` commitment。
- 用户明确表示“完成/不用了/取消”后，commitment 状态能在同一个 continuity 链路中收敛。
- `tasks.commitments` 返回的数据与事件时间线保持一致，没有“状态改了但事件没记”或“事件记了但状态没变”的分叉。
- `Control UI` 右 rail 在 run 结束刷新后能看见最新 commitment 状态。

### P0-2 Task 状态机硬化

目标：

- 把当前“根据 event 粗略推断状态”的逻辑升级成稳定、可测试、可解释的状态机。

具体任务项：

- 明确定义状态转移表，包括 `open -> running -> waiting-user` 的正常链路以及 `failed / completed / cancelled` 的进入条件。
- 区分 `run state` 与 `task state`，避免把一次 run 的结束误判成整个 task 的结束。
- 明确 closed task 的重开规则，禁止隐式重开；只允许新用户输入或显式 patch 触发 reopen。
- 统一 `closedAt` 与 reopen 行为，避免任务被重开后仍保留旧关闭时间。
- 为每次状态变化记录 reason 或 event 映射，方便后续观测与排障。

涉及文件：

- `src/continuity/service.ts`
- `src/continuity/types.ts`
- `src/continuity/store.ts`
- `src/auto-reply/reply/session.ts`
- `src/continuity/event-sink.ts`
- `src/agents/subagent-registry.ts`
- `src/cron/isolated-agent/run.ts`

测试项：

- 扩充 `src/continuity/service.test.ts`，把状态迁移表直接写成测试用例。
- 扩充 `src/gateway/server-methods/agent.test.ts`，验证 run context 与状态变化边界。
- 增补 `subagent` / `cron` 触发时对 task 状态的覆盖测试。

验收标准：

- 所有合法状态迁移都有明确测试，非法迁移会被拒绝或被强制归一。
- closed tasks 不会被 `resolveOrCreateTaskForInbound()` 自动复用。
- `failed` task 能被后续用户输入显式拉回 `open/running`，但不会默默长期停留在 active 集合里。
- `closedAt` 语义一致：关闭即写入，重开即清空。

### P0-3 Handoff 可靠性

目标：

- 让 `DM -> Control UI` / `Canvas` handoff 从“尽力而为”升级成“最小可依赖”。

具体任务项：

- 为 handoff 尝试引入稳定 idempotency key，避免重复投递或重复打开 canvas。
- 对 `routeReply()` 与 `node.invoke(canvas.present)` 增加有限次数 retry 与错误分类。
- 在 canvas 失败时明确降级到 `control-ui`，并确保事件与 reason 准确记录。
- 记录 handoff success / fail / degraded 结果，供日志与指标读取。
- 增加 handoff cooldown / dedupe 校验，避免短时间内连续重复 handoff。

涉及文件：

- `src/continuity/handoff.ts`
- `src/continuity/surface-policy.ts`
- `src/continuity/event-sink.ts`
- `src/continuity/types.ts`
- `src/auto-reply/reply/route-reply.ts`
- `src/gateway/call.ts`

测试项：

- 新增 `src/continuity/handoff.test.ts`，覆盖成功、失败、retry、degrade、dedupe。
- 扩充 `src/continuity/service.test.ts` 或相关集成测试，验证 handoff event 写入完整。
- 增加 gateway/chat e2e，用 mock channel / mock node 验证最终事件序列。

验收标准：

- 同一个 run 不会因为重复 lifecycle end 或瞬时抖动生成多次 handoff。
- Canvas 不可用时会稳定降级到 Control UI，而不是直接丢失 handoff。
- handoff 失败后能明确区分“消息送达失败”和“canvas 打开失败”。
- 至少可以在日志或内部计数器里得到 handoff success rate 与 degraded count。

### P0-4 重启恢复与一致性修复

目标：

- 保证 gateway 重启之后 continuity 数据不会进入不可恢复或高度误导的状态。

具体任务项：

- 在 gateway 启动阶段执行 continuity 恢复 sweep，扫描 `running` / `failed` / `waiting-user` 任务与 session 绑定关系。
- 修复 `session.activeTaskId`、`session.lastTaskId`、`tasks.latestSessionKey`、`task_session_links` 之间的常见不一致。
- 为 in-flight run 增加“重启中断”归因，把永远停在 `running` 的任务归一到合理状态。
- 完善 continuity schema version 检查与迁移入口，为后续 metadata / indexes / repair 字段预留路径。
- 提供最小孤儿修复逻辑：event 指向缺失 task、task 缺失 session link、commitment 指向已关闭/缺失 task 时能被检测出来。

涉及文件：

- `src/continuity/schema.ts`
- `src/continuity/store.ts`
- `src/continuity/service.ts`
- `src/continuity/paths.ts`
- `src/gateway/server.impl.ts`
- `src/gateway/server-startup-helpers.ts`
- `src/gateway/session-utils.ts`
- `src/config/sessions.ts`

测试项：

- 扩充 `src/continuity/store.test.ts`，覆盖 schema version 与 repair 行为。
- 新增 continuity recovery 测试，构造脏数据并验证启动后修复结果。
- 增加 gateway restart e2e，验证重启前后 task 状态与 UI 展示一致。

验收标准：

- 重启后不会出现大量永远停留在 `running` 的 task。
- 常见 session/task link 不一致能够自动修复或被明确标记。
- schema version 升级路径可测试，不依赖手工删库。
- 即使恢复失败，也不会阻塞 gateway 主流程启动。

### P0-5 写接口补齐

目标：

- 给 `Control UI` 和后续自动化修复提供正式写入口，而不是直接依赖内部 service。

具体任务项：

- 增加 `tasks.commitments.update`，支持 `done / cancelled / open` 状态修改及必要备注字段。
- 增加 `tasks.task.patch`，至少支持 `status`、`summary`、`title`、`latestSessionKey` 的受控更新。
- 为写接口增加参数校验、权限边界、错误形状、幂等性约束。
- 明确写接口与 domain service 的边界：gateway 只做校验与授权，状态规则仍由 continuity service 承担。
- 把新接口加入 method list、read/write 权限集合、协议 schema 与 TS types。

涉及文件：

- `src/gateway/protocol/schema/tasks.ts`
- `src/gateway/protocol/schema/protocol-schemas.ts`
- `src/gateway/protocol/schema/types.ts`
- `src/gateway/protocol/index.ts`
- `src/gateway/server-methods/tasks.ts`
- `src/gateway/server-methods.ts`
- `src/gateway/server-methods-list.ts`
- `src/continuity/service.ts`

测试项：

- 扩充 `src/gateway/server-methods/tasks.test.ts`，覆盖成功路径、参数错误、找不到 task/commitment、非法状态转换。
- 扩充 `src/continuity/service.test.ts`，验证 write API 背后 domain 行为一致。

验收标准：

- `Control UI` 不需要直接依赖私有 continuity service 也能完成 task / commitment 基本操作。
- 非法参数、非法状态迁移、未知对象都能返回稳定错误。
- 写接口不会绕开状态机，不能直接写出不合法状态。

### P0-6 最小可操作 UI

目标：

- 把现在的 continuity rail 从“观察台”升级成“最小操作台”。

具体任务项：

- 在 commitment 列表中增加 `Done` / `Cancel` 操作。
- 在 task summary 区增加 `Close` / `Reopen` 操作。
- 在 handoff 失败 event 上增加 `Retry handoff` 或 `Open in Control UI` 的恢复动作。
- 为操作态增加 loading / disabled / optimistic update / error toast。
- 在选择 task、刷新数据、run 结束自动刷新之间保持状态一致，避免操作后 UI 闪回。

涉及文件：

- `ui/src/ui/controllers/tasks.ts`
- `ui/src/ui/views/task-continuity-panel.ts`
- `ui/src/ui/views/chat.ts`
- `ui/src/ui/app.ts`
- `ui/src/ui/app-view-state.ts`
- `ui/src/ui/app-gateway.ts`
- `ui/src/ui/types.ts`
- `ui/src/styles/chat/task-continuity.css`

测试项：

- 扩充 `ui/src/ui/views/chat.test.ts`，验证按钮渲染、点击行为、禁用态与错误态。
- 为 `controllers/tasks.ts` 增加请求与状态同步测试。
- 至少补一条 UI 层集成测试，验证 commitment 状态改变后 rail 正确更新。

验收标准：

- operator 可以只在 `Control UI` 中完成最小运维闭环，不必手工改库。
- 所有写操作都有显式反馈，不会“点了没反应”。
- 操作失败时 UI 会恢复到一致状态，不留半成功脏视图。

### P0-7 主链路 E2E

目标：

- 用端到端测试把 continuity 的核心卖点真正钉死，而不是依赖单元测试拼装信心。

具体任务项：

- 覆盖 `DM -> task creation -> run -> commitment update -> Control UI display`。
- 覆盖 `sessions_spawn` / subagent 挂接到同一 task。
- 覆盖 `cron` 挂接到同一 task。
- 覆盖 gateway restart 后 continuity 仍然可读、可操作。
- 覆盖 handoff 成功、降级、失败三类关键分支。

涉及文件：

- `src/gateway/server.chat.gateway-server-chat.e2e.test.ts`
- `src/gateway/server.cron.e2e.test.ts`
- `src/gateway/server.agent.gateway-server-agent-b.e2e.test.ts`
- `src/agents/subagent-registry.persistence.test.ts`
- `ui/src/ui/views/chat.test.ts`

测试项：

- 新增 continuity e2e fixtures，统一构造 mock channel、mock node、mock agent events。
- 把 UI rail 断言纳入主链路 e2e，而不是只停留在静态渲染断言。

验收标准：

- 至少一条完整主链路在 CI 中稳定通过。
- `DM / subagent / cron / restart / handoff` 五类 continuity 关键行为都有回归覆盖。
- 新增改动如果破坏 continuity 叙事，CI 会直接红。

### P0-8 最小观测能力

目标：

- 在不引入重型监控系统的前提下，让 continuity 具备最小可运营性。

具体任务项：

- 为 task create / reuse / reopen / close 增加结构化日志。
- 为 handoff success / fail / degrade 增加计数。
- 为 stale `waiting-user` / stale `running` task 增加扫描与日志输出。
- 为 commitment create / done / cancel 增加计数或日志字段。
- 如果现有 gateway health / status surface 合适，补一个 continuity summary 只读输出。

涉及文件：

- `src/continuity/service.ts`
- `src/continuity/event-sink.ts`
- `src/continuity/handoff.ts`
- `src/gateway/server/health-state.ts`
- `src/gateway/server-methods/health.ts`

测试项：

- 为日志/计数辅助函数增加单元测试。
- 为 stale task 扫描增加时间推进测试。
- 如果暴露 health summary，补 gateway method 测试。

验收标准：

- 可以回答“当前 task 是新建多还是复用多”“handoff 成功率如何”“是否有大量等待用户的僵尸任务”这三类问题。
- 出问题时至少能从日志里追出 `taskId`、`runId`、`sessionKey` 与 surface。

---

## P1

### P1-1 全局任务工作台

目标：

- 从“当前 session 的 task rail”扩展到“整个 agent 的任务工作台”。

具体任务项：

- 增加跨 session 的 task 查询、过滤、排序、搜索。
- 支持按状态、surface、更新时间、agent、channel 快速筛选。
- 支持从全局视图跳转回关联 session、event、commitment 详情。
- 保持右 rail 与全局 workbench 的数据模型一致，不做两套 task 表达。

涉及文件：

- `src/gateway/server-methods/tasks.ts`
- `src/gateway/protocol/schema/tasks.ts`
- `ui/src/ui/controllers/tasks.ts`
- `ui/src/ui/app-render.ts`
- `ui/src/ui/views/task-continuity-panel.ts`
- `ui/src/ui/views/tasks-workbench.ts`（new）
- `ui/src/styles/tasks-workbench.css`（new）

测试项：

- task 查询过滤的 gateway 方法测试。
- workbench 页面渲染、筛选、跳转测试。
- 搜索与分页边界测试。

验收标准：

- 不进入某个具体 session，也能定位和管理最近活跃任务。
- 右 rail 与全局 workbench 使用同一套 task 数据契约，没有字段分叉。

### P1-2 Surface Policy 配置化

目标：

- 把当前 handoff policy 从硬编码规则升级为可配置策略。

具体任务项：

- 抽象 `agent / channel / chatType / user class` 维度的 policy 配置。
- 支持阈值、冷却时间、禁用 surfaces、默认 handoff mode 配置。
- 为配置提供保守默认值与向后兼容逻辑。
- 在 policy 评估时记录命中来源，方便排障。

涉及文件：

- `src/continuity/surface-policy.ts`
- `src/continuity/types.ts`
- `src/config/config.ts`
- `src/gateway/server-methods/config.ts`
- `docs/concepts/architecture.md`
- `docs/web/control-ui.md`

测试项：

- policy 命中优先级测试。
- 默认配置兼容测试。
- 配置错误时的 fallback 测试。

验收标准：

- 不改代码也能关闭某一类 handoff，或调整阈值与 cooldown。
- 配置缺失时行为与当前 alpha 保持兼容。

### P1-3 权限与隔离模型

目标：

- 防止 continuity 数据在多用户、多入口、多设备场景下“谁都看得到”。

具体任务项：

- 明确 task / commitment / event 的可见边界。
- 给 `tasks.*` 读写接口补授权检查。
- 让 `Control UI` 根据当前身份过滤不可见任务。
- 为 system-triggered task 与 user-scoped task 做最小区分。

涉及文件：

- `src/gateway/server-methods/tasks.ts`
- `src/gateway/server-methods.ts`
- `src/gateway/server-http.ts`
- `src/gateway/server-ws-runtime.ts`
- `ui/src/ui/controllers/tasks.ts`
- `ui/src/ui/app.ts`

测试项：

- 未授权访问被拒绝测试。
- 同 agent 不同用户的可见性隔离测试。
- UI 侧隐藏不可见任务测试。

验收标准：

- 默认不会把不该暴露的任务暴露到任意 browser session。
- 读写接口的权限模型一致，不会“只拦读不拦写”。

### P1-4 数据生命周期管理

目标：

- 让 continuity 数据具备长期运行所需的保留、归档、恢复能力。

具体任务项：

- 定义活跃数据与归档数据的边界。
- 支持导出、导入、备份与基础修复。
- 为过旧 events / tasks / commitments 提供可配置保留策略。
- 明确 schema migration 与数据 repair 的运维路径。

涉及文件：

- `src/continuity/store.ts`
- `src/continuity/schema.ts`
- `src/continuity/paths.ts`
- `src/commands/tasks.ts`（new）
- `docs/reference/rpc.md`
- `docs/start/getting-started.md`

测试项：

- export/import round-trip 测试。
- retention 清理测试。
- 归档后查询边界测试。

验收标准：

- continuity 数据不会无限增长到无法维护。
- 运维人员可以安全导出、备份、恢复 continuity 状态。

### P1-5 更强恢复工具

目标：

- 给 operator 正式提供人工修复入口，而不是只能靠 SQL 或脚本救火。

具体任务项：

- 支持 relink task 到 session。
- 支持 merge duplicate tasks。
- 支持手动标记 orphan task / orphan commitment。
- 在 UI 或 CLI 中提供 repair 入口。

涉及文件：

- `src/continuity/service.ts`
- `src/gateway/server-methods/tasks.ts`
- `ui/src/ui/controllers/tasks.ts`
- `ui/src/ui/views/tasks-workbench.ts`（new）
- `src/commands/tasks.ts`（new）

测试项：

- repair 操作单元测试。
- duplicate merge 集成测试。
- repair 后 UI 刷新一致性测试。

验收标准：

- 常见 continuity 脏状态可以不改库直接修。
- repair 行为全程有日志与事件记录。

### P1-6 规模与性能验证

目标：

- 验证 continuity 不会在真实使用强度下拖垮 gateway 和 UI。

具体任务项：

- 模拟长 timeline、大量 commitments、高频 run 结束刷新。
- 压测 `tasks.list / tasks.events / tasks.commitments` 在高基数数据下的响应。
- 检查 UI 右 rail 在长列表下的交互与渲染性能。
- 按需补索引、缓存或分页。

涉及文件：

- `src/continuity/store.ts`
- `src/gateway/server-methods/tasks.ts`
- `ui/src/ui/controllers/tasks.ts`
- `ui/src/ui/views/task-continuity-panel.ts`
- `scripts/bench-continuity.mjs`（new）

测试项：

- benchmark 脚本。
- 大数据量查询测试。
- UI 长列表性能 smoke test。

验收标准：

- 常见查询不会因为 continuity 数据增长而明显退化。
- `Control UI` 在长 timeline 场景下仍可操作。

### P1-7 发布与回滚方案

目标：

- 让 continuity 可以被安全灰度，而不是一次性硬切。

具体任务项：

- 为 continuity read/write、handoff、UI actions 增加 feature flags。
- 定义关闭某项 continuity 能力后的退化行为。
- 准备回滚脚本或配置路径，避免 schema/behavior 无法快速撤回。
- 为关键变更准备发布检查单。

涉及文件：

- `src/config/config.ts`
- `src/continuity/surface-policy.ts`
- `src/gateway/server-methods/tasks.ts`
- `ui/src/ui/controllers/tasks.ts`
- `docs/start/setup.md`

测试项：

- flag 开关测试。
- 回滚兼容测试。
- 配置变更后的 UI / API 行为测试。

验收标准：

- continuity 关键功能都能单独开关。
- 出现问题时可以只降级 continuity，而不拖垮整个 gateway。

---

## P2

### P2-1 专门的 Tasks 页面设计打磨

目标：

- 在 P1 workbench 可用后，再做更完整的视觉与交互 polish。

具体任务项：

- 提炼任务列表、任务详情、filters、bulk actions 的布局。
- 做 keyboard-first 交互与更清晰的信息层级。
- 优化移动端与窄屏退化策略。

涉及文件：

- `ui/src/ui/views/tasks-workbench.ts`（new）
- `ui/src/styles/tasks-workbench.css`（new）
- `ui/src/ui/app-render.ts`

测试项：

- 页面导航与交互测试。
- 键盘操作测试。
- 响应式布局 smoke test。

验收标准：

- workbench 不只是“能用”，而是能作为对外演示页面。
- 不影响现有 chat 右 rail 的效率。

### P2-2 更炫的可视化

目标：

- 在功能正确后，再提高“一个任务跨多个 surfaces 连续流动”的视觉冲击力。

具体任务项：

- 增加 surface graph、timeline grouping、handoff badges、状态统计小图。
- 为 event / commitment / handoff 提供更强的视觉编码。
- 只在不影响信息密度与可操作性的前提下引入动画。

涉及文件：

- `ui/src/ui/views/task-continuity-panel.ts`
- `ui/src/styles/chat/task-continuity.css`
- `ui/src/ui/views/tasks-workbench.ts`（new）

测试项：

- 渲染稳定性测试。
- 长 timeline 下的性能 smoke test。

验收标准：

- 新可视化不会牺牲信息准确性与交互效率。
- 在 demo 场景下能明显增强产品记忆点。

### P2-3 更多 Surfaces

目标：

- 在现有 continuity 内核稳定后，再把更多入口并入同一套 task continuity。

具体任务项：

- 评估 voice、phone、更多 native surfaces 的 `taskId` 绑定方式。
- 明确各 surface 的 handoff、权限、session 语义。
- 保持 `SurfaceRef` 与 UI 表达兼容扩展。

涉及文件：

- `src/continuity/types.ts`
- `src/continuity/service.ts`
- `src/gateway/server-methods/talk.ts`
- 对应 channel / device adapters

测试项：

- 新 surface 绑定 continuity 的集成测试。
- handoff 规则兼容测试。

验收标准：

- 新增 surface 不破坏现有 task continuity 语义。
- UI 能正确显示新增 surface 类型。

### P2-4 模型驱动的高级 Policy

目标：

- 在系统规则稳定后，再考虑把部分 handoff / task split 决策交给模型。

具体任务项：

- 定义模型可参与但不可越权的决策边界。
- 先让模型产出建议，再由系统规则裁决。
- 记录建议与最终决策差异，用于后续调优。

涉及文件：

- `src/continuity/surface-policy.ts`
- `src/continuity/event-sink.ts`
- `src/continuity/types.ts`

测试项：

- 建议模式与系统裁决测试。
- 模型输出异常时的 fallback 测试。

验收标准：

- 模型参与不会削弱系统可预测性。
- 任意异常都能回退到纯规则模式。

### P2-5 协作型 Task

目标：

- 在单用户 continuity 做稳后，再扩展到多人共享和协作场景。

具体任务项：

- 为 task 引入 shared / assigned / watcher 等协作语义。
- 明确多用户下 commitment 的 owner、actor、audit trail。
- 为工作台增加共享与指派动作。

涉及文件：

- `src/continuity/types.ts`
- `src/continuity/store.ts`
- `src/gateway/server-methods/tasks.ts`
- `ui/src/ui/views/tasks-workbench.ts`（new）

测试项：

- 多 actor 更新同一 task 的一致性测试。
- 可见性与权限测试。

验收标准：

- 协作能力不会破坏当前单用户 continuity 的简单性。
- 所有共享动作都有明确审计轨迹。

## 建议落地顺序

建议按下面的顺序推进，而不是并行铺得太开：

1. `P0-1 Commitment 闭环`
2. `P0-2 Task 状态机硬化`
3. `P0-3 Handoff 可靠性`
4. `P0-4 重启恢复与一致性修复`
5. `P0-5 写接口补齐`
6. `P0-6 最小可操作 UI`
7. `P0-7 主链路 E2E`
8. `P0-8 最小观测能力`
9. `P1-1 全局任务工作台`
10. `P1-2 / P1-3 / P1-4 / P1-7`
11. `P1-5 / P1-6`
12. `P2` 全部延后

## 一个务实的判断

如果只看“叙事”和“可见层”，当前已经可以讲 `alpha` 故事；如果要让外部用户第一次试用后真的相信“一个 agent 可以跨表面连续完成同一个任务”，`P0` 基本都要完成，尤其是下面四项：

- `P0-1 Commitment 闭环`
- `P0-2 Task 状态机硬化`
- `P0-5 写接口补齐`
- `P0-7 主链路 E2E`

这四项做完之后，OpenSoul 的 continuity 才会从“很有意思的原型”进入“可以稳定演示和公开 beta 的产品能力”。
