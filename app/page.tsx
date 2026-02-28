"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IUserProfile } from "@/types/user.types";

export default function Home() {
  const auth = useAuth();
  const { user, loading } = auth as { user: IUserProfile; loading: boolean };
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (user?.role === "admin") {
      router.push("/dashboard");
    } else if (user?.role === "user") {
      router.push("/profile");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 flex items-center h-14 gap-4">
          <h1 className="flex-1 text-center text-xl font-semibold text-gray-800">
            CodeWithMallay
          </h1>
          <nav className="flex-1 hidden sm:flex items-center gap-6">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Contact", href: "#contact" },
              { label: "Blog", href: "#blog" },
            ].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {page.label}
              </Link>
            ))}
          </nav>
          <div className="flex-1 flex items-center justify-end gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Landing content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Welcome to CodeWithMallay
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Build and learn with simple, clear code. Join to access your dashboard,
          manage your profile, and get started.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-gray-900 text-white hover:bg-gray-800"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Sign In
          </Link>
        </div>

        {/* Two cards below buttons */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12 text-left">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Learn & Build</h3>
            <p className="text-sm text-gray-600">
              Clear tutorials and examples to help you learn coding and build real projects step by step.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Dashboard & Profile</h3>
            <p className="text-sm text-gray-600">
              Manage your account, view your profile, and access your dashboard after signing in.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
