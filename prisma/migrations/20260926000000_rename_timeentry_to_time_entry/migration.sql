-- Rename the physical TimeEntry table to snake_case.
ALTER TABLE "timeEntry" RENAME TO "time_entry";

-- Keep constraint names aligned with the renamed table.
ALTER TABLE "time_entry" RENAME CONSTRAINT "timeEntry_pkey" TO "time_entry_pkey";
ALTER TABLE "time_entry" RENAME CONSTRAINT "timeEntry_userId_fkey" TO "time_entry_userId_fkey";
ALTER TABLE "time_entry" RENAME CONSTRAINT "timeEntry_projectId_fkey" TO "time_entry_projectId_fkey";

