import { differenceInBusinessDays } from "date-fns";

import { db } from "@/prisma/db";
import { DateRange } from "@/components/ui/PeriodPicker";

const HOURS_PER_DAY = 8;

export async function getUserSummary(dateRange: DateRange) {
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

  const periodHours = differenceInBusinessDays(dateRange.end, dateRange.start) * HOURS_PER_DAY;

  return Array.from(userHours.entries()).map(([name, hours]) => ({
    name,
    hours,
    completion: hours / periodHours,
    expectedHours: periodHours,
  }));
}

export async function getBusinessUnitSummary(
  dateRange: DateRange,
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

export async function getCompletionStatus(dateRange: DateRange) {
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
    }
  })

  // const periodHours =
  //   (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60);
  // Holidays not counted for, since they are to be inputted as holidays manually.
  const periodHours =
    differenceInBusinessDays(dateRange.end, dateRange.start)
    * HOURS_PER_DAY
    * activeEmployees;

  return {
    expected: periodHours,
    actual: (totalHours._sum.hours ?? 0).toNumber(),
    completion: (totalHours._sum.hours ?? 0).toNumber() / periodHours,
  };
}
