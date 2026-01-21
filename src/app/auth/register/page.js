"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, Loader2, ArrowRight, ShieldCheck, CheckCircle, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Could not create account");
        toast.error("Registration Failed");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
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
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-700 to-blue-900 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <Image src="/logo/novotion_01.svg" alt="Novotion" width={40} height={40} className="brightness-0 invert" />
            <span className="text-2xl font-bold tracking-tight text-white">Novotion</span>
          </Link>

          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              Join the future of professional growth.
            </h2>
            <div className="space-y-4">
              {[
                "Access premium career packages",
                "Track your orders in real-time",
                "Exclusive pro-services gateway",
                "24/7 Expert support"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-indigo-100">
                  <CheckCircle className="h-5 w-5 text-indigo-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 bg-white/10 w-fit p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
          <ShieldCheck className="h-10 w-10 text-indigo-300" />
          <div>
            <p className="font-bold">Privacy Guaranteed</p>
            <p className="text-sm text-indigo-100">Safe and secure registration.</p>
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute -bottom-20 -right-20 h-96 w-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -top-20 -left-20 h-96 w-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Right Side: Register Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2">Start your premium journey with us today</p>
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
                <User className="h-4 w-4" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Michael Scott"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="michael.scott@example.com"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4" /> Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none pr-12"
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
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Already have an account?</span></div>
          </div>

          <Link href={`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="block">
            <Button variant="outline" className="w-full h-12 rounded-xl text-gray-700 font-semibold border-gray-200 hover:bg-gray-50 transition-colors">
              Sign In Instead
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
