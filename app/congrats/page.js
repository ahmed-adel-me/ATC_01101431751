import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function CongratsPage() {
  const t = await getTranslations("congrats");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 mt-6">
          {t("message")}
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
