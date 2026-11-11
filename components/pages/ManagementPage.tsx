"use client";

import { useState } from "react";
import Heading from "@/components/ui/Heading";
import ManagementWorkspace from "./ManagementWorkspace";

export type ManagementRole = "User" | "Manager" | "Admin";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-50 disabled:text-slate-500";
const sectionClass = "rounded-lg border border-slate-200 bg-white";

export default function ManagementPage({
  role = "User",
}: {
  role?: ManagementRole;
}) {
  const [passwordMessage, setPasswordMessage] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <Heading
        title="Management"
        eyebrow="Workspace"
        subtitle="Manage your account and workspace."
        buttons={null}
      />
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded bg-teal-50 px-2 py-1 font-semibold text-teal-800">
          {role}
        </span>
        <span>Prototype data only. Changes are not saved.</span>
      </div>
      <section className={sectionClass} aria-labelledby="account-heading">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2
            id="account-heading"
            className="text-base font-bold text-slate-900"
          >
            Your account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your profile and sign-in details
          </p>
        </div>
        <div className="grid gap-5 p-5 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid content-start gap-1.5 text-xs font-semibold text-slate-600">
              Username
              <input className={inputClass} value="Alex Morgan" disabled />
            </label>
            <label className="grid content-start gap-1.5 text-xs font-semibold text-slate-600">
              Email
              <input className={inputClass} value="alex@example.com" disabled />
            </label>
          </div>
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const data = new FormData(form);
              if (data.get("newPassword") !== data.get("confirmPassword")) {
                setPasswordMessage("New passwords do not match.");
                return;
              }
              setPasswordMessage(
                "Password change simulated. No credentials were updated.",
              );
              form.reset();
            }}
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
                Current password
                <input
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={inputClass}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
                New password
                <input
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={inputClass}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
                Confirm password
                <input
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={inputClass}
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="rounded-md bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800"
              >
                Update password
              </button>
              <span role="status" className="text-xs text-slate-600">
                {passwordMessage}
              </span>
            </div>
          </form>
        </div>
      </section>
      <ManagementWorkspace role={role} />
    </div>
  );
}
