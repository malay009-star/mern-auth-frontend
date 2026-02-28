"use client";

import { useAuth } from "@/hooks/use-auth";
import { getDashboard } from "@/lib/auth-api";
import { useEffect } from "react";

export default function Dashboard() {
    const auth = useAuth();
    const { user, logout } = auth as { user: { username?: string }; logout: () => Promise<void> };

    const getDashboardData = async () => {
        const { data } = await getDashboard();
        console.log(data);
    }

    useEffect(() => {
        getDashboardData();
    }, []);

    const userName = user?.username;
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        Dashboard
                    </h1>
                    <button
                        onClick={logout}
                        className="text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-600"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="max-w-5xl mx-auto px-6 py-10">
                <section className="mb-10 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-800 p-8 md:p-10 shadow-xl shadow-indigo-200/50 dark:shadow-indigo-900/20 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Welcome back, {userName}
                    </h2>
                    <p className="mt-2 text-lg text-indigo-100 dark:text-indigo-200">
                        Here’s a quick overview of your account.
                    </p>
                </section>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-7 md:p-8 shadow-lg shadow-slate-200/50 dark:shadow-black/10 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/20 transition-shadow">
                        <h3 className="text-base font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Account
                        </h3>
                        <p className="mt-4 text-slate-700 dark:text-slate-200 text-base leading-relaxed">
                            You’re signed in. Manage your profile and settings from here when you’re ready.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-7 md:p-8 shadow-lg shadow-slate-200/50 dark:shadow-black/10 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/20 transition-shadow">
                        <h3 className="text-base font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Quick links
                        </h3>
                        <div className="mt-4 flex flex-col gap-3">
                            <p className="text-base text-slate-600 dark:text-slate-300">
                                You’re on the dashboard. Use Logout above when you’re done.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
