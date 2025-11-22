// /i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale =
    (await requestLocale) && locales.includes(await requestLocale as any)
      ? (await requestLocale as any)
      : defaultLocale;

  return {
    locale,
    messages: (await import(`../app/messages/${locale}.json`)).default,
  };
});

export { locales, defaultLocale };
