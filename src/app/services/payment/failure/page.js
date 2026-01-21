'use client';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, AlertCircle, Home, RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

function PaymentFailureContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const reason = searchParams.get('reason') || 'Transaction was declined by the bank or cancelled.';
    const txnId = searchParams.get('txnId');

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-2xl mx-auto">

                        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-red-100/50 border border-gray-100 text-center relative overflow-hidden">
                            {/* Decorative Accent (Not text) */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>

                            <div className="h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
                                <XCircle className="h-12 w-12 text-red-500" />
                            </div>

                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Failed</h1>
                            <p className="text-gray-500 mb-8">{reason}</p>

                            {txnId && (
                                <div className="max-w-xs mx-auto bg-gray-50 border border-gray-100 rounded-xl p-3 mb-10">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Reference ID</p>
                                    <p className="text-sm font-mono text-gray-700 truncate">{txnId}</p>
                                </div>
                            )}

                            <div className="bg-red-50/50 rounded-2xl p-6 mb-10 border border-red-100 text-left">
                                <h3 className="text-lg font-bold text-red-900 mb-4 px-2 flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    What happened?
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "Incorrect card details (CVV, Expiry, or Card Number).",
                                        "Insufficient funds in your account.",
                                        "Transaction blocked by your bank for security.",
                                        "Network connection issues during processing."
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-3 items-start group">
                                            <div className="mt-1 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                                            </div>
                                            <p className="text-red-800 text-sm leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link href="/services/payment" className="w-full">
                                    <Button className="w-full h-14 rounded-2xl gap-2 font-bold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200">
                                        <RefreshCw className="h-5 w-5" />
                                        Try Again
                                    </Button>
                                </Link>
                                <Link href="/contact" className="w-full">
                                    <Button variant="outline" className="w-full h-14 rounded-2xl gap-2 font-bold text-gray-700 hover:bg-gray-50 border-gray-200">
                                        <MessageCircle className="h-5 w-5" />
                                        Contact Support
                                    </Button>
                                </Link>
                            </div>

                            <Link href="/" className="inline-block mt-8 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                                Return to Home
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default function PaymentFailure() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                        <Image src="/favicon.ico" alt="Novotion" width={64} height={64} className="animate-pulse" />
                        <div className="absolute -inset-4 border-4 border-slate-100 border-t-red-600 rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        }>
            <PaymentFailureContent />
        </Suspense>
    );
}
