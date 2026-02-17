"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerUser } from "@/lib/auth-api";

type RegisterForm = {
    username: string;
    email: string;
    password: string;
};

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const onSubmit = async (data: RegisterForm) => {
        setError(null);
        try {
            await registerUser(data);
            router.push("/login");
        } catch {
            setError("Register failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 p-8">
                <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 text-center mb-6">
                    Register
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                        >
                            Name
                        </label>
                        <input
                            id="username"
                            {...register("username", {
                                required: "Name is required",
                            })}
                            type="text"
                            placeholder="Your name"
                            className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                                errors.username
                                    ? "border-red-500 dark:border-red-400"
                                    : "border-slate-300 dark:border-slate-600"
                            }`}
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            type="email"
                            placeholder="you@example.com"
                            className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                                errors.email
                                    ? "border-red-500 dark:border-red-400"
                                    : "border-slate-300 dark:border-slate-600"
                            }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            type="password"
                            placeholder="••••••••"
                            className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                                errors.password
                                    ? "border-red-500 dark:border-red-400"
                                    : "border-slate-300 dark:border-slate-600"
                            }`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition"
                    >
                        Create account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
