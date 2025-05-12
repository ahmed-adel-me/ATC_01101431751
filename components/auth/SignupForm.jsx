"use client";

import { signup } from "@/actions/authActions";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Spinner from "../Spinner";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await signup(data);
    if (res.status === 200) {
      alert("Account created successfully!");

      // Automatically sign in the user
      const signInResponse = await signIn("credentials", {
        redirect: true, // Redirect after sign-in
        email: data.email,
        password: data.password,
        callbackUrl: "/", // Redirect to the home page or another page
      });

      if (signInResponse?.error) {
        alert("Error signing in. Please try logging in manually.");
      }
    } else {
      alert("Error creating account. Please try again.");
    }
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex justify-center gap-2 items-center"
      >
        <span>Sign Up</span>
        {isSubmitting && <Spinner className="border-white" size={15} />}
      </button>
    </form>
  );
}
