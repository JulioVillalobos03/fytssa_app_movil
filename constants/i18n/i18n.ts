import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "./translations";
import { getLanguage, setLanguage } from "../../services/storage.service";

export type AppLanguage = "es" | "en";

export const i18n = new I18n(translations);
i18n.enableFallback = true;

function normalizeLocale(locale: string): AppLanguage {
  const short = locale.split("-")[0].toLowerCase();
  return short === "es" ? "es" : "en";
}

export async function initI18n() {
  const stored = await getLanguage();
  if (stored === "es" || stored === "en") {
    i18n.locale = stored;
    return stored;
  }

  const deviceLocale = Localization.getLocales()?.[0]?.languageTag || "en";
  const lang = normalizeLocale(deviceLocale);
  i18n.locale = lang;
  await setLanguage(lang);
  return lang;
}

export async function changeLanguage(lang: AppLanguage) {
  i18n.locale = lang;
  await setLanguage(lang);
  return lang;
}
