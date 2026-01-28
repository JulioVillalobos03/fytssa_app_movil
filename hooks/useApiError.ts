import { ERROR_MESSAGES } from "../constants/errorCodes";

export function useApiError(code?: string, lang: "es" | "en" = "es") {
  if (!code) return null;
  return ERROR_MESSAGES[code]?.[lang] ?? ERROR_MESSAGES.UNKNOWN_ERROR[lang];
}

