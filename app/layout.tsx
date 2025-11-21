// app/layout.tsx
import {NextIntlClientProvider} from "next-intl";

export const metadata = {
  title: "NoteMorph",
  description: "Convierte y transforma documentos con IA"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
