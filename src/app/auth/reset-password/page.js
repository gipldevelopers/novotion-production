"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Lock,
    Loader2,
    ArrowRight,
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Failed to reset password. Link may be expired.");
                return;
            }

            setSubmitted(true);
            toast.success("Password reset successfully!");
            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
        } catch (err) {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                <h1 className="text-xl font-bold text-slate-900">Invalid Link</h1>
                <p className="text-slate-500 text-sm">This password reset link is invalid or missing.</p>
                <Link href="/auth/login" className="text-blue-600 font-bold uppercase tracking-widest text-xs">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex justify-center mb-4">
                <Link href="/" className="transition-transform hover:scale-105 duration-300">
                    <Image
                        src="/logo/novotion_01.svg"
                        alt="Novotion"
                        width={280}
                        height={100}
                        className="h-20 w-auto object-contain"
                        priority
                    />
                </Link>
            </div>

            {!submitted ? (
                <>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Set New Password</h1>
                        <p className="text-slate-500 mt-2 text-sm italic">
                            Please enter your new password below.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl flex items-center gap-3">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <p className="text-xs font-semibold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                <Lock className="h-3.5 w-3.5" /> New Password
                            </label>
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
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                <Lock className="h-3.5 w-3.5" /> Confirm Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all uppercase tracking-widest text-xs"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Updating</span>
                                </div>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Reset Password <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </>
            ) : (
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900">Success!</h2>
                        <p className="text-slate-500 text-sm">
                            Your password has been successfully reset. Redirecting to login...
                        </p>
                    </div>
                    <Link href="/auth/login" className="block">
                        <Button className="w-full h-11 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-xl transition-all uppercase tracking-widest text-xs">
                            Go to Login Now
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50/30">
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-blue-600" />}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    );
}
