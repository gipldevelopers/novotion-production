"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShoppingCart,
  ArrowRight,
  Zap,
  Shield,
  Star,
  Globe,
  Users,
  CheckCircle,
  Clock,
  Briefcase,
  Target,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// MOCK DATA - This is structured to be easily replaced by an API call in the future
const MOCK_CUSTOM_SERVICES = [
  {
    id: "custom-starter",
    name: "Custom Starter Package",
    price: 500,
    description:
      "A tailored entry-level solution for professionals looking for immediate career impact and focused guidance.",
    icon: Zap,
    features: [
      "Personalized Career Strategy Development",
      "Direct Access to Senior Mentors (2 sessions)",
      "Customized Interview Preparation",
      "Priority Support via Email",
      "Curated Job Referrals",
    ],
    color: "blue",
    badge: "Starter",
  },
  {
    id: "custom-elite",
    name: "Custom Elite Package",
    price: 1000,
    description:
      "Our most comprehensive high-end support package designed for rapid career acceleration and executive positioning.",
    icon: Star,
    features: [
      "Standard Starter Package features",
      "1-on-1 Executive Coaching Sessions (5 sessions)",
      "Unlimited Resume & Profile Refinements",
      "24/7 Priority WhatsApp Support",
      "Direct Introductions to Key Hiring Managers",
      "Salary Negotiation Support for Job Offers",
    ],
    badge: "Popular",
    color: "indigo",
  },
];

const CustomServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Simulate API Call
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      // In the future, replace this with:
      // const res = await fetch('/api/custom-services');
      // const data = await res.json();
      // setServices(data);

      // Simulating a small delay
      setTimeout(() => {
        setServices(MOCK_CUSTOM_SERVICES);
        setLoading(false);
      }, 500);
    };

    fetchServices();
  }, []);

  const handleAddToCart = (pkg) => {
    const serviceWithId = {
      ...pkg,
      id: pkg.id || pkg.name.toLowerCase().replace(/\s+/g, "-"),
      type: "custom-service",
    };

    addToCart(serviceWithId);
    toast.success(`${pkg.name} added to cart!`, {
      description:
        "You've successfully added this custom service. Check your cart to proceed.",
      duration: 3000,
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/services/cart"),
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-500/20">
            <Sparkles className="h-4 w-4" />
            Bespoke Career Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Custom <span className="text-blue-500">Service Packages</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your career journey is unique. Our custom services are designed to
            provide the specific support you need to overcome any obstacle and
            reach your professional goals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((pkg) => (
              <div
                key={pkg.id}
                className="group relative transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-blue-100/50 group-hover:border-blue-100" />

                <div className="relative p-8 md:p-10 h-full flex flex-col">
                  {pkg.badge && (
                    <div className="absolute -top-4 right-10 px-5 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="mb-8">
                    <div
                      className={`h-16 w-16 rounded-2xl ${pkg.color === "blue" ? "bg-blue-50 text-blue-600" : pkg.color === "indigo" ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-800"} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-current/10 shadow-sm`}
                    >
                      <pkg.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3">
                      {pkg.name}
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="mb-10 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-slate-900">
                        ${pkg.price}
                      </span>
                      <span className="text-slate-400 font-bold uppercase tracking-tight text-xs">
                        / Total
                      </span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                      One-time Investment
                    </p>
                  </div>

                  <div className="space-y-4 mb-12 flex-1">
                    {pkg.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                        </div>
                        <span className="text-slate-600 font-semibold text-sm leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-slate-100">
                    <Button
                      onClick={() => handleAddToCart(pkg)}
                      className={`w-full h-14 ${pkg.color === "blue" ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200" : pkg.color === "indigo" ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" : "bg-slate-900 hover:bg-black shadow-slate-200"} text-white font-black rounded-2xl shadow-xl transition-all duration-300 gap-3 text-lg group/btn`}
                    >
                      <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                      <Shield className="h-3 w-3" /> Secure 256-bit SSL Payment
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Custom */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                Why Choose Custom Solutions?
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Generic solutions provide generic results. Custom services are
                built around your specific needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Focused Strategy",
                  desc: "Every session and deliverable is tuned to your specific career goals and target roles.",
                  icon: Target,
                },
                {
                  title: "Expert Mentorship",
                  desc: "Get paired with industry veterans who have walked the path you're currently on.",
                  icon: Users,
                },
                {
                  title: "Accelerated Growth",
                  desc: "Save months of trial and error with proven frameworks and direct connections.",
                  icon: Zap,
                },
                {
                  title: "End-to-End Support",
                  desc: "We don't just provide a service; we partner with you until your goal is achieved.",
                  icon: Shield,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-start group hover:border-blue-500 transition-colors"
                >
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Still Not Sure Which Package is Right?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Schedule a free 15-minute consultation with one of our career
            strategists to find your perfect fit.
          </p>
          <Link href="/contact#contact-form">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-black px-10 h-16 rounded-2xl text-lg shadow-2xl hover:scale-105 transition-all">
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomServicesPage;
