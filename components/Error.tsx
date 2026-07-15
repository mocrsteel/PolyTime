"use client"

import {FiAlertTriangle} from "./Icons"
import Button from "./ui/Button";


/**
 * Error page for overall app errors. Intended to be applicable for different error types.
 * For now, limited to a global error. To be extended during the app construction.
 * @constructor
 */
export default function Error() {
  return (
    <div id="404-page-container" className="flex items-center justify-center h-full bg-stone-50">
      <div id="404-box" className="flex flex-col items-center justify-center gap-4 bg-white p-18 rounded-2xl shadow-lg">
        <span id="404-icon" className="text-4xl bg-orange-100 text-orange-700 rounded-2xl p-4">
          <FiAlertTriangle className="h-5 w-5"/>
        </span>
        <h1 className="text-teal-800 uppercase text-xs font-bold tracking-widest">Global error</h1>
        <h2 className="text-3xl font-bold tracking-tight max-w-xl">Something went wrong</h2>
        <p className="text-sm text-slate-500 leading-6 max-w-xl">The app encountered a critical error and cannot continue. Your saved entries are safe, try again of return to the overview page while the service recovers.</p>
        <div id="error-description" className="mx-auto my-4 flex max-w-xl justify-between gap-4 rounded-xl border border-orange-100 bg-orange-50 p-3 text-left text-xs text-orange-900">
          <strong>Fatal internal error</strong>
          <p>Later, this section will give you details for the developper for directed troubleshooting</p>
        </div>
        <div id="404-rerout-options" className="flex justify-center gap-4 text-xs font-semibold">
          <Button primary link href={"/timesheets"}>Try again</Button>
          <Button link href={"/"}>Return to overview</Button>
        </div>
      </div>
    </div>
  )
}
