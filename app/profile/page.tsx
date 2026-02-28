"use client";

import { useAuth } from "@/hooks/use-auth";
import { getProfile } from "@/lib/auth-api";
import type { IUserProfile, ProfileApiResponse } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const auth = useAuth();
  const { logout } = auth as { logout: () => Promise<void> };
  const router = useRouter();
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        const res = data as ProfileApiResponse;
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          setError(res.message || "Failed to load profile");
        }
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error || "Profile not found"}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Profile
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
        <section className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-7 md:p-8 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
            Account details
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Username
              </dt>
              <dd className="mt-1 text-slate-800 dark:text-slate-100">
                {user.username}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Email
              </dt>
              <dd className="mt-1 text-slate-800 dark:text-slate-100">
                {user.email}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Role
              </dt>
              <dd className="mt-1 text-slate-800 dark:text-slate-100 capitalize">
                {user.role}
              </dd>
            </div>
            {user.phone && (
              <div>
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Phone
                </dt>
                <dd className="mt-1 text-slate-800 dark:text-slate-100">
                  {user.phone}
                </dd>
              </div>
            )}
            {user.bio && (
              <div>
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Bio
                </dt>
                <dd className="mt-1 text-slate-800 dark:text-slate-100">
                  {user.bio}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Verified
              </dt>
              <dd className="mt-1">
                <span
                  className={
                    user.isVerified
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }
                >
                  {user.isVerified ? "Yes" : "No"}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Member since
              </dt>
              <dd className="mt-1 text-slate-800 dark:text-slate-100 text-sm">
                {formatDate(user.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Last updated
              </dt>
              <dd className="mt-1 text-slate-800 dark:text-slate-100 text-sm">
                {formatDate(user.updatedAt)}
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}
