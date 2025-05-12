import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Login
        </h1>
        <LoginForm />
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            prefetch={true}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
