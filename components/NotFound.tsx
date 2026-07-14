"use client"

import {FiGitBranch} from "./Icons"
import Button from "./ui/Button";

export default function NotFound() {
  return (
    <div id="404-page-container" className="flex items-center justify-center h-full bg-stone-50">
      <div id="404-box" className="flex flex-col items-center justify-center gap-4 bg-white p-8 rounded-2xl shadow-lg">
        <span id="404-icon" className="text-4xl bg-teal-100/60 text-teal-800 rounded-2xl p-4">
          <FiGitBranch className="h-5 w-5"/>
        </span>
        <h1 className="text-teal-800 uppercase text-xs font-bold tracking-widest">404 · Page not found</h1>
        <h2 className="text-3xl font-bold tracking-tight max-w-3xl">We could not find the page you were looking for.</h2>
        <p className="text-sm text-slate-500 leading-6 max-w-3xl">The page does not exist or you do not have access to it.</p>
        <div id="404-rerout-options" className="flex justify-center gap-4 mt-6 text-xs font-semibold">
          <Button primary link href={"/timesheets"}>Go to Timesheets</Button>
          <Button link href={"/"}>Open overview</Button>
        </div>
      </div>
    </div>
  )
}
