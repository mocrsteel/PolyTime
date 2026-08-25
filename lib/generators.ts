import { getYear, getQuarter, getMonth } from "date-fns";

/**
 * Returns an array of dates representing the months between the given start and end dates.
 * @param startDate - The starting date of the range.
 * @param endDate - The ending date of the range.
 */
export function monthRange(startDate: Date, endDate: Date): Date[] {
  if (startDate > endDate) [endDate, startDate] = [ startDate, endDate]
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth() + 1);

  return Array.from(
    { length: totalMonths },
    (_, i) => new Date(startDate.getFullYear(), startDate.getMonth() + i, 1),
  );
}

/**
 * Calculates and returns an array of Dates representing the start of each quarter
 * between the given startDate and endDate, inclusive.
 *
 * @param {Date} startDate - The starting date of the range.
 * @param {Date} endDate - The ending date of the range.
 * @return {Date[]} An array of Dates marking the start of each quarter in the range.
 */
export function quarterRange(startDate: Date, endDate: Date): Date[] {
  if (startDate > endDate) [endDate, startDate] = [startDate, endDate];

  const totalQuarters =
    (getYear(endDate) - getYear(startDate)) * 4 +
    (getQuarter(endDate) - getQuarter(startDate) + 1);

  return Array.from(
    { length: totalQuarters },
    (_, i) => new Date(getYear(startDate), getMonth(startDate) + i * 3, 1),
  );
}

/**
 * Generates an array of Date objects where each Date represents the first day of consecutive years
 * within the range of the given start and end dates, inclusive.
 *
 * @param {Date} startDate - The starting date of the range.
 * @param {Date} endDate - The ending date of the range.
 * @return {Date[]} An array of Date objects representing the first days of consecutive years
 *                  between the startDate and endDate, inclusive.
 */
export function yearRange(startDate: Date, endDate: Date): Date[] {
  if (startDate > endDate) [endDate, startDate] = [startDate, endDate];

  const totalYears = endDate.getFullYear() - startDate.getFullYear() + 1;
  return Array.from(
    { length: totalYears },
    (_, i) => new Date(startDate.getFullYear() + i, 0, 1),
  );
}
