import { formatISO, parseISO } from "date-fns";

/**
 * Date formatter for database dates. Converts a Date object to a string.
 * @param date
 */
export function formatDate(date: Date) {
  return formatISO(date, { representation: "date" });
}

/**
 * Date parser for database dates. Converts a string to a Date object.
 * @param date
 */
export function parseDate(date: string) {
  return parseISO(date);
}
