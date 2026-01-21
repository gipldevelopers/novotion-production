'use client';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Home, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const txnId = searchParams.get('txnId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    // Clear cart on successful payment arrival
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            {amount && <p className="text-2xl font-bold text-blue-600 mb-4">${amount}</p>}

            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Our team will contact you within 24 hours to begin your career journey.
            </p>

            {txnId && (
              <div className="bg-white/50 border border-blue-100 rounded-lg p-3 mb-8 text-sm">
                <span className="text-gray-500">Transaction ID: </span>
                <span className="font-mono font-medium text-gray-900">{txnId}</span>
              </div>
            )}

            <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-100 shadow-sm">
              <h3 className="font-semibold mb-4 text-left">Next Steps:</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">You'll receive a confirmation email</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Our advisor will schedule your session</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Access your career resources portal</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
              <Link href="/my-services">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Your Services
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