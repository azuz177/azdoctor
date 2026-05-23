// Error capture module for SSR error handling
// Captures errors thrown during server-side rendering

let lastCapturedError: Error | null = null;

export function captureError(error: unknown): void {
  if (error instanceof Error) {
    lastCapturedError = error;
  } else {
    lastCapturedError = new Error(String(error));
  }
}

export function consumeLastCapturedError(): Error | null {
  const error = lastCapturedError;
  lastCapturedError = null;
  return error;
}

export function getLastCapturedError(): Error | null {
  return lastCapturedError;
}

// Auto-initialize error capture for global error handlers
if (typeof process !== "undefined") {
  process.on("uncaughtException", (error) => {
    captureError(error);
  });

  process.on("unhandledRejection", (reason) => {
    captureError(reason);
  });
}
