'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Star,
  Zap,
  Target,
  Users,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
  FileText,
  Briefcase,
  MessageSquare,
  Search,
  Award,
  Globe,
  CreditCard,
  ShieldCheck,
  BadgeCheck,
  Calendar,
  Users as UsersIcon,
  TrendingUp,
  Brain,
  Target as TargetIcon,
  FileCheck,
  Video,
  Mail
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

const ProServices = () => {
  const { cart, addToCart, removeFromCart, getCartTotal } = useCart();
  const [selectedService, setSelectedService] = useState(null);

  const serviceCategories = [
    {
      id: 'resume',
      name: 'Resume Services',
      icon: FileText,
      services: [
        {
          id: 'resume-basic',
          name: 'Resume Optimization',
          price: 199,
          originalPrice: 299,
          description: 'Professional resume review and optimization',
          features: [
            'ATS optimization',
            'Keyword enhancement',
            'Formatting improvement',
            'Content restructuring',
            '1 round of revisions'
          ],
          delivery: '2-3 business days'
        },
        {
          id: 'resume-premium',
          name: 'Resume Rewrite Pro',
          price: 399,
          originalPrice: 599,
          description: 'Complete resume transformation',
          badge: 'Best Seller',
          features: [
            'Complete rewrite from scratch',
            'Industry-specific language',
            'Achievement-based content',
            'Multiple format versions',
            '3 rounds of revisions',
            'Cover letter included'
          ],
          delivery: '3-5 business days'
        },
        {
          id: 'resume-executive',
          name: 'Executive Resume',
          price: 699,
          originalPrice: 999,
          description: 'C-level executive resume package',
          features: [
            'Board-level resume writing',
            'Executive summary development',
            'Leadership achievement highlighting',
            'LinkedIn profile alignment',
            'Unlimited revisions',
            'Priority delivery'
          ],
          delivery: '5-7 business days'
        }
      ]
    },
    {
      id: 'linkedin',
      name: 'LinkedIn & Profile',
      icon: Briefcase,
      services: [
        {
          id: 'linkedin-basic',
          name: 'LinkedIn Optimization',
          price: 149,
          originalPrice: 199,
          description: 'Enhance your LinkedIn profile',
          features: [
            'Profile headline rewrite',
            'Summary optimization',
            'Keyword optimization',
            'Skill endorsements strategy',
            'Connection growth tips'
          ],
          delivery: '2 business days'
        },
        {
          id: 'linkedin-premium',
          name: 'LinkedIn Premium',
          price: 299,
          originalPrice: 399,
          description: 'Complete LinkedIn transformation',
          features: [
            'Complete profile rebuild',
            'Content strategy development',
            'Networking plan',
            'Recommendation strategy',
            'Visibility optimization'
          ],
          delivery: '3-5 business days'
        },
        {
          id: 'profile-verification',
          name: 'Profile Verification Pro',
          price: 249,
          originalPrice: 349,
          description: 'Complete profile validation',
          badge: 'Verified',
          features: [
            'Background verification',
            'Skill validation',
            'Reference checks',
            'Certificate verification',
            'Digital badge issuance'
          ],
          delivery: '5-7 business days'
        }
      ]
    },
    {
      id: 'interview',
      name: 'Interview Preparation',
      icon: MessageSquare,
      services: [
        {
          id: 'mock-basic',
          name: 'Mock Interview',
          price: 149,
          originalPrice: 199,
          description: 'Practice interview session',
          features: [
            '60-minute mock interview',
            'Behavioral questions',
            'Technical assessment',
            'Feedback session',
            'Improvement plan'
          ],
          delivery: 'Scheduled session'
        },
        {
          id: 'mock-premium',
          name: 'Interview Simulation Pro',
          price: 349,
          originalPrice: 499,
          description: 'Real-time interview simulation',
          features: [
            '90-minute comprehensive session',
            'Video recording & analysis',
            'Multiple role scenarios',
            'Expert panel feedback',
            'Follow-up consultation'
          ],
          delivery: 'Scheduled session'
        },
        {
          id: 'coaching',
          name: 'Interview Coaching',
          price: 599,
          originalPrice: 799,
          description: 'Personalized coaching program',
          badge: 'Premium',
          features: [
            '4 coaching sessions',
            'Personalized strategy',
            'Role-specific preparation',
            'Negotiation training',
            'Unlimited email support'
          ],
          delivery: 'Weekly sessions'
        }
      ]
    },
    {
      id: 'career',
      name: 'Career Strategy',
      icon: TargetIcon,
      services: [
        {
          id: 'strategy-session',
          name: 'Career Strategy Session',
          price: 199,
          originalPrice: 299,
          description: 'One-on-one career planning',
          features: [
            '90-minute strategy session',
            'Career path analysis',
            'Goal setting',
            'Action plan development',
            'Follow-up summary'
          ],
          delivery: 'Scheduled session'
        },
        {
          id: 'job-search',
          name: 'Job Search Strategy',
          price: 399,
          originalPrice: 549,
          description: 'Comprehensive job search plan',
          features: [
            'Target company identification',
            'Networking strategy',
            'Application tracking system',
            'Follow-up protocol',
            '30-day support'
          ],
          delivery: '5-7 business days'
        },
        {
          id: 'salary-negotiation',
          name: 'Salary Negotiation',
          price: 299,
          originalPrice: 399,
          description: 'Maximize your offer package',
          features: [
            'Market rate analysis',
            'Negotiation strategy',
            'Script development',
            'Counter-offer handling',
            'Benefits negotiation'
          ],
          delivery: '2-3 business days'
        }
      ]
    }
  ];

  const addOnServices = [
    {
      id: 'cover-letter',
      name: 'Cover Letter Writing',
      price: 99,
      description: 'Custom cover letter for specific roles'
    },
    {
      id: 'thank-you',
      name: 'Thank You Letter Templates',
      price: 49,
      description: 'Professional post-interview templates'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Review',
      price: 149,
      description: 'Professional portfolio assessment'
    },
    {
      id: 'references',
      name: 'Reference Preparation',
      price: 79,
      description: 'Prepare and coach your references'
    }
  ];

  const handleAddToCart = (service) => {
    addToCart(service);
    toast.success(`${service.name} added to cart!`, {
      description: "You can view it in your cart and proceed to payment.",
      duration: 3000,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/services/cart'
      },
    });
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const calculateTotal = () => {
    return getCartTotal();
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Please add services to your cart first.');
      return;
    }
    // Redirect to cart page
    window.location.href = '/services/payment';
  };

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
              <span className="text-white/90 text-sm font-semibold">Professional Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                À La Carte Career Services
              </span>
            </h1>

            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Mix and match professional services to build your perfect career advancement toolkit
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#services">
                <Button size="lg" className="group bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white px-6 sm:px-8 py-4 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto text-base sm:text-base font-semibold">
                  Browse Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services/cart">
                <Button size="lg" variant="outline" className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-4 sm:py-4 rounded-lg transition-all w-full sm:w-auto text-base sm:text-base font-semibold">
                  View Cart ({cart.length})
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select individual services or build your own package
            </p>
          </div>

          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {category.services.map((service) => (
                    <Card key={service.id} className={`hover-lift ${selectedService?.id === service.id ? 'border-blue-600 border-2' : ''}`}>
                      <CardContent className="h-full flex flex-col">
                        <div className="mb-4">
                          {service.badge && (
                            <div className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mb-3">
                              {service.badge}
                            </div>
                          )}
                          <h4 className="text-lg font-bold mb-2">{service.name}</h4>
                          <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        </div>

                        <div className="mb-4 flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl font-bold text-gray-900">${service.price}</span>
                            {service.originalPrice && (
                              <span className="text-gray-400 line-through text-sm">${service.originalPrice}</span>
                            )}
                          </div>

                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Delivery: {service.delivery}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button
                            onClick={() => handleAddToCart(service)}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Add to Cart - ${service.price}
                          </Button>
                          <Button
                            onClick={() => handleServiceSelect(service)}
                            variant="outline"
                            className="w-full border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                          >
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Add-on Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick add-ons to complement your main services
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOnServices.map((service) => (
              <Card key={service.id} className="hover-lift">
                <CardContent className="text-center">
                  <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <div className="text-lg font-bold text-gray-900 mb-4">${service.price}</div>
                  <Button
                    onClick={() => handleAddToCart(service)}
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{selectedService.name}</h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">${selectedService.price}</div>
                    {selectedService.originalPrice && (
                      <div className="text-gray-400 line-through">${selectedService.originalPrice}</div>
                    )}
                  </div>
                  <div className="space-x-1">
                    <Button
                      onClick={() => {
                        handleAddToCart(selectedService);
                        setSelectedService(null);
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => setSelectedService(null)}
                      variant="outline"
                    >
                      Close
                    </Button>
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
              Need Custom Services?
            </h2>
            <p className="text-xl text-blue-100">
              Contact us for custom package combinations or enterprise solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact#contact-form">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Request Custom Quote
                </Button>
              </Link>
              <a href="tel:+17866523950">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-4 sm:px-6 py-3 rounded-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +1 (786) 652-3950
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Add missing icon component
const ShoppingCart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default ProServices;