import { db } from "./db";

// const groupedTimeEntries = await db.timeEntry.groupBy({
//   by: "projectId",
//   _sum: {
//     hours: true,
//   },
//   _min: {
//     date: true,
//   },
//   _max: {
//     date: true,
//   },
// });
//
// console.log(groupedTimeEntries);
//
// const projectIds = groupedTimeEntries.map((row) => row.projectId);
//
// console.log(projectIds);
//
// const projectWithNames = await db.project.findFirst({
//   where: { id: { in: projectIds } },
//   select: {
//     id: true,
//     name: true,
//     asset: {
//       select: {
//         name: true,
//       },
//     },
//     businessUnit: {
//       select: {
//         name: true,
//       },
//     },
//   },
// });
//
// const grouped = groupedTimeEntries.map((row) => {
//   return {
//     projectId: row.projectId,
//     hours: row._sum.hours,
//     name: projectWithNames?.name,
//     assetName: projectWithNames?.asset?.name,
//     businessUnitName: projectWithNames?.businessUnit?.name,
//     dateRange: {
//       start: row._min.date,
//       end: row._max.date,
//     },
//   };
// });
//

const dateRange = {
  start: new Date("2025-01-01"),
  end: new Date("2025-03-31"),
};

// Project allocation buildup
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

const last = await db.project.findMany({
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

const projectById = new Map(last.map((p) => [p.id, p.businessUnit.name]));
const businessUnitHours = new Map<string, number>();

groupedEntries.forEach((row) => {
  const buName = projectById.get(row.projectId) ?? "Unknown";
  const hours = Number(row._sum.hours ?? 0);
  businessUnitHours.set(buName, (businessUnitHours.get(buName) ?? 0) + hours);
});

const results = Array.from(businessUnitHours.entries())
  .map(([name, hours]) => ({ name, hours }))
  .sort((a, b) => b.hours - a.hours);

console.log(results);
