// src/app/services/career-support/page.js
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, FileText, MessageSquare, Target, TrendingUp, Users, ArrowRight, Star, Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Simple Card components
const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg sm:rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

// Accordion Component
const Accordion = ({ items }) => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenItem(openItem === index ? null : index)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-800 hover:text-cyan-600 transition-colors flex justify-between items-center text-sm sm:text-base"
          >
            {item.question}
            <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${openItem === index ? 'rotate-180' : ''}`} />
          </button>
          {openItem === index && (
            <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 text-sm sm:text-base animate-fadeIn">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Chevron Icon for Accordion
const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ServicesCareer = () => {
  const services = [
    {
      icon: FileText,
      title: 'Professional Branding & Marketing',
      description: 'We shape a strong professional narrative through targeted resume optimization and highlight your technical strengths. Our team then proactively promotes your profile across exclusive vendor networks and direct client channels to maximize visibility and opportunities.',
      result: 'You get noticed faster by the right decision-makers for the right IT roles and high-value contract opportunities.'
    },
    {
      icon: Target,
      title: 'Opportunity Matching & Targeting',
      description: 'We analyze thousands of live client IT requirements every day, using advanced tools and deep market insight to identify the ideal opportunities that align with your skills, experience, and career goals.',
      result: 'A major drop in bench time and a noticeably higher rate of interviews turning into offers.'
    },
    {
      icon: MessageSquare,
      title: 'Interview Coordination & Prep',
      description: 'We oversee the entire communication flow, connecting you seamlessly with vendors and clients while managing interview scheduling, preparation, and detailed feedback for your career progression.',
      result: 'A smooth, responsive interview process that builds your confidence and helps you close IT offers.'
    },
    {
      icon: CheckCircle,
      title: 'Contract Negotiation & Onboarding',
      description: 'Our career support doesn\'t stop at the verbal "yes." We guide you through rate negotiations and manage all onboarding and compliance paperwork for a seamless project start.',
      result: 'You start your new IT contract with clarity, confidence, and a dedicated career team behind you.'
    }
  ];

  const technologies = [
    { category: 'Software Development', skills: 'Java, .NET, Python, C++, Node.js, React, Angular' },
    { category: 'Cloud & DevOps', skills: 'AWS, Azure, Google Cloud (GCP), Kubernetes, Docker, CI/CD' },
    { category: 'Data & Analytics', skills: 'Data Science, Big Data, SQL, Power BI, Tableau, Snowflake' },
    { category: 'Enterprise Applications', skills: 'SAP, Salesforce, Oracle, ServiceNow' },
    { category: 'Infrastructure & Networking', skills: 'Network Engineering, DevOps, System Administration, Cybersecurity' },
    { category: 'QA & Testing', skills: 'Selenium, API Testing, Manual & Automation Testing' },
    { category: 'UI/UX Design', skills: 'Figma, Adobe XD, Product Design, Wireframing' }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Faster Placements',
      description: 'Get matched to IT opportunities in days, not weeks, through our efficient career support services.'
    },
    {
      icon: Users,
      title: 'Access to Exclusive Networks',
      description: 'Tap into our established relationships with hundreds of U.S. clients and vendors in the IT market.'
    },
    {
      icon: FileText,
      title: 'Expert Guidance',
      description: 'Receive professional interview coaching, resume optimization, and contract negotiation support for your career growth.'
    },
    {
      icon: CheckCircle,
      title: 'No Upfront Costs',
      description: 'We succeed when you succeed. Our career support services are performance-based.'
    },
    {
      icon: MessageSquare,
      title: 'Post-Placement Support',
      description: 'We don\'t disappear after you\'re placed in an IT contract. We stay connected, ensuring your success on the project and helping plan your next career move.'
    }
  ];

  const phases = [
    {
      title: 'Step 1: Profile Assessment & Optimization',
      description: 'We work closely with you to understand your technical skills, project history, career goals, and ideal next role. We optimize your resume, LinkedIn, and professional profile through comprehensive resume optimization to create a powerful, market-ready brand for the IT market.'
    },
    {
      title: 'Step 2: Active Marketing & Opportunity Sourcing',
      description: 'Our career support team scans live U.S. client IT requirements 24/7, identifies the most relevant contract opportunities, and begins targeted marketing campaigns through our vast vendor and client network using strategic bench sales techniques.'
    },
    {
      title: 'Step 3: Interview Management & Support',
      description: 'We manage the entire submission and interview process. We position your profile, coordinate with all parties, provide interview prep, gather feedback, and keep you informed every step of your career journey.'
    },
    {
      title: 'Step 4: Offer Negotiation & Project Start',
      description: 'When the IT offer is confirmed, we manage contract negotiation and onboarding. We stay connected through post-placement support, supporting you through the project, managing extensions, and proactively planning your next career deployment.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Full Stack Developer',
      quote: 'Novotion helped me land a contract role within 2 weeks of being on the bench. Their proactive marketing and interview coordination made all the difference in this competitive market.',
      project: 'Fortune 500 Financial Services'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Cloud Solutions Architect',
      quote: 'The team at Novotion doesn\'t just forward resumes - they truly partner with you. Their negotiation support helped me secure a 20% higher rate than I expected.',
      project: 'Tech Startup - Silicon Valley'
    },
    {
      name: 'Priya Sharma',
      role: 'Data Science Lead',
      quote: 'From resume optimization to final onboarding, Novotion handled everything professionally. I went from bench to billable in record time with their career support.',
      project: 'Healthcare Analytics Company'
    }
  ];

  const faqs = [
    {
      question: 'How is Novotion\'s Career Support different from a regular job portal?',
      answer: 'We don\'t just forward resumes - we actively market your profile, coordinate interviews, negotiate contracts, and act as a strategic career partner in the U.S. IT market.'
    },
    {
      question: 'Do you only support IT professionals?',
      answer: 'Yes. Our services are specialized for IT contractors and consultants across software development, cloud, data, DevOps, QA, enterprise apps, and more.'
    },
    {
      question: 'How fast can you find opportunities?',
      answer: 'We analyze live U.S. IT requirements daily and market your profile immediately, helping you reduce bench time and get interviews faster.'
    },
    {
      question: 'Do you charge upfront fees?',
      answer: 'Yes. Our career support requires upfront payment for our comprehensive services.'
    },
    {
      question: 'Will you help me prepare for interviews?',
      answer: 'Absolutely. We provide pre-interview briefs, preparation support, and detailed post-interview feedback to increase your chances of getting an offer.'
    },
    {
      question: 'Do you assist with contract negotiation and onboarding?',
      answer: 'Yes. We guide you through rate negotiation, handle coordination with vendors/clients, and manage onboarding paperwork for a smooth project start.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section - Mobile First */}
      <section className="relative min-h-[80vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-24 md:pt-24">
        {/* Animated Background - Mobile Optimized */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-blue-500 rounded-full blur-2xl sm:blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-40 sm:h-40 md:w-96 md:h-96 bg-indigo-500 rounded-full blur-2xl sm:blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center space-y-8 sm:space-y-10 z-10">
          <div className="space-y-8 sm:space-y-10 py-4">
            {/* Badge */}
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-sm font-medium">
                  Career Support - U.S. Market Focus
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-2">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Stop waiting, Start connecting
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                We are the U.S. IT market's premier career partner. We actively market your skills, connect you with top-tier projects, and manage your next career move.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sm:pt-6 md:pt-8">
              <Link href="/contact#contact-form" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white w-full sm:w-auto px-6 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 text-base font-semibold"
                >
                  Submit Your Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact#contact-form" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto px-6 py-4 rounded-xl transition-all text-base font-semibold"
                >
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Reality Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">The Reality of Being "Between Projects"</h2>
            </div>
            <div className="space-y-4 sm:space-y-6 text-gray-600">
              <p className="text-base sm:text-lg leading-relaxed">
                For a skilled IT professional, being between projects isn't a break it's a period of uncertainty that affects both career momentum and financial stability.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                For a consulting firm, it's a drain on revenue and workforce resources.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                The U.S. IT market moves fast, and every day not on a project is a missed career opportunity.
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                This is where Novotion's Career Support Services step in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Differently */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">What We Do Differently</h2>
            </div>
            <div className="space-y-4 sm:space-y-6 text-gray-600">
              <p className="text-base sm:text-lg leading-relaxed">
                We're more than a job board or resume-forwarding service, we actively partner with IT professionals to drive meaningful career opportunities.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                We are a proactive career marketing and placement partner dedicated exclusively to the U.S. IT contract market.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Think of us as your strategic partner. We leverage your unique strengths and our strong U.S. client and vendor network to create the right opportunities through reliable talent outreach strategies.
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                From polishing your professional brand and marketing your profile to coordinating interviews and negotiating contracts - we handle the entire career support process. Our mission? Turn your downtime into your next great IT opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our Approach: Strategic, Personal, Fast</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              We function as a high-performance extension of your career team. <br /> Here's how our career support services work
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow hover:scale-[1.02] sm:hover:scale-105 transition-transform border-l-4 border-l-cyan-500">
                <CardContent className="space-y-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-cyan-50 flex items-center justify-center">
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
                  <div className="pt-3 border-t">
                    <p className="text-xs sm:text-sm">
                      <span className="font-semibold text-cyan-600">The Result:</span> {service.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">How It Works: Your Journey with Novotion</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {phases.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-base sm:text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold mb-3">{phase.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{phase.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Technologies & Skills We Specialize In</h2>
            <p className="text-base sm:text-lg text-gray-600">
              We speak your language in IT staffing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {technologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-800">{tech.category}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{tech.skills}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Novotion */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Why IT Professionals Choose Novotion</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="text-center p-4 sm:p-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-cyan-50 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Success Stories</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              From Waiting to Winning - Real Stories from Real Professionals 
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base italic mb-6">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-cyan-600 mb-1">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.project}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Land Your Next U.S. IT Contract?</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto text-blue-100">
            Let's move you from career gaps to your next great IT opportunity with our proven career support services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#contact-form">
              <Button size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-white text-cyan-600 hover:bg-gray-100 rounded-xl w-full sm:w-auto">
                Submit Your Profile
              </Button>
            </Link>
            <Link href="/contact#contact-form">
              <Button 
                size="lg" 
                variant="outline" 
                className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all w-full sm:w-auto text-sm sm:text-base font-semibold"
              >
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ServicesCareer;