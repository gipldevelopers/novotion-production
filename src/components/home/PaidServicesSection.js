'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  CreditCard,
  Briefcase,
  FileText,
  MessageSquare,
  BadgeCheck,
  Target,
  ShoppingCart,
  Zap,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';

const PaidServicesSection = () => {
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (service, type) => {
    const serviceWithId = {
      ...service,
      id: service.id || service.name.toLowerCase().replace(/\s+/g, '-'),
      type: type
    };

    addToCart(serviceWithId);
    toast.success(`${service.name} added to cart!`, {
      description: "You've successfully added this service. Check your cart to proceed.",
      duration: 3000,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/services/cart'
      },
    });
  };

  const careerPackages = [
    {
      id: 'application-boost',
      name: 'Application Boost',
      price: 1499,
      originalPrice: 1999,
      description: 'Kickstart your job search with optimized materials',
      icon: FileText,
      features: [
        'Professional Resume Optimization',
        'LinkedIn Profile Enhancement',
        'Strategy Consultation Call',
        'Cover Letter Template',
        '30-day Support'
      ],
      color: 'blue'
    },
    {
      id: 'interview-edge',
      name: 'Interview Edge',
      price: 2499,
      originalPrice: 3299,
      description: 'Master interviews and land your dream role',
      icon: MessageSquare,
      features: [
        'Comprehensive Interview Prep',
        'Premium Resume Upgrade',
        'Role-Specific Mock Interviews',
        'Salary Negotiation Strategy',
        '60-day Support'
      ],
      badge: 'Best Value',
      color: 'indigo'
    },
    {
      id: 'all-in-one',
      name: 'All-In-One Advance',
      price: 6106,
      originalPrice: 7999,
      description: 'Complete career transformation package',
      icon: Award,
      features: [
        'Full Career Strategy Development',
        'Unlimited Resume Updates',
        'Direct Recruiter Introductions',
        'Priority Job Referrals',
        '90-day Intensive Support'
      ],
      badge: 'Premium',
      color: 'slate'
    }
  ];

  const careerPlans = [
    {
      name: 'Basic Plan',
      price: 2500,
      placementFee: '15%',
      features: '10 Interviews, Resume Optimization, AI Marketing',
      installment: 625
    },
    {
      name: 'Standard Plan',
      price: 3500,
      placementFee: '12%',
      features: '15 Interviews, Mock Interviews, Priority Submissions',
      installment: 875,
      popular: true
    },
    {
      name: 'Premium Plan',
      price: 5000,
      placementFee: '10%',
      features: '22 Interviews, Technical Training, VIP Support',
      installment: 1250
    }
  ];

  const proServices = [
    {
      name: 'Resume Upgrade Pro',
      price: 299,
      icon: FileText,
      description: 'Professional resume rewriting'
    },
    {
      name: 'Profile Verification',
      price: 149,
      icon: BadgeCheck,
      description: 'Complete profile validation'
    },
    {
      name: 'LinkedIn Premium',
      price: 199,
      icon: Briefcase,
      description: 'Executive LinkedIn optimization'
    },
    {
      name: 'Interview Simulation',
      price: 349,
      icon: MessageSquare,
      description: 'Real-time interview practice'
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-100 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-100">
            <Sparkles className="h-3 w-3" />
            Premium Career Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Invest in Your <span className="text-blue-600">Career Evolution</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Choose from our elite selection of career growth packages and professional services designed to maximize your market value and security.
          </p>
        </div>

        {/* 1. Career Growth Packages */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Elite Packages</h3>
            </div>
            <Link href="/services/career-packages">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {careerPackages.map((pkg, idx) => (
              <div
                key={pkg.id}
                className="group relative transition-all duration-500 hover:-translate-y-1"
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <div className="absolute inset-0 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-100 group-hover:border-blue-100" />

                <div className="relative p-8 md:p-10 flex flex-col h-full">
                  {pkg.badge && (
                    <div className="absolute -top-3 right-8 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <pkg.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">{pkg.name}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{pkg.description}</p>
                  </div>

                  <div className="mb-8 p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-black text-slate-900">${pkg.price}</span>
                      <span className="text-slate-400 line-through text-lg">${pkg.originalPrice}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Single Investment</p>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {pkg.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                    <Button
                      onClick={() => handleAddToCart(pkg, 'package')}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Link href={`/services/career-packages#${pkg.id}`}>
                      <Button variant="outline" className="w-full h-12 rounded-xl text-slate-700 font-bold border-slate-200 hover:bg-slate-50 gap-2">
                        Details <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Career Attainment Program */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-slate-900 mb-4">Career Attainment Program</h3>
            <p className="text-slate-500">Intensive support with success-based payment structures</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {careerPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-[2rem] border transition-all duration-500 ${plan.popular ? 'bg-white border-blue-600 shadow-2xl ring-4 ring-blue-50' : 'bg-slate-50/50 border-slate-200'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Most Popular Choice
                  </div>
                )}

                <div className="text-center mb-8">
                  <h4 className="text-xl font-black text-slate-900 mb-4">{plan.name}</h4>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-black text-slate-900">${plan.price}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enrollment Fee</span>
                  </div>
                  <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                    + {plan.placementFee} Success Fee
                  </div>
                </div>

                <div className="mb-8 text-center text-sm font-medium text-slate-600 italic">
                  {plan.features}
                </div>

                <div className="mb-8 p-4 rounded-xl bg-white border border-slate-100 text-center">
                  <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-tighter">only in</p>
                  <p className="text-lg font-black text-slate-900">${plan.installment} <span className="text-slate-400 font-medium text-sm">/ mo</span></p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => handleAddToCart({
                      id: `cap-${plan.name.toLowerCase().replace(/\s+/g, '-')}`,
                      name: plan.name,
                      price: plan.price,
                      description: `Career Program: ${plan.name} (Success Fee: ${plan.placementFee})`
                    }, 'career-plan')}
                    className={`w-full h-11 rounded-xl font-bold transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-slate-900 hover:bg-black text-white'
                      }`}
                  >
                    Enroll Now
                  </Button>
                  <Link href="/services/career-packages#career-plans">
                    <Button variant="ghost" className="w-full text-xs font-bold text-slate-400 hover:text-blue-600">
                      View Full Terms
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. À La Carte - Premium Look */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative shadow-2xl">
            {/* Dark Mode Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 pb-8 border-b border-white/5">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight">À La Carte Pro Services</h3>
                  <p className="text-slate-400">Precision tools for specific career obstacles</p>
                </div>
                <Link href="/services/pro-services">
                  <Button className="bg-white hover:bg-slate-100 text-slate-900 font-black rounded-xl px-8 h-12 shadow-xl hover:scale-105 transition-transform">
                    Browse Full Catalog
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {proServices.map((service, idx) => (
                  <div key={idx} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-white text-sm whitespace-nowrap">{service.name}</h5>
                      <span className="text-blue-400 font-black tracking-tighter">${service.price}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-6 leading-relaxed">{service.description}</p>
                    <Button
                      onClick={() => handleAddToCart(service, 'pro-service')}
                      variant="ghost"
                      className="w-full h-9 rounded-lg border border-white/10 text-white hover:bg-white hover:text-slate-900 text-[10px] font-black uppercase tracking-widest gap-2"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Strip */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {[
            { icon: Shield, text: 'Secure Payments', label: 'SSL Encrypted' },
            { icon: Target, text: '85% Success Rate', label: 'Placement Proof' },
            { icon: CreditCard, text: 'Flex Payments', label: '0% Interest' },
            { icon: Sparkles, text: 'VIP Support', label: '24/7 Access' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <div className="h-10 w-10 text-blue-600 mb-3 opacity-80">
                {/* Using Icons directly from imports */}
                <item.icon className="h-full w-full" />
              </div>
              <p className="text-slate-900 font-black text-sm tracking-tight">{item.text}</p>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simple Shield icon if not available
const Shield = ({ className }) => <Award className={className} />;

export default PaidServicesSection;