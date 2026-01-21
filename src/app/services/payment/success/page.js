'use client';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Home, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [countdown, setCountdown] = useState(5);

  const txnId = searchParams.get('txnId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/my-services');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">

            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-blue-100/50 border border-gray-100 text-center relative overflow-hidden">
              {/* Background Accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

              <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Confirmed!</h1>
              <p className="text-gray-500 mb-6">Your transaction has been processed successfully.</p>

              {amount && (
                <div className="inline-block bg-blue-50 px-6 py-2 rounded-2xl mb-8">
                  <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider block mb-1">Amount Paid</span>
                  <span className="text-3xl font-black text-blue-700">${amount}</span>
                </div>
              )}

              {txnId && (
                <div className="max-w-xs mx-auto bg-gray-50 border border-gray-100 rounded-xl p-3 mb-10">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Transaction Ref</p>
                  <p className="text-sm font-mono text-gray-700 truncate">{txnId}</p>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 mb-10 border border-gray-100 text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">Next Steps:</h3>
                <div className="space-y-4">
                  {[
                    "You'll receive a confirmation email with your receipt.",
                    "Our advisor will reach out to schedule your setup session.",
                    "Access your new dashboard in your career portal."
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3 items-start group">
                      <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/" className="w-full">
                  <Button variant="outline" className="w-full h-14 rounded-2xl gap-2 font-bold text-gray-700 hover:bg-gray-50 border-gray-200">
                    <Home className="h-5 w-5" />
                    Return Home
                  </Button>
                </Link>
                <Link href="/my-services" className="w-full">
                  <Button className="w-full h-14 rounded-2xl gap-2 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                    <FileText className="h-5 w-5" />
                    Go to My Services
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                Auto-redirecting in <span className="text-blue-600 font-bold">{countdown}s</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <Image src="/favicon.ico" alt="Novotion" width={64} height={64} className="animate-pulse" />
            <div className="absolute -inset-4 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="text-blue-600 font-bold tracking-widest text-xs uppercase animate-pulse">Confirming Payment</div>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
