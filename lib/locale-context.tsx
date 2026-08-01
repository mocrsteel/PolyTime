import type { Locale } from "date-fns";
import { de, enUS, fr, nlBE } from "date-fns/locale";
import { useState, useEffect, useContext, createContext } from "react";

/** Exported for testing purposes. */
export const localeMap = {
  "en-US": enUS,
  en: enUS,
  "nl-BE": nlBE,
  nl: nlBE,
  "fr-FR": fr,
  fr: fr,
  "de-DE": de,
  de: de,
};

const LocaleContext = createContext<Locale>(enUS);

/** Exported for testing purposes. */
export function resolveBrowserLocale(
  browserLocale: keyof typeof localeMap,
): Locale {
  if (localeMap[browserLocale]) return localeMap[browserLocale];
  const base = browserLocale.split("-")[0] as keyof typeof localeMap;
  return localeMap[base] ?? enUS;
}

export default function LocaleProvider({
  children,

  locale,
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  const source = locale ?? navigator.language;
  const appLocale = resolveBrowserLocale(source as keyof typeof localeMap);

  return (
    <LocaleContext.Provider value={appLocale}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
