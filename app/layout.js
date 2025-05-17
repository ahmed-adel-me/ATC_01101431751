import Navbar from "@/components/Navbar";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Cairo } from "next/font/google";
export const metadata = {
  title: "Event Booking System",
};
export const cairo = Cairo({
  subsets: ["latin"],
  weight: [ "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr"; // Set direction based on locale

  return (
    <html
      lang={locale}
      dir={dir}
      className={cairo.className}
      suppressHydrationWarning
    >
      <AuthProvider>
        <body className="dark:bg-gray-900 dark:text-white bg-white text-black transition-colors duration-300 flex flex-col h-screen overflow-hidden">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              <div>
                <Navbar />
              </div>
              <div className="flex-1 overflow-y-scroll">{children}</div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
