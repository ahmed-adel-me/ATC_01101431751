"use client";

import { signup } from "@/actions/authActions";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Spinner from "../Spinner";
import { useTranslations } from "next-intl";

export default function SignupForm() {
  const t = useTranslations("signup");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await signup(data);
    if (res.status === 200) {
      alert(t("success"));

      // Automatically sign in the user
      const signInResponse = await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (signInResponse?.error) {
        alert(t("errorSignIn"));
      }
    } else {
      alert(t("errorCreate"));
    }
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {t("name")}
        </label>
        <input
          type="text"
          {...register("name", { required: t("nameRequired") })}
          className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 transition ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
          placeholder={t("namePlaceholder")}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {t("email")}
        </label>
        <input
          type="email"
          {...register("email", { required: t("emailRequired") })}
          className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 transition ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
          placeholder={t("emailPlaceholder")}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {t("password")}
        </label>
        <input
          type="password"
          {...register("password", { required: t("passwordRequired") })}
          className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 transition ${
            errors.password
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
          placeholder={t("passwordPlaceholder")}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {t("confirmPassword")}
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: t("confirmPasswordRequired"),
            validate: (value) => value === password || t("passwordsNotMatch"),
          })}
          className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 transition ${
            errors.confirmPassword
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
          placeholder={t("confirmPasswordPlaceholder")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex justify-center gap-2 items-center transition"
      >
        <span>{t("submit")}</span>
        {isSubmitting && <Spinner className="border-white" size={15} />}
      </button>
    </form>
  );
}
