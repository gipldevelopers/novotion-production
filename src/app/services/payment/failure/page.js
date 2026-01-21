'use client';
import Link from 'next/link';
import { XCircle, AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';

export default function PaymentFailure() {
    const searchParams = useSearchParams();
    const reason = searchParams.get('reason') || 'Transaction was declined by the bank or cancelled.';
    const txnId = searchParams.get('txnId');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-orange-50/20">
            <Header />

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-md mx-auto text-center">
                        <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <XCircle className="h-10 w-10 text-red-600" />
                        </div>

                        <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
                        <p className="text-gray-600 mb-6">
                            {reason}
                        </p>

                        {txnId && (
                            <div className="bg-white border border-gray-100 rounded-lg p-3 mb-8 text-sm">
                                <span className="text-gray-500">Transaction ID: </span>
                                <span className="font-mono font-medium text-gray-900">{txnId}</span>
                            </div>
                        )}

                        <div className="bg-red-50 rounded-lg p-6 mb-8 text-left border border-red-100">
                            <div className="flex gap-3">
                                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-red-900 mb-1">What can you do?</h3>
                                    <ul className="space-y-2 text-sm text-red-800">
                                        <li>Check your card details and try again</li>
                                        <li>Ensure you have sufficient funds</li>
                                        <li>Contact your bank for authorization</li>
                                        <li>Try a different payment method</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link href="/services/payment">
                                <Button className="w-full bg-red-600 hover:bg-red-700">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Try Again
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" className="w-full">
                                    <Home className="mr-2 h-4 w-4" />
                                    Return to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
