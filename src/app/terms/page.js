"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto"></div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 lg:p-10">
            <div className="space-y-8 text-gray-600">
              
              {/* SECTION 1 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Services</h2>
                <p className="mb-3">
                  Novotion provides specialized, results-driven career development and job
                  attainment programs. Depending on the selected plan, services may
                  include one-on-one consultations, curated interview opportunities,
                  personalized coaching, skill-building workshops, resume and LinkedIn
                  optimization, recruiter engagement, AI-driven marketing, and access to
                  premium career resources.
                </p>
                <p className="mb-3">
                  Service delivery methods are determined solely by Novotion.
                </p>
                <p className="mb-3">
                  In recognition of Novotion's continued career support and post-placement
                  assistance, clients agree to a <strong>Career Success Contribution</strong> that
                  reflects the value of services rendered throughout and after successful
                  hiring outcomes.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Basic Plan</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Enrollment Fee:</strong> $2,500 (due at enrollment)</li>
                      <li><strong>Flexible Payment:</strong> 4 easy installments</li>
                      <li>
                        <strong>Includes:</strong> One-on-one consultation, 10 curated interview
                        opportunities, 2 complimentary proxy interviews, resume optimization,
                        LinkedIn review, weekly job market insights, recruiter engagement,
                        AI-driven profile marketing, and access to career resources.
                      </li>
                      <li>
                        <strong>Career Success Contribution:</strong> Applies upon attainment of a verified
                        job offer and completion of post-placement support services.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Standard Plan</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Enrollment Fee:</strong> $3,500 (due at enrollment)</li>
                      <li><strong>Flexible Payment:</strong> 4 easy installments</li>
                      <li>
                        <strong>Includes:</strong> 15 interview opportunities, 2 proxy interviews,
                        personalized resume rebuild, mock interviews, recruiter network
                        access, priority submissions, and AI profile marketing.
                      </li>
                      <li>
                        <strong>Career Success Contribution:</strong> Linked to successful job outcomes and
                        activation of premium support services.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Advanced Plan</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Enrollment Fee:</strong> $4,000 (due at enrollment)</li>
                      <li><strong>Flexible Payment:</strong> 4 easy installments</li>
                      <li>
                        <strong>Includes:</strong> 18 interview opportunities, unlimited proxy interviews,
                        intensive coaching, real-time sessions, LinkedIn optimization, and
                        AI-powered visibility.
                      </li>
                      <li>
                        <strong>Career Success Contribution:</strong> Due upon completion of successful
                        placement support and transition guidance.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Premium Plan</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Enrollment Fee:</strong> $5,000 (due at enrollment)</li>
                      <li><strong>Flexible Payment:</strong> 4 easy installments</li>
                      <li>
                        <strong>Includes:</strong> 22 interviews, unlimited proxy support, lifetime resume
                        updates, 24/7 portal access, direct hiring manager introductions, and
                        VIP coaching.
                      </li>
                      <li>
                        <strong>Career Success Contribution:</strong> Reflects lifetime access, employer
                        introductions, and ongoing advisory services following successful
                        career placement.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION 2 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Payments & Financial Terms</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All enrollment fees are non-refundable once services are initiated.</li>
                  <li>
                    Career Success Contributions are assessed only after a verified job
                    offer or equivalent placement milestone, and reflect continued access
                    to post-placement resources.
                  </li>
                  <li>Payments must be made according to the agreed schedule; delays may
                    result in suspension or termination of services.</li>
                  <li>Failure to pay may authorize Novotion to collect via ACH, Stripe, or
                    other approved payment mechanisms.</li>
                  <li>Disputes regarding payments shall follow the Dispute Resolution
                    clause.</li>
                </ul>
              </section>

              {/* SECTION 3 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Client Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Clients must actively participate in all training, coaching, and
                    interview processes.</li>
                  <li>Defaulting on payments results in loss of access to services; re-entry
                    may require new enrollment.</li>
                  <li>Clients agree to indemnify Novotion against claims arising from their
                    actions or omissions.</li>
                </ul>
              </section>

              {/* SECTION 4 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Warranties & Liability</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Novotion provides training and placement support but makes no
                    guarantee of employment outcomes.</li>
                  <li>Hiring decisions are solely at the discretion of employers or
                    third-party organizations.</li>
                </ul>
              </section>

              {/* SECTION 5 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Dispute Resolution</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All disputes will first be addressed through good-faith negotiation. If the issue remains unresolved:</li>
                  <li><strong>Payment Gateway Disputes:</strong> Mediation and binding arbitration shall take place in India.</li>
                  <li><strong>Disputes Involving Customers in the United States:</strong> Mediation and binding arbitration shall take place in the State of Delaware.</li>
                </ul>
              </section>

              {/* SECTION 6 */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Legal & Miscellaneous</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Governing Law:</strong>
                    <ul className="list-disc list-inside ml-5 mt-1">
                      <li>Disputes related to the payment gateway will be governed by the laws of India.</li>
                      <li>Disputes involving U.S.-based customers will be governed by the laws of the State of Delaware.</li>
                    </ul>
                  </li>
                  <li><strong>Independent Contractor:</strong> Novotion operates as an independent contractor, not an employer.</li>
                  <li><strong>Force Majeure:</strong> Novotion is not responsible for delays caused by circumstances beyond its control (including natural disasters, pandemics, government actions, or labor strikes).</li>
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

export default TermsAndConditionsPage;