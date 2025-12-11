"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto"></div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 lg:p-10">
            <div className="space-y-8 text-gray-600">
              
              {/* SECTION 1 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  1. Information We Collect
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Personal details provided during enrollment (name, contact info, payment details).
                  </li>
                  <li>
                    Employment-related information (salary, job offer details) necessary to calculate service fees.
                  </li>
                  <li>
                    Data voluntarily shared during training and support interactions.
                  </li>
                </ul>
              </section>

              {/* SECTION 2 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To provide career training, coaching, and support services.</li>
                  <li>To manage billing, invoicing, and service fee collection.</li>
                  <li>To improve our services and offer relevant content.</li>
                  <li>To comply with legal obligations.</li>
                </ul>
              </section>

              {/* SECTION 3 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Confidentiality</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    All proprietary and personal information shared by the Client will be treated as confidential.
                  </li>
                  <li>
                    Information will not be disclosed to third parties without consent, except as required by law or for payment collection purposes.
                  </li>
                </ul>
              </section>

              {/* SECTION 4 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Protection</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payments are processed securely via ACH or Stripe.</li>
                  <li>
                    Novotion takes reasonable measures to protect personal data from unauthorized access or misuse.
                  </li>
                </ul>
              </section>

              {/* SECTION 5 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Client Rights</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Clients may request clarification on how their data is used.</li>
                  <li>
                    By using our services, Clients consent to the terms outlined in this Privacy Policy.
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

export default PrivacyPolicyPage;