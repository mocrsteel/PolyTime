/**
 * Renders the signed-in user's profile and prototype password-change form.
 * ManagementPage places this account-only section above the workspace views.
 */
"use client";

import { useState } from "react";
import { Button, Form, Input, Label, TextField } from "react-aria-components";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-50 disabled:text-slate-500";
const sectionClass = "rounded-lg border border-slate-200 bg-white";

export default function AccountSettings() {
  const [passwordMessage, setPasswordMessage] = useState("");

  return (
    <section className={sectionClass} aria-labelledby="account-heading">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 id="account-heading" className="text-base font-bold text-slate-900">
          Your account
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your profile and sign-in details
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            isDisabled
            defaultValue="Alex Morgan"
            className="grid content-start gap-1.5 text-xs font-semibold text-slate-600"
          >
            <Label>Username</Label>
            <Input className={inputClass} />
          </TextField>
          <TextField
            isDisabled
            defaultValue="alex@example.com"
            className="grid content-start gap-1.5 text-xs font-semibold text-slate-600"
          >
            <Label>Email</Label>
            <Input className={inputClass} />
          </TextField>
        </div>
        <Form
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
            <TextField
              name="currentPassword"
              isRequired
              className="grid gap-1.5 text-xs font-semibold text-slate-600"
            >
              <Label>Current password</Label>
              <Input
                type="password"
                autoComplete="current-password"
                className={inputClass}
              />
            </TextField>
            <TextField
              name="newPassword"
              isRequired
              className="grid gap-1.5 text-xs font-semibold text-slate-600"
            >
              <Label>New password</Label>
              <Input
                type="password"
                autoComplete="new-password"
                minLength={8}
                className={inputClass}
              />
            </TextField>
            <TextField
              name="confirmPassword"
              isRequired
              className="grid gap-1.5 text-xs font-semibold text-slate-600"
            >
              <Label>Confirm password</Label>
              <Input
                type="password"
                autoComplete="new-password"
                minLength={8}
                className={inputClass}
              />
            </TextField>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              className="rounded-md bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800"
            >
              Update password
            </Button>
            <span role="status" className="text-xs text-slate-600">
              {passwordMessage}
            </span>
          </div>
        </Form>
      </div>
    </section>
  );
}