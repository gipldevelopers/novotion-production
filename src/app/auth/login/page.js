"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Invalid email or password");
        toast.error("Login Denied");
        setLoading(false);
        return;
      }

      toast.success("Welcome back!");

      // Check for admin role and redirect accordingly
      if (data.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push(callbackUrl);
      }

      router.refresh(); // Refresh to update header state
    } catch (err) {
      setFormError("An unexpected error occurred. Please try again.");
      toast.error("Connection error");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white font-sans">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-700 to-indigo-900 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              Empowering Your Professional Journey.
            </h2>
            <p className="text-blue-100 text-lg">
              Log in to access your personalized career packages, track your
              services, and accelerate your growth.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 bg-white/10 w-fit p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
          <ShieldCheck className="h-10 w-10 text-blue-300" />
          <div>
            <p className="font-bold">Secure Access</p>
            <p className="text-sm text-blue-100">
              Your data is fully encrypted.
            </p>
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute -bottom-20 -right-20 h-96 w-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -top-20 -left-20 h-96 w-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 relative bg-slate-50/30">
        <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex justify-center mb-6">
            <Link
              href="/"
              className="transition-transform hover:scale-105 duration-300"
            >
              <Image
                src="/logo/novotion_01.svg"
                alt="Novotion"
                width={180}
                height={50}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 mt-2 text-sm italic">
              Enter your credentials to access your account
            </p>
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="text-xs font-semibold">{formError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" /> Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] text-blue-600 font-bold hover:underline uppercase tracking-widest"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all uppercase tracking-widest text-xs"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-white px-3 text-slate-400">
                Join the Circle
              </span>
            </div>
          </div>

          <Link
            href={`/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="block"
          >
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl text-slate-700 font-bold border-slate-200 hover:bg-slate-50 transition-colors uppercase tracking-widest text-[10px]"
            >
              Create New Account
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="relative flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src="/favicon.ico"
                alt="Novotion"
                width={64}
                height={64}
                className="animate-pulse"
              />
              <div className="absolute -inset-4 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <div className="text-blue-600 font-bold tracking-widest text-xs uppercase animate-pulse">
              Loading Novotion
            </div>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
