import {getRequestConfig} from "next-intl/server";

// Lista de idiomas soportados
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

// Locale por defecto
export const defaultLocale: Locale = "es";

// export default
export default getRequestConfig(async ({requestLocale}) => {
  // requestLocale viene de next-intl (middleware/proxy)
  let locale = (await requestLocale) as Locale | undefined;

  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  // Ajusta la ruta según dónde tengas tus JSON:
  // Si están en /messages/es.json y /messages/en.json en la raíz del proyecto:
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
