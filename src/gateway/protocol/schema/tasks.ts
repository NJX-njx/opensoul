import { Type } from "@sinclair/typebox";
import { NonEmptyString } from "./primitives.js";

export const TaskSurfaceRefSchema = Type.Object(
  {
    kind: NonEmptyString,
    channel: Type.Optional(Type.String()),
    chatType: Type.Optional(Type.String()),
    label: Type.Optional(Type.String()),
    nodeId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export const TaskStatusValueSchema = Type.Union([
  Type.Literal("open"),
  Type.Literal("running"),
  Type.Literal("waiting-user"),
  Type.Literal("completed"),
  Type.Literal("cancelled"),
  Type.Literal("failed"),
]);

export const CommitmentStatusValueSchema = Type.Union([
  Type.Literal("open"),
  Type.Literal("done"),
  Type.Literal("cancelled"),
]);

export const TasksListSortValueSchema = Type.Union([
  Type.Literal("updated-desc"),
  Type.Literal("updated-asc"),
  Type.Literal("created-desc"),
  Type.Literal("created-asc"),
]);

export const TaskRecordSchema = Type.Object(
  {
    taskId: NonEmptyString,
    agentId: NonEmptyString,
    status: TaskStatusValueSchema,
    title: Type.Optional(Type.String()),
    summary: Type.Optional(Type.String()),
    sourceSurface: Type.Optional(TaskSurfaceRefSchema),
    currentSurface: Type.Optional(TaskSurfaceRefSchema),
    latestSessionKey: Type.Optional(Type.String()),
    latestRunId: Type.Optional(Type.String()),
    createdAt: Type.Integer({ minimum: 0 }),
    updatedAt: Type.Integer({ minimum: 0 }),
    closedAt: Type.Optional(Type.Integer({ minimum: 0 })),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

export const TaskEventSchema = Type.Object(
  {
    eventId: NonEmptyString,
    taskId: NonEmptyString,
    agentId: NonEmptyString,
    kind: NonEmptyString,
    stream: Type.Optional(Type.String()),
    phase: Type.Optional(Type.String()),
    sessionKey: Type.Optional(Type.String()),
    runId: Type.Optional(Type.String()),
    summary: Type.Optional(Type.String()),
    surface: Type.Optional(TaskSurfaceRefSchema),
    createdAt: Type.Integer({ minimum: 0 }),
    payload: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

export const TaskCommitmentSchema = Type.Object(
  {
    commitmentId: NonEmptyString,
    taskId: NonEmptyString,
    agentId: NonEmptyString,
    status: CommitmentStatusValueSchema,
    kind: Type.Optional(Type.String()),
    title: NonEmptyString,
    detail: Type.Optional(Type.String()),
    dueAt: Type.Optional(Type.Integer({ minimum: 0 })),
    cronJobId: Type.Optional(Type.String()),
    createdAt: Type.Integer({ minimum: 0 }),
    updatedAt: Type.Integer({ minimum: 0 }),
    closedAt: Type.Optional(Type.Integer({ minimum: 0 })),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

export const TasksListParamsSchema = Type.Object(
  {
    allAgents: Type.Optional(Type.Boolean()),
    agentId: Type.Optional(NonEmptyString),
    sessionKey: Type.Optional(Type.String()),
    status: Type.Optional(TaskStatusValueSchema),
    surfaceKind: Type.Optional(NonEmptyString),
    channel: Type.Optional(NonEmptyString),
    query: Type.Optional(Type.String()),
    updatedAfter: Type.Optional(Type.Integer({ minimum: 0 })),
    offset: Type.Optional(Type.Integer({ minimum: 0, maximum: 10_000 })),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 200 })),
    sort: Type.Optional(TasksListSortValueSchema),
  },
  { additionalProperties: false },
);

export const TasksListResultSchema = Type.Object(
  {
    tasks: Type.Array(TaskRecordSchema),
    total: Type.Optional(Type.Integer({ minimum: 0 })),
    nextOffset: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
  },
  { additionalProperties: false },
);

export const TasksGetParamsSchema = Type.Object(
  {
    taskId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    sessionKey: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export const TasksGetResultSchema = Type.Object(
  {
    task: Type.Union([TaskRecordSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

export const TasksEventsParamsSchema = Type.Object(
  {
    taskId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    sessionKey: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 500 })),
  },
  { additionalProperties: false },
);

export const TasksEventsResultSchema = Type.Object(
  {
    events: Type.Array(TaskEventSchema),
  },
  { additionalProperties: false },
);

export const TasksCommitmentsParamsSchema = Type.Object(
  {
    taskId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    sessionKey: Type.Optional(Type.String()),
    status: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 500 })),
  },
  { additionalProperties: false },
);

export const TasksCommitmentsResultSchema = Type.Object(
  {
    commitments: Type.Array(TaskCommitmentSchema),
  },
  { additionalProperties: false },
);

export const TasksCommitmentsUpdateParamsSchema = Type.Object(
  {
    taskId: NonEmptyString,
    commitmentId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    sessionKey: Type.Optional(Type.String()),
    status: CommitmentStatusValueSchema,
    detail: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export const TasksCommitmentsUpdateResultSchema = Type.Object(
  {
    commitment: Type.Union([TaskCommitmentSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

export const TasksTaskPatchParamsSchema = Type.Object(
  {
    taskId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    sessionKey: Type.Optional(Type.String()),
    status: Type.Optional(TaskStatusValueSchema),
    title: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    summary: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    latestSessionKey: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export const TasksTaskPatchResultSchema = Type.Object(
  {
    task: Type.Union([TaskRecordSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

export const TasksRepairRelinkParamsSchema = Type.Object(
  {
    taskId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    sessionKey: NonEmptyString,
    detail: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export const TasksRepairRelinkResultSchema = Type.Object(
  {
    task: Type.Union([TaskRecordSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

export const TasksRepairMergeParamsSchema = Type.Object(
  {
    sourceTaskId: NonEmptyString,
    targetTaskId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    detail: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export const TasksRepairMergeResultSchema = Type.Object(
  {
    task: Type.Union([TaskRecordSchema, Type.Null()]),
    mergedTaskId: Type.Optional(NonEmptyString),
    deletedTaskId: Type.Optional(NonEmptyString),
    moved: Type.Optional(
      Type.Object(
        {
          sessionLinks: Type.Integer({ minimum: 0 }),
          events: Type.Integer({ minimum: 0 }),
          commitments: Type.Integer({ minimum: 0 }),
          dedupedCommitments: Type.Integer({ minimum: 0 }),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const TasksRepairTaskOrphanParamsSchema = Type.Object(
  {
    taskId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    detail: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export const TasksRepairTaskOrphanResultSchema = Type.Object(
  {
    task: Type.Union([TaskRecordSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

export const TasksRepairCommitmentOrphanParamsSchema = Type.Object(
  {
    taskId: NonEmptyString,
    commitmentId: NonEmptyString,
    agentId: Type.Optional(NonEmptyString),
    detail: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export const TasksRepairCommitmentOrphanResultSchema = Type.Object(
  {
    commitment: Type.Union([TaskCommitmentSchema, Type.Null()]),
  },
  { additionalProperties: false },
);
