import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: {
    app: "polytime",
    env: process.env.NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});


type ErrorLogArguments = {
  error: Error;
  requestId: string;
  userId: string;
  route: string;
  action: string;
}


export function logError({error, requestId, userId, route, action}: ErrorLogArguments) {
  const errorId = `err_${crypto.randomUUID()}`;

  logger.error(
    {
      errorId,
      requestId,
      userId,
      route,
      action,
      err: error,
    },
    "Unhandled application error"
  );

  return errorId;
}
