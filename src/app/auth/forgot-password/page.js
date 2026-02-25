"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    Loader2,
    ArrowRight,
    AlertCircle,
    CheckCircle2,
    ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Something went wrong. Please try again.");
                return;
            }

            setSubmitted(true);
            toast.success("Reset link sent!");
        } catch (err) {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50/30">
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
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Forgot Password?</h1>
                            <p className="text-slate-500 mt-2 text-sm italic">
                                Enter your email and we&apos;ll send you a link to reset your password.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <p className="text-xs font-semibold">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5" /> Email Address
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
                                        Send Reset Link <ArrowRight className="h-4 w-4" />
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
                            <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
                            <p className="text-slate-500 text-sm">
                                We&apos;ve sent a password reset link to <span className="font-bold text-slate-700">{email}</span>.
                            </p>
                        </div>
                        <p className="text-xs text-slate-400">
                            Didn&apos;t receive it? Check your spam folder or try again.
                        </p>
                    </div>
                )}

                <div className="pt-4 border-t border-slate-100">
                    <Link
                        href="/auth/login"
                        className="flex items-center justify-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                    </Link>
                </div>
            </div>
        </main>
    );
}
