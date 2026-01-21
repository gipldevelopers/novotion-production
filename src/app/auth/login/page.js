"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
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
      router.push(callbackUrl);
      router.refresh(); // Refresh to update header state
    } catch (err) {
      setFormError("An unexpected error occurred. Please try again.");
      toast.error("Connection error");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-700 to-indigo-900 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <Image src="/logo/novotion_01.svg" alt="Novotion" width={40} height={40} className="brightness-0 invert" />
            <span className="text-2xl font-bold tracking-tight text-white">Novotion</span>
          </Link>

          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              Empowering Your Professional Journey.
            </h2>
            <p className="text-blue-100 text-lg">
              Log in to access your personalized career packages, track your services, and accelerate your growth.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 bg-white/10 w-fit p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
          <ShieldCheck className="h-10 w-10 text-blue-300" />
          <div>
            <p className="font-bold">Secure Access</p>
            <p className="text-sm text-blue-100">Your data is fully encrypted.</p>
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute -bottom-20 -right-20 h-96 w-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -top-20 -left-20 h-96 w-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{formError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="michael.scott@example.com"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Password
                </label>
                <Link href="#" className="text-xs text-blue-600 font-semibold hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">New to Novotion?</span></div>
          </div>

          <Link href={`/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="block">
            <Button variant="outline" className="w-full h-12 rounded-xl text-gray-700 font-semibold border-gray-200 hover:bg-gray-50 transition-colors">
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
