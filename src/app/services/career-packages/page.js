'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Star,
  TrendingUp,
  Zap,
  Target,
  Users,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
  Rocket,
  Award,
  Briefcase,
  FileText,
  MessageSquare,
  Calendar,
  Globe,
  CreditCard,
  ShieldCheck,
  BadgeCheck,
  ShoppingCart,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg sm:rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CareerPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { addToCart } = useCart();
  const checkoutRef = useRef(null);

  const packages = [
    {
      id: 'basic',
      name: 'Application Boost',
      price: 1499,
      originalPrice: 1999,
      description: 'Kickstart your job search with optimized application materials',
      badge: 'Most Popular',
      badgeColor: 'bg-blue-600',
      features: [
        'Professional Resume Optimization',
        'LinkedIn Profile Enhancement',
        'Personalized Application Strategy Call',
        'Cover Letter Template',
        'Email Templates for Job Applications',
        'Basic Job Search Strategy',
        '30-day Support'
      ],
      highlights: [
        'Increase interview chances by 3x',
        'Optimized for ATS systems',
        'Personal 1-on-1 consultation'
      ]
    },
    {
      id: 'pro',
      name: 'Interview Edge',
      price: 2499,
      originalPrice: 3299,
      description: 'Master interviews and land your dream role',
      badge: 'Best Value',
      badgeColor: 'bg-green-600',
      features: [
        'Everything in Application Boost',
        'Comprehensive Interview Preparation',
        'Resume Upgrade (Premium Version)',
        'Role-Specific Mock Interviews',
        'Salary Negotiation Strategy',
        'Behavioral Interview Coaching',
        'Technical Interview Prep',
        '60-day Support',
        'Post-Interview Analysis'
      ],
      highlights: [
        '95% success rate in interviews',
        'Average salary increase of 25%',
        'Access to interview question bank'
      ]
    },
    {
      id: 'advanced',
      name: 'All-In-One Advance',
      price: 6106,
      originalPrice: 7999,
      description: 'Complete career transformation package',
      badge: 'Premium',
      badgeColor: 'bg-purple-600',
      features: [
        'Everything in Interview Edge',
        'Full Career Strategy Development',
        'Unlimited Resume Updates (6 months)',
        'Executive LinkedIn Optimization',
        'Direct Recruiter Introductions',
        'Company Research & Targeting',
        'Contract Review & Negotiation',
        '90-day Intensive Support',
        'Priority Job Referrals',
        'Career Growth Roadmap',
        'Quarterly Career Check-ins'
      ],
      highlights: [
        'Guaranteed placement assistance',
        'Average time-to-offer: 45 days',
        'VIP access to hiring managers'
      ]
    }
  ];

  const careerPlans = [
    {
      id: 'plan-basic',
      name: 'Basic Plan',
      enrollmentFee: 2500,
      placementFee: 15,
      total: 2500,
      installment: 625,
      description: 'Perfect for starting your job search journey',
      features: [
        'One-on-One Enrollment Consultation',
        '10 Curated Interview Opportunities',
        '2 Complimentary Proxy Interviews',
        'Resume Optimization Services',
        'LinkedIn Profile Review & Enhancement',
        'Weekly Job Market Insights',
        'Ongoing Job Search Support',
        'Recruiter Check-ins & Engagement',
        'AI-Driven Profile Marketing',
        'Access to Career Resources & Strategy Sessions'
      ]
    },
    {
      id: 'plan-standard',
      name: 'Standard Plan',
      enrollmentFee: 3500,
      placementFee: 12,
      total: 3500,
      installment: 875,
      description: 'Comprehensive career advancement',
      badge: 'Recommended',
      features: [
        '15 Interview Opportunities',
        '2 Complimentary Proxy Interviews',
        'In-Depth Training Modules',
        'Personalized Resume & Cover Letter Rebuild',
        'Mock Interviews with Detailed Feedback',
        'Exclusive Access to Recruiter Network',
        'Priority Job Application Submissions',
        'Customized Job Search Plan',
        'Extended AI Profile Marketing'
      ]
    },
    {
      id: 'plan-advanced',
      name: 'Advanced Plan',
      enrollmentFee: 4000,
      placementFee: 12,
      total: 4000,
      installment: 1000,
      description: 'Intensive interview-focused program',
      features: [
        '18 Interview Opportunities',
        'Unlimited Proxy Interviews & Assessments',
        'Intensive Interview Coaching',
        'Personalized Interview Strategy Plan',
        'Real-Time Role Play Sessions with Experts',
        'Advanced LinkedIn Profile Optimization',
        'Support Through All Interview Rounds',
        'Direct Employer Submissions',
        'Ongoing AI-Powered Profile Visibility'
      ]
    },
    {
      id: 'plan-premium',
      name: 'Premium Plan',
      enrollmentFee: 5000,
      placementFee: 10,
      total: 5000,
      installment: 1250,
      description: 'Full-suite career launch experience',
      badge: 'VIP',
      features: [
        '22 Interview Opportunities',
        'Unlimited Proxy & Interview Support',
        '1-Month Technical Training',
        'Lifetime Resume Storage & Updates',
        'Unlimited Mock Interviews',
        '24/7 Access to Career Strategy Portal',
        'Direct Hiring Manager Introductions',
        'Weekly Personal Coaching Sessions',
        'End-to-End Career Launch Package',
        'Highest Priority AI-Based Profile Marketing',
        'VIP-Level Recruiter & Strategy Engagement'
      ]
    }
  ];

  const proServices = [
    {
      id: 'service-resume-pro',
      name: 'Resume Upgrade Pro',
      price: 299,
      description: 'Professional resume rewriting by certified experts',
      features: [
        'ATS-optimized formatting',
        'Keyword optimization',
        'Achievement-based content',
        'Industry-specific language',
        '2 rounds of revisions'
      ],
      icon: FileText
    },
    {
      id: 'service-profile-verification',
      name: 'Profile Verification',
      price: 149,
      description: 'Complete profile verification and validation',
      features: [
        'Background verification',
        'Skill validation',
        'Reference checks',
        'Certificate verification',
        'Digital badge issuance'
      ],
      icon: BadgeCheck
    },
    {
      id: 'service-linkedin-premium',
      name: 'LinkedIn Premium Optimization',
      price: 199,
      description: 'Executive-level LinkedIn profile enhancement',
      features: [
        'Complete profile rebuild',
        'Keyword optimization',
        'Headline & summary rewrite',
        'Skill endorsements strategy',
        'Connection growth plan'
      ],
      icon: Briefcase
    },
    {
      id: 'service-interview-simulation',
      name: 'Interview Simulation Pro',
      price: 349,
      description: 'Real-time interview simulation with feedback',
      features: [
        'Live mock interviews',
        'Technical assessments',
        'Behavioral scenario practice',
        'Video recording & analysis',
        'Expert feedback sessions'
      ],
      icon: MessageSquare
    }
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowCheckoutModal(true);
  };

  const handleAddToCart = (item, type) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price || item.total || item.enrollmentFee,
      description: item.description || `Package: ${item.name}`,
      type: type
    };
    
    addToCart(cartItem);
    toast.success(`${item.name} added to cart!`, {
      description: "You can view it in your cart and proceed to payment.",
      duration: 3000,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/services/cart'
      },
    });
    
    if (showCheckoutModal) {
      setShowCheckoutModal(false);
    }
  };

  const handleBuyNow = (item, type) => {
    handleAddToCart(item, type);
    // Redirect to cart page after a short delay
    setTimeout(() => {
      window.location.href = '/services/payment';
    }, 1000);
  };

  // Handle checkout modal scroll
  useEffect(() => {
    if (showCheckoutModal && checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCheckoutModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 mb-6">
              <span className="text-white/90 text-sm font-semibold">Career Growth Packages</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Accelerate Your Career
              </span>
            </h1>

            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Invest in your professional growth with our curated career packages. From resume optimization to complete career transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#packages">
                <Button size="lg" className="group bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white px-6 sm:px-8 py-4 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto text-base sm:text-base font-semibold">
                  View Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services/cart">
                <Button size="lg" variant="outline" className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-4 sm:py-4 rounded-lg transition-all w-full sm:w-auto text-base sm:text-base font-semibold">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Career Packages Section */}
      <section id="packages" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Growth Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect package for your career stage and goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative hover-lift border-2 ${selectedPackage?.id === pkg.id ? 'border-blue-600' : 'border-gray-100'}`}>
                {pkg.badge && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${pkg.badgeColor} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                    {pkg.badge}
                  </div>
                )}

                <CardContent className="pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                        <span className="text-gray-400 line-through">${pkg.originalPrice}</span>
                      </div>
                      <p className="text-sm text-gray-500">One-time payment</p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => handleAddToCart(pkg, 'package')}
                        variant="outline"
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => handlePackageSelect(pkg)}
                        className={`w-full ${selectedPackage?.id === pkg.id ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      >
                        Select & Checkout
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">What's Included:</h4>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Sparkles className="h-4 w-4 text-blue-500" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Plans Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Attainment Program</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our comprehensive career programs with flexible payment options and guaranteed results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {careerPlans.map((plan) => (
              <Card key={plan.id} className="hover-lift">
                <CardContent>
                  <div className="text-center mb-6">
                    {plan.badge && (
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        {plan.badge}
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                    <div className="space-y-2 mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">${plan.enrollmentFee}</div>
                        <div className="text-sm text-gray-500">Enrollment Fee</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        + {plan.placementFee}% Placement Fee
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Flexible Payment:</span>
                      <span className="font-semibold">${plan.installment}/month</span>
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      4 Easy Installments
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.slice(0, 6).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAddToCart(plan, 'career-plan')}
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleBuyNow(plan, 'career-plan')}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pro Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Individual services for specific career needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {proServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="hover-lift">
                  <CardContent className="h-full flex flex-col">
                    <div className="mb-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    </div>

                    <div className="mb-4 flex-1">
                      <div className="text-2xl font-bold text-gray-900 mb-4">${service.price}</div>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => handleAddToCart(service, 'pro-service')}
                        variant="outline"
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => handleBuyNow(service, 'pro-service')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckoutModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div ref={checkoutRef} className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Complete Your Purchase</h3>
                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setSelectedPackage(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{selectedPackage.name}</span>
                    <span className="text-lg font-bold">${selectedPackage.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{selectedPackage.description}</p>
                  <div className="text-xs text-gray-500">
                    One-time payment • No hidden fees
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Choose Action</h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleAddToCart(selectedPackage, 'package')}
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart & Continue Shopping
                    </Button>
                    <Button
                      onClick={() => handleBuyNow(selectedPackage, 'package')}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 py-3 gap-2"
                    >
                      <CreditCard className="h-5 w-5" />
                      Checkout Now
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    Secure payment • 30-day money-back guarantee
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-blue-100">
              Schedule a free consultation with our career advisors to find the perfect package for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact#contact-form">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/services/cart">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-4 sm:px-6 py-3 rounded-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerPackages;