import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("signup");
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-2">
          {t("title")}
        </h2>
        <SignupForm />
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          {t("haveAccount")}{" "}
          <Link
            href="/auth/login"
            prefetch={true}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
