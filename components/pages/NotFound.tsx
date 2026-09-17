"use client";

import { iconMap } from "../Icons";
import Button from "../ui/Button";

export default function NotFound() {
  return (
    <div
      id="404-page-container"
      className="flex h-full items-center justify-center bg-stone-50"
    >
      <div
        id="404-box"
        className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-8 shadow-lg"
      >
        <span
          id="404-icon"
          className="rounded-2xl bg-teal-100/60 p-4 text-4xl text-teal-800"
        >
          {iconMap({ icon: "branch", className: "h-5 w-5" })}
        </span>
        <h1 className="text-xs font-bold tracking-widest text-teal-800 uppercase">
          404 · Page not found
        </h1>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight">
          We could not find the page you were looking for.
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-500">
          The page does not exist or you do not have access to it.
        </p>
        <div
          id="404-rerout-options"
          className="mt-6 flex justify-center gap-4 text-xs font-semibold"
        >
          <Button primary link href={"/timesheets"}>
            Go to Timesheets
          </Button>
          <Button link href={"/"}>
            Open overview
          </Button>
        </div>
      </div>
    </div>
  );
}
