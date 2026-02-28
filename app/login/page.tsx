"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginUser } from "@/lib/auth-api";
import { setAccessToken } from "@/lib/axios";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { IUserProfile } from "@/types/user.types";

type LoginForm = {
    email: string;
    password: string;
};

const Login = () => {
    const router = useRouter();
    const auth = useAuth();
    const { user, loading } = auth as { user: IUserProfile; loading: boolean };

    useEffect(() => {
        if (loading) return;

        // Already logged in → redirect based on role
        if (user?.role === "admin") {
            router.push("/dashboard");
        } else if (user?.role === "user") {
            router.push("/profile");
        }
    }, [user, loading, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit = async (formData: LoginForm) => {
        try {
            const { data } = await loginUser(formData);
            setAccessToken(data.accessToken);
            // Redirect after successful login
            if (data.user.role === "admin") {
                router.push("/dashboard");
            } else {
                router.push("/profile");
            }
        } catch (err: unknown) {
            console.log(err);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 p-8">
                <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 text-center mb-6">
                    Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                            className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.email
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
                            className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.password
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
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition"
                    >
                        Sign in
                    </button>

                </form>
                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    Don&apos;t have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
