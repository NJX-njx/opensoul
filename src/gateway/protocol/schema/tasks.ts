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

export const TaskRecordSchema = Type.Object(
  {
    taskId: NonEmptyString,
    agentId: NonEmptyString,
    status: NonEmptyString,
    title: Type.Optional(Type.String()),
    summary: Type.Optional(Type.String()),
    sourceSurface: Type.Optional(TaskSurfaceRefSchema),
    currentSurface: Type.Optional(TaskSurfaceRefSchema),
    latestSessionKey: Type.Optional(Type.String()),
    latestRunId: Type.Optional(Type.String()),
    createdAt: Type.Integer({ minimum: 0 }),
    updatedAt: Type.Integer({ minimum: 0 }),
    closedAt: Type.Optional(Type.Integer({ minimum: 0 })),
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
    status: NonEmptyString,
    kind: Type.Optional(Type.String()),
    title: NonEmptyString,
    detail: Type.Optional(Type.String()),
    dueAt: Type.Optional(Type.Integer({ minimum: 0 })),
    cronJobId: Type.Optional(Type.String()),
    createdAt: Type.Integer({ minimum: 0 }),
    updatedAt: Type.Integer({ minimum: 0 }),
    closedAt: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

export const TasksListParamsSchema = Type.Object(
  {
    agentId: Type.Optional(NonEmptyString),
    sessionKey: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 200 })),
  },
  { additionalProperties: false },
);

export const TasksListResultSchema = Type.Object(
  {
    tasks: Type.Array(TaskRecordSchema),
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
  },
  { additionalProperties: false },
);

export const TasksCommitmentsResultSchema = Type.Object(
  {
    commitments: Type.Array(TaskCommitmentSchema),
  },
  { additionalProperties: false },
);
