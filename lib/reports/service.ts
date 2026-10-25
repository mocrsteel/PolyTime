import { differenceInBusinessDays, endOfYear, startOfYear } from "date-fns";

import type {
  ReportData,
  ReportDateRange,
  ReportProjectComments,
} from "@/lib/reports/types";
import { db } from "@/prisma/db";

/**
 * Is supposed to become a configurable variable per employee later on if required.
 */
const HOURS_PER_DAY = 8;

export function getExpectedHoursForRange(dateRange: ReportDateRange): number {
  return (
    differenceInBusinessDays(dateRange.end, dateRange.start) * HOURS_PER_DAY
  );
}

export async function getUserSummary(dateRange: ReportDateRange) {
  const groupedEntries = await db.timeEntry.groupBy({
    by: ["userId"],
    where: {
      date: {
        lte: dateRange.end,
        gte: dateRange.start,
      },
    },
    _sum: {
      hours: true,
    },
  });

  const usersIdsFromGrouped = groupedEntries.map((row) => row.userId);

  const users = await db.user.findMany({
    where: {
      id: { in: usersIdsFromGrouped },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const usersById = new Map(users.map((u) => [u.id, u.name]));
  const userHours = new Map<string, number>();

  groupedEntries.forEach((row) => {
    const userName = usersById.get(row.userId) ?? "Unknown";
    const hours = Number(row._sum.hours ?? 0);
    userHours.set(userName, (userHours.get(userName) ?? 0) + hours);
  });

  const periodHours = getExpectedHoursForRange(dateRange);
  const safePeriodHours = periodHours > 0 ? periodHours : 1;

  return Array.from(userHours.entries()).map(([name, hours]) => ({
    name,
    hours,
    completion: hours / safePeriodHours,
    expectedHours: periodHours,
  }));
}

export async function getBusinessUnitSummary(
  dateRange: ReportDateRange,
  slice: number = 5,
): Promise<{ name: string; hours: number }[]> {
  const groupedEntries = await db.timeEntry.groupBy({
    where: {
      date: {
        lte: dateRange.end,
        gte: dateRange.start,
      },
    },
    by: ["projectId"],
    _sum: {
      hours: true,
    },
  });

  const projectIds = groupedEntries.map((row) => row.projectId);

  const businessUnits = await db.project.findMany({
    where: {
      id: { in: projectIds },
    },
    select: {
      id: true,
      businessUnit: {
        select: {
          name: true,
        },
      },
    },
  });

  const projectById = new Map(
    businessUnits.map((p) => [p.id, p.businessUnit.name]),
  );

  const businessUnitHours = new Map<string, number>();

  groupedEntries.forEach((row) => {
    const buName = projectById.get(row.projectId) ?? "Unknown";
    const hours = Number(row._sum.hours ?? 0);
    businessUnitHours.set(buName, (businessUnitHours.get(buName) ?? 0) + hours);
  });

  return Array.from(businessUnitHours.entries())
    .map(([name, hours]) => ({ name, hours }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, slice);
}

export async function getCompletionStatus(dateRange: ReportDateRange) {
  const totalHours = await db.timeEntry.aggregate({
    _sum: {
      hours: true,
    },
    where: {
      date: {
        lte: dateRange.end,
        gte: dateRange.start,
      },
    },
  });

  const activeEmployees = await db.user.count({
    where: {
      isArchived: false,
    },
  });

  const periodHours = getExpectedHoursForRange(dateRange) * activeEmployees;
  const actualHours = Number(totalHours._sum.hours ?? 0);

  return {
    expected: periodHours,
    actual: actualHours,
    completion: periodHours > 0 ? actualHours / periodHours : 0,
  };
}

export async function getProjectCommentsByProject(
  dateRange: ReportDateRange,
): Promise<ReportProjectComments[]> {
  const groupedEntries = await db.timeEntry.findMany({
    select: {
      date: true,
      description: true,
      project: {
        select: {
          name: true,
          asset: {
            select: {
              name: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
    where: {
      date: {
        lte: dateRange.end,
        gte: dateRange.start,
      },
    },
  });

  const commentsByProject = new Map<
    string,
    {
      asset: string;
      comments: {
        date: Date;
        comment: string;
        user: string;
      }[];
    }
  >();
  for (const entry of groupedEntries) {
    const userName = entry.user.name ?? "Unknown";
    const assetName = entry.project.asset?.name ?? "Unknown";
    const project = entry.project.name ?? "Unknown";
    const commentItem = {
      date: entry.date,
      comment: entry.description ?? "",
      user: userName,
    };
    if (!commentsByProject.has(project)) {
      commentsByProject.set(project, { asset: assetName, comments: [] });
    }
    if (commentItem.comment.length !== 0) {
      commentsByProject.get(project)?.comments.push(commentItem);
    }
  }
  return Array.from(commentsByProject.entries()).map(
    ([project, { asset, comments }]) => ({
      project,
      asset,
      comments,
    }),
  );
}

export async function getReportData(
  dateRange: ReportDateRange,
): Promise<ReportData> {
  const [businessUnits, users, completion, comments] = await Promise.all([
    getBusinessUnitSummary(dateRange),
    getUserSummary(dateRange),
    getCompletionStatus(dateRange),
    getProjectCommentsByProject(dateRange),
  ]);

  return {
    businessUnits,
    users,
    completion,
    comments,
  };
}

export async function getReportBounds(): Promise<ReportDateRange> {
  const range = await db.timeEntry.aggregate({
    _min: { date: true },
    _max: { date: true },
  });

  if (range._min.date && range._max.date) {
    return {
      start: range._min.date,
      end: range._max.date,
    };
  }

  const now = new Date();
  return {
    start: startOfYear(now),
    end: endOfYear(now),
  };
}
