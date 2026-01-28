import { createContext, useContext, useEffect, useState } from "react";
import { initI18n, changeLanguage as setI18nLang } from "@/constants/i18n/i18n";

type Lang = "es" | "en";

type LanguageContextType = {
  lang: Lang;
  changeLanguage: (lang: Lang) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const current = await initI18n();
      setLang(current);
      setReady(true);
    })();
  }, []);

  async function changeLanguage(newLang: Lang) {
    await setI18nLang(newLang);
    setLang(newLang);
  }

  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      <LanguageRerender key={lang}>
        {children}
      </LanguageRerender>
    </LanguageContext.Provider>
  );
}

function LanguageRerender({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
