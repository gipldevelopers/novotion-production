"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cancellation & Refund Policy
            </h1>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto"></div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 lg:p-10">
            <div className="space-y-8 text-gray-600">
              
              {/* SECTION 1 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  1. No Refund Policy
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    All fees paid to <strong>Novotion</strong> are non-refundable once services have been initiated.
                  </li>
                  <li>
                    The Client acknowledges that there is no refund or reimbursement under any circumstances, regardless of employment status, after services have commenced.
                  </li>
                </ul>
              </section>

              {/* SECTION 2 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  2. Employment Guarantee Disclaimer
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Novotion does not guarantee job placement or employment.</li>
                  <li>
                    Success depends on the Client's effort, commitment, and third-party hiring decisions, which are beyond Novotion's control.
                  </li>
                </ul>
              </section>

              {/* SECTION 3 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  3. Service Interruption & Reinstatement
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    If employment is interrupted due to unforeseen circumstances, Novotion will reinstate services without charging the remaining service fees.
                  </li>
                  <li>
                    Once the Client secures new employment, full fees as per the Agreement will become due.
                  </li>
                </ul>
              </section>

              {/* Last Updated */}
              <div className="pt-8 mt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicyPage;