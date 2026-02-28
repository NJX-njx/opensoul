# 新建群聊功能设计

## 背景

用户需求：支持新建群聊操作。当前后端仅有 `sessions.list`、`sessions.preview`、`sessions.delete`，**没有** `sessions.create`。群聊会话多由渠道（Telegram、Slack 等）创建。

## 现状

- **Session Key 格式**：`agent:{agentId}:{channel}:{type}:{id}`
  - 例如：`agent:main:control:group:uuid` 表示 control UI 创建的群组
- **Session 创建时机**：首次发送消息时由 gateway 创建 session entry
- **`sessions.list`**：从 store 读取已有 session，支持 `includeLastMessage`、`includeDerivedTitles`
- **`sessions.reset`**：重置当前 session（生成新 sessionId），用于 /new 命令

## 设计方案

### 方案 A：前端预生成 key + 首次消息创建（推荐）

1. **前端**：用户点击「新建群聊」时，生成 `agent:{agentId}:control:group:{uuid}`
2. **选中该 key**：右侧显示空聊天区，用户输入首条消息
3. **发送时**：gateway 收到 `chat.send`，session key 不存在则自动创建 entry
4. **无需后端 API 变更**：沿用现有「首次消息即创建」逻辑

**优点**：实现简单，无需后端改动  
**缺点**：空群聊在发送前不会出现在 `sessions.list` 中（可接受）

### 方案 B：新增 `sessions.create` API

1. **后端**：新增 `sessions.create`，接受 `{ kind: "group", agentId?, label? }`，返回 `{ key, sessionId }`
2. **前端**：点击「新建群聊」→ 调用 API → 获得 key → 选中并加载
3. **Store**：立即写入新 entry，`sessions.list` 可立即展示

**优点**：空群聊立即可见，体验更完整  
**缺点**：需后端实现，需定义 API 契约

### 方案 C：混合方案（推荐实现路径）

1. **Phase 1**：采用方案 A，前端生成 key，用户发送首条消息后 session 出现
2. **Phase 2**（可选）：若需「空群聊占位」体验，再实现 `sessions.create`

## 实现细节（方案 A）

### 前端

1. **聊天列表**：增加「新建群聊」入口（已实现「新建」按钮，可扩展为下拉：新建单聊 / 新建群聊）
2. **生成 key**：`agent:${agentId}:control:group:${crypto.randomUUID()}`
3. **选中逻辑**：`onSelect(newKey)` → 设置 `sessionKey`，右侧显示空聊天区
4. **发送**：`chat.send` 使用该 key，gateway 自动创建

### 后端兼容性

- `resolveGatewaySessionStoreTarget` 需支持 `control:group:{id}` 格式
- 首次消息时 `ensureSessionEntry` 会创建 entry
- 需确认 `parseGroupKey`、`classifySessionKey` 能正确识别该格式

### 群组头像与名称

- **头像**：群组使用通用群组图标（已实现 `chat-list-item__avatar-group`）
- **名称**：初始为空，可后续通过 `sessions.patch` 的 `label` 设置，或由首条消息推导

## 未读标记

当前 `GatewaySessionRow` 无未读字段。若需支持：

1. **后端**：在 `SessionEntry` 或 `sessions.list` 结果中增加 `unreadCount?: number`
2. **前端**：列表项展示未读角标
3. **已读同步**：需定义何时清除未读（如进入会话、收到已读回执等）

## 总结

- **短期**：采用方案 A，前端生成 `control:group:{uuid}` key，发送首条消息时自动创建
- **中期**：视需求考虑 `sessions.create` 及未读标记
- **新建群聊入口**：可在现有「新建」按钮旁增加「新建群聊」或通过下拉菜单区分
