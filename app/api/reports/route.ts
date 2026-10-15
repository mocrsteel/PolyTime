import { NextRequest } from "next/server";

import { db } from "@/prisma/db";
import type { DateRange } from "@/components/ui/PeriodPicker";
import { validateQueryParams, type ValidatedQueryParams } from "./validators";
import {
  getBusinessUnitSummary,
  getUserSummary,
  getCompletionStatus,
} from "@/app/api/reports/service";

export async function GET(request: NextRequest) {
  let queryParams: ValidatedQueryParams = {};
  try {
    // TODO: Implement logic to get data from the database.
    queryParams = validateQueryParams(request.nextUrl.searchParams);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      {
        message: "Invalid query parameters",
        error: message,
      },
      { status: 400 },
    );
  }

  const businessUnitSummary = await getBusinessUnitSummary({
    start: queryParams.start,
    end: queryParams.end,
  });

  const userSummary = await getUserSummary({
    start: queryParams.start,
    end: queryParams.end,
  });

  const completionStatus = await getCompletionStatus({
    start: queryParams.start,
    end: queryParams.end,
  });

  return Response.json({
    businessUnits: businessUnitSummary,
    users: userSummary,
    completion: completionStatus,
  });
}
