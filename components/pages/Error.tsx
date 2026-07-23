"use client"

import {Alert} from "../Icons"
import Button from "../ui/Button";
import Card from "../ui/Card";


type DefaultErrorProps = {
  global?: false;
  requestId: string | null;
  globalErrorMessage?: never;
}

type GlobalErrorProps = {
  global: true;
  requestId?: never;
  globalErrorMessage: string;
}

type ErrorProps = DefaultErrorProps | GlobalErrorProps;

/**
 * Error page for overall app errors. Intended to be applicable for different error types.
 * For now, limited to a global error. To be extended during the app construction.
 * @constructor
 */
export default function Error({requestId, global, globalErrorMessage}: ErrorProps) {
  let datetime: string | undefined = undefined;
  if (global) {
    const date = new Date();
    const dateString = date.toLocaleDateString('en-US', {})
    const timeString = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
    datetime = `${dateString} ${timeString}`
  }

  return (
    <div id="404-page-container" className="flex items-center justify-center h-full bg-stone-50">
      {/*<div id="404-box" className="flex flex-col items-center justify-center gap-4 bg-white p-18 rounded-2xl shadow-lg">*/}
      <Card>
        <span id="404-icon" className="text-4xl bg-orange-100 text-orange-700 rounded-2xl p-4">
          <Alert className="h-5 w-5"/>
        </span>
        <h1 className="text-polytime-teal-dark eyebrow">{global ? "Global error" : "Internal error"}</h1>
        <h2 className="text-3xl font-bold tracking-tight max-w-xl">Something went wrong</h2>
        <p className="text-sm text-polytime-muted leading-6 max-w-xl">The app encountered a critical error and cannot
          continue. Your saved entries are safe, try again of return to the overview page while the service
          recovers.</p>
        <div id="error-description"
             className="mx-auto my-4 flex max-w-xl justify-between gap-4 rounded-xl border border-orange-100 bg-orange-50 p-3 text-left text-xs text-orange-900">
          <strong>Fatal internal error</strong>
          {requestId &&
            <p>Request with ID <code>{requestId}</code> failed. Contact the developer with this code for
              troubleshooting.</p>
          }
          {global &&
            <div className="flex flex-col gap-2">
              <p>The application encountered a global error. Contact the developper with the following information for
                troubleshooting.
              </p>
              {globalErrorMessage && <code>{globalErrorMessage}</code>}
              <code>time stamp: {datetime}</code>
            </div>
          }
        </div>
        <div id="404-rerout-options" className="flex justify-center gap-4 text-xs font-semibold">
          {!global && <Button primary link href={"/timesheets"}>Try again</Button>}
          <Button link primary={global} href={"/"}>Return to overview</Button>
        </div>
      </Card>
      {/*</div>*/}
    </div>
  )
}
