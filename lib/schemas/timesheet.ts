/**
 * This file contains Zod schemas for validating and parsing timesheet-related data.
 * It includes schemas for entries, weeks, days, and various request/response payloads.
 *
 * TODO: Generated with copilot. Verify content.
 */
import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const DateOnlySchema = z
  .string()
  .regex(isoDateRegex, "Expected date in YYYY-MM-DD format");

export const IsoDateTimeSchema = z
  .string()
  .datetime({ offset: true, message: "Expected ISO-8601 datetime string" });

export const ResourceIdSchema = z.string().trim().min(1, "ID is required");

export const CopyModeSchema = z.enum(["merge", "overwrite"]);

export const EntrySchema = z.object({
  id: ResourceIdSchema,
  date: DateOnlySchema,
  projectId: ResourceIdSchema,
  projectName: z.string().trim().min(1).optional(),
  minutes: z.number().int().positive(),
  note: z.string().trim().max(2000).nullable().optional(),
  startTime: IsoDateTimeSchema.nullable().optional(),
  endTime: IsoDateTimeSchema.nullable().optional(),
  createdAt: IsoDateTimeSchema.optional(),
  updatedAt: IsoDateTimeSchema.optional(),
});

export const WeekSummarySchema = z.object({
  start: DateOnlySchema,
  end: DateOnlySchema,
  maximumMinutes: z.number().int().nonnegative(),
  totalMinutes: z.number().int().nonnegative(),
  completion: z.number().min(0).max(1),
});

export const DayEntriesSchema = z.object({
  date: DateOnlySchema,
  totalMinutes: z.number().int().nonnegative(),
  entries: z.array(EntrySchema),
});

export const WeekQuerySchema = z
  .object({
    start: DateOnlySchema,
    end: DateOnlySchema,
  })
  .refine(
    ({ start, end }) =>
      new Date(`${start}T00:00:00.000Z`) <= new Date(`${end}T00:00:00.000Z`),
    {
      message: "start must be on or before end",
      path: ["start"],
    },
  );

export const GetWeekResponseSchema = z.object({
  week: WeekSummarySchema,
  days: z.array(DayEntriesSchema),
});

export const CreateEntryRequestSchema = z
  .object({
    date: DateOnlySchema,
    projectId: ResourceIdSchema,
    minutes: z
      .number()
      .int()
      .positive()
      .max(24 * 60),
    note: z.string().trim().max(2000).optional(),
    startTime: IsoDateTimeSchema.optional(),
    endTime: IsoDateTimeSchema.optional(),
  })
  .refine(
    ({ startTime, endTime }) =>
      (Boolean(startTime) && Boolean(endTime)) || (!startTime && !endTime),
    {
      message: "startTime and endTime must be provided together",
      path: ["startTime"],
    },
  )
  .refine(
    ({ startTime, endTime }) => {
      if (!startTime || !endTime) {
        return true;
      }

      return new Date(startTime).getTime() < new Date(endTime).getTime();
    },
    {
      message: "endTime must be after startTime",
      path: ["endTime"],
    },
  );

export const CreateEntryResponseSchema = z.object({
  entry: EntrySchema,
  week: WeekSummarySchema,
});

export const UpdateEntryRequestSchema = z
  .object({
    minutes: z
      .number()
      .int()
      .positive()
      .max(24 * 60)
      .optional(),
    note: z.string().trim().max(2000).optional(),
    startTime: IsoDateTimeSchema.optional(),
    endTime: IsoDateTimeSchema.optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field must be provided",
  })
  .refine(
    ({ startTime, endTime }) =>
      (Boolean(startTime) && Boolean(endTime)) || (!startTime && !endTime),
    {
      message: "startTime and endTime must be provided together",
      path: ["startTime"],
    },
  )
  .refine(
    ({ startTime, endTime }) => {
      if (!startTime || !endTime) {
        return true;
      }

      return new Date(startTime).getTime() < new Date(endTime).getTime();
    },
    {
      message: "endTime must be after startTime",
      path: ["endTime"],
    },
  );

export const UpdateEntryResponseSchema = z.object({
  entry: z.object({
    id: ResourceIdSchema,
    minutes: z.number().int().positive(),
    note: z.string().trim().max(2000).nullable().optional(),
    updatedAt: IsoDateTimeSchema,
  }),
});

export const DeleteEntryResponseSchema = z.object({
  deleted: z.literal(true),
  entryId: ResourceIdSchema,
});

export const CopyDayRequestSchema = z.object({
  sourceDate: DateOnlySchema,
  targetDate: DateOnlySchema,
  mode: CopyModeSchema,
});

export const CopyDaySyncResponseSchema = z.object({
  copiedCount: z.number().int().nonnegative(),
  targetDate: DateOnlySchema,
  week: z.object({
    start: DateOnlySchema,
    end: DateOnlySchema,
    totalMinutes: z.number().int().nonnegative(),
  }),
});

export const AsyncAcceptedResponseSchema = z.object({
  accepted: z.literal(true),
  jobId: ResourceIdSchema,
  status: z.literal("queued"),
});

export const CopyWeekRequestSchema = z.object({
  sourceWeekStart: DateOnlySchema,
  targetWeekStart: DateOnlySchema,
  mode: CopyModeSchema,
});

export const JobStatusSchema = z.enum([
  "queued",
  "active",
  "completed",
  "failed",
  "delayed",
]);

export const JobResponseSchema = z.object({
  jobId: ResourceIdSchema,
  type: z.string().trim().min(1),
  status: JobStatusSchema,
  progress: z.number().int().min(0).max(100),
  result: z.unknown().nullable(),
  error: z
    .object({
      message: z.string(),
      code: z.string().optional(),
    })
    .nullable(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});

export const ErrorDetailSchema = z.object({
  path: z.string().trim().min(1),
  message: z.string().trim().min(1),
});

export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string().trim().min(1),
    message: z.string().trim().min(1),
    details: z.array(ErrorDetailSchema).optional(),
    requestId: z.string().trim().min(1),
  }),
});

export type DateOnly = z.infer<typeof DateOnlySchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type WeekSummary = z.infer<typeof WeekSummarySchema>;
export type DayEntries = z.infer<typeof DayEntriesSchema>;
export type WeekQuery = z.infer<typeof WeekQuerySchema>;
export type GetWeekResponse = z.infer<typeof GetWeekResponseSchema>;
export type CreateEntryRequest = z.infer<typeof CreateEntryRequestSchema>;
export type CreateEntryResponse = z.infer<typeof CreateEntryResponseSchema>;
export type UpdateEntryRequest = z.infer<typeof UpdateEntryRequestSchema>;
export type UpdateEntryResponse = z.infer<typeof UpdateEntryResponseSchema>;
export type DeleteEntryResponse = z.infer<typeof DeleteEntryResponseSchema>;
export type CopyDayRequest = z.infer<typeof CopyDayRequestSchema>;
export type CopyDaySyncResponse = z.infer<typeof CopyDaySyncResponseSchema>;
export type AsyncAcceptedResponse = z.infer<typeof AsyncAcceptedResponseSchema>;
export type CopyWeekRequest = z.infer<typeof CopyWeekRequestSchema>;
export type JobResponse = z.infer<typeof JobResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
