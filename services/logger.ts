const ENABLE_LOGS = true;

export function log(tag: string, ...args: any[]) {
  if (!ENABLE_LOGS) return;
  console.log(`[${tag}]`, ...args);
}

export function logError(tag: string, err: any) {
  if (!ENABLE_LOGS) return;

  const payload = {
    message: err?.message,
    code: err?.code,
    status: err?.status,
    errors: err?.errors,
    raw: err,
  };

  console.log(`[${tag}]`, payload);
}