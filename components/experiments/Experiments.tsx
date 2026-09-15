"use client";

import {
 
  format,
  parseISO,
  formatISO,
} from "date-fns";
import { useLocale } from "@/lib/locale-context";

export default function Experiments() {
  const locale = useLocale();
  const today = new Date();
  const todayISO = formatISO(today);
  const dbData = "2026-08-01T09:05:08.048Z";
  const reconstructedDatabaseDate = parseISO(dbData);
  return (
    <div>
      <div>Today: {today.toString()}</div>
      <div>Today: {todayISO}</div>
      <div>Today: {format(today, "yyyy-MM-dd")}</div>
      <div>
        <h1>Localized</h1>
        <div>Original: 2026-08-01T09:05:08.048Z</div>
        Reconstructed:{" "}
        {format(reconstructedDatabaseDate, "PPPP", { locale: locale })}
      </div>
      <div>DB: {reconstructedDatabaseDate.toString()}</div>
    </div>
  );
}
