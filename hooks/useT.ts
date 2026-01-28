import { i18n } from "../constants/i18n/i18n";

export function useT() {
  return (key: string, options?: any) => i18n.t(key, options);
}