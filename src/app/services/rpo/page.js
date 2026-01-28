// src/app/services/rpo/page.js
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Zap, 
  ArrowRight, 
  Play, 
  Pause,
  Download,
  Sparkles,
  Rocket
} from 'lucide-react';
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
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold hover:text-cyan-400 transition-colors flex justify-between items-center text-sm sm:text-base"
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

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const target = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
};

const ServicesRPO = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const benefits = [
    { 
      icon: DollarSign, 
      title: 'Predictable, Transparent Costs', 
      description: 'Move away from volatile 15-25% agency fees. Our recruitment process outsourcing offers transparent pricing that makes hiring budgets easy to manage.' 
    },
    { 
      icon: TrendingUp, 
      title: 'Instant Scalability', 
      description: 'Scale your talent acquisition efforts up or down instantly. We adjust our recruitment resources to fit your exact needs - without hiring or firing internal recruiters.' 
    },
    { 
      icon: Zap, 
      title: 'Access to Expertise & Technology', 
      description: 'Get immediate access to sourcing specialists, compliance experts, and advanced AI-powered recruitment tools - all managed through our RPO services.' 
    },
    { 
      icon: Users, 
      title: 'Focus on What Matters', 
      description: 'Let your leaders focus on culture and talent development while we handle the operational engine of recruitment and workforce management.' 
    },
  ];

  const services = [
    {
      title: 'Full RPO Partnership',
      description: 'Our most comprehensive recruitment solution. We become your dedicated, full-service hiring department - managing the entire talent acquisition lifecycle from sourcing to onboarding.',
      features: [
        'End-to-end recruitment process management',
        'Dedicated RPO account team',
        'Full ATS integration and hiring analytics reporting',
        'Employer branding support for talent attraction',
        'Compliance and legal alignment in recruitment'
      ],
      bestFor: 'UK/USA organizations ready to fully outsource talent acquisition, especially those in high-growth phases needing complete workforce management.'
    },
    {
      title: 'Recruitment On-Demand (Project RPO)',
      description: 'Need to ramp up hiring for a specific project, product launch, or seasonal demand? We deliver a high-performance recruitment team for the duration you need, ensuring speed, precision, and seamless execution.',
      features: [
        'Flexible, short-term RPO engagement',
        'Dedicated project recruitment team',
        'Fast deployment of hiring resources (typically within 2 weeks)',
        'Scalable talent acquisition resources'
      ],
      bestFor: 'Organizations with fluctuating talent acquisition needs or one-time large-scale hiring projects.'
    },
    {
      title: 'Recruitment Outsourcing (Offshore Support)',
      description: 'A powerful "recruitment engine" for your existing team. Our dedicated offshore recruiters in India work 24/7 as a cost-effective extension of your in-house hiring staff.',
      features: [
        '24/7 candidate sourcing and screening in recruitment',
        'Cost-effective global talent pool access',
        'Seamless integration with your internal hiring team',
        'Reduced time-to-hire through efficient recruitment process'
      ],
      bestFor: 'Organizations with existing recruitment teams looking to supercharge sourcing power and handle high-volume talent acquisition.'
    },
    {
      title: 'Executive Search & Headhunting',
      description: 'Specialized talent acquisition for hard-to-fill, senior, or niche positions. Our expert headhunters leverage extensive networks and market intelligence to find the perfect executive fit.',
      features: [
        'Confidential, discreet executive search',
        'Access to passive candidates through strategic recruitment',
        'Industry-specific talent acquisition expertise',
        'Thorough vetting and assessment in hiring process'
      ],
      bestFor: 'Organizations seeking executive talent or specialized technical roles that require targeted recruitment search.'
    },
    {
      title: 'Candidate Pre-Screening & Coaching',
      description: 'Professional resume optimization and candidate coaching to ensure your prospects present their best selves in the hiring process, leading to stronger and more confident hiring outcomes.',
      features: [
        'Resume and profile enhancement for talent',
        'Interview coaching and preparation support',
        'Technical skill assessments in recruitment',
        'Improved candidate presentation for hiring'
      ],
      bestFor: 'Organizations wanting to enhance candidate quality and improve interview performance rates in recruitment.'
    }
  ];

  const industries = [
    'Technology & IT Recruitment',
    'Healthcare & Life Sciences Hiring',
    'Financial Services Talent Acquisition',
    'Manufacturing & Engineering Recruitment',
    'Retail & E-Commerce Workforce Management',
    'Professional Services Hiring',
    'Marketing & Creative Talent'
  ];

  const phases = [
    {
      title: 'Phase 1: The Deep Dive',
      subtitle: 'Discovery & Planning',
      description: 'We interview stakeholders from HR to leadership to understand your culture, goals, and recruitment pain points. We define what success looks like in talent acquisition and build Service Level Agreements (SLAs) and an RPO implementation roadmap.'
    },
    {
      title: 'Phase 2: Integration & Setup',
      subtitle: 'Team Deployment & Integration',
      description: 'We integrate with your existing systems (ATS, HRIS, etc.), align with your employer brand, and set up seamless recruitment communication channels for efficient workforce management.'
    },
    {
      title: 'Phase 3: Launch & Optimize',
      subtitle: 'Operational Launch',
      description: 'We begin sourcing, screening, and presenting candidates through our recruitment process. We continuously measure hiring performance against agreed KPIs and optimize our talent acquisition approach based on real-time data.'
    },
    {
      title: 'Phase 4: Ongoing Partnership',
      subtitle: 'Continuous Improvement & Scaling',
      description: 'We don\'t disappear after placements. We provide ongoing recruitment reporting, market insights, and proactive hiring support to ensure long-term talent acquisition success.'
    }
  ];

  const faqs = [
    {
      question: 'What exactly does RPO include?',
      answer: 'RPO includes end-to-end recruitment support - from sourcing and screening to interviewing, onboarding, and reporting. We act as an extension of your internal hiring team to manage the entire talent acquisition process.'
    },
    {
      question: 'How is RPO different from traditional recruitment or agencies?',
      answer: 'Unlike agencies that charge per hire, RPO provides a long-term, scalable recruitment model with predictable costs, deeper collaboration, and a consistent pipeline of quality candidates.'
    },
    {
      question: 'Which regions does Novotion support?',
      answer: 'We support organizations across the USA and UK through on-ground specialists, backed by a 24/7 offshore recruitment team in India.'
    },
    {
      question: 'Can I use RPO only for short-term or project-based hiring?',
      answer: 'Yes. Our Recruitment On-Demand model lets you scale hiring for specific projects, flexible needs, or rapid expansions without long-term commitments.'
    },
    {
      question: 'What size companies benefit from RPO?',
      answer: 'RPO works for startups, growing mid-size companies, and large enterprises - any organization seeking faster hiring, reduced cost, and a more efficient talent acquisition engine.'
    },
    {
      question: 'How quickly can you start?',
      answer: 'We typically deploy recruitment resources within 1-2 weeks after aligning on scope, goals, and integration requirements.'
    }
  ];

  // Auto-play phases
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, phases.length]);

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
                  RPO - Strategic Recruitment for USA & UK
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-2">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Your Hiring Goals, Accelerated
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                Strategic Recruitment Process Outsourcing that scales with your business and delivers measurable outcomes for USA and UK markets.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sm:pt-6 md:pt-8">
              <Link href="/contact#contact-form" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white w-full sm:w-auto px-6 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 text-base font-semibold"
                >
                  Schedule a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"><AnimatedCounter value="14" />+</div>
              <div className="text-blue-100 text-xs sm:text-sm">Organizations Served</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"><AnimatedCounter value="85" />%+</div>
              <div className="text-blue-100 text-xs sm:text-sm">Placement Success</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"><AnimatedCounter value="60" />%</div>
              <div className="text-blue-100 text-xs sm:text-sm">Cost Reduction</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"><AnimatedCounter value="24" />/7</div>
              <div className="text-blue-100 text-xs sm:text-sm">Global Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">The Problem with Traditional Recruitment</h2>
            </div>
            <div className="space-y-4 sm:space-y-6 text-gray-600">
              <p className="text-base sm:text-lg leading-relaxed">
                In today's fast-moving market, traditional recruitment has become a major barrier to efficient growth. 
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                It's reactive. It's expensive. And it pulls your key leaders away from what they do best - growing the business instead of managing the hiring process.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                You're stuck in a cycle of paying hefty agency fees for one-off hires, with no long-term talent acquisition strategy or scalability. Sound familiar?
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                It's time for a smarter recruitment solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is RPO */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">What is RPO?</h2>
              <h3 className="text-lg sm:text-xl md:text-2xl text-cyan-600 mb-4 sm:mb-6">From Cost Center to Strategic Asset</h3>
            </div>
            <div className="space-y-4 sm:space-y-6 text-gray-600">
              <p className="text-base sm:text-lg leading-relaxed">
                Recruitment Process Outsourcing (RPO) isn't just "outsourcing" your hiring - it's a strategic partnership that transforms how you attract, engage, and onboard top talent through comprehensive talent acquisition.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                We embed a dedicated team of recruitment experts directly into your organization. We become a seamless extension of your Talent Acquisition team - learning your culture, adopting your brand, and managing your entire recruitment process from start to finish.
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                The Goal? Drive your long-term business growth with the right people in the right roles through proven workforce management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Novotion RPO Advantage */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">The Novotion RPO Advantage</h2>
            </div>
            <div className="space-y-4 sm:space-y-6 text-gray-600">
              <p className="text-base sm:text-lg leading-relaxed">
                At Novotion, our recruitment process outsourcing combines on-the-ground expertise in the USA and UK with a powerful 24/7 offshore support engine in India.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                This "best-of-both-worlds" recruitment model delivers:
              </p>
              <div className="grid gap-3 sm:gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500 mt-1 flex-shrink-0" />
                  <span className="text-base sm:text-lg"><strong>Scalability</strong> - Hire as fast (or as slow) as you need with flexible RPO services</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500 mt-1 flex-shrink-0" />
                  <span className="text-base sm:text-lg"><strong>Cost-Efficiency</strong> - Typically 30-60% savings in recruitment costs compared to traditional agencies</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500 mt-1 flex-shrink-0" />
                  <span className="text-base sm:text-lg"><strong>Quality</strong> - A continuous pipeline of high-quality candidates through strategic talent acquisition</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500 mt-1 flex-shrink-0" />
                  <span className="text-base sm:text-lg"><strong>No Overhead</strong> - No need to hire, train, or manage a large in-house recruitment team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose RPO */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Why Choose RPO?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow hover:scale-[1.02] sm:hover:scale-105">
                <CardContent className="space-y-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-cyan-50 flex items-center justify-center">
                    <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our RPO Service Models */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our RPO Service Models</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              A one-size-fits-all approach doesn't work in talent acquisition. At Novotion, our recruitment process outsourcing services are modular, allowing you to build the precise hiring solution you need.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-cyan-500">
                <CardContent className="space-y-4 h-full flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base flex-grow">{service.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">What You Get:</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t mt-2">
                    <p className="text-xs sm:text-sm">
                      <span className="font-semibold text-cyan-500">Best For:</span> {service.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Industries We Serve</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {/* Our specialized recruitment teams have deep talent acquisition expertise across multiple sectors */}
              Specialized Recruitment Across 15+ Industry Verticals in the U.S.A and U.K.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {industries.map((industry, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">{industry}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">And 10+ more industries with specialized RPO services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work: Our RPO Process */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">How We Work: Our RPO Process</h2>
            <p className="text-base sm:text-lg text-gray-600">
              We don't just flip a switch in recruitment. We build a talent acquisition partnership through a deliberate, transparent hiring process.
            </p>
          </div>

          {/* Phase Navigation */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-4 bg-white p-2 sm:p-3 rounded-lg shadow-sm border">
              {phases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePhase(index);
                    setAutoPlay(false);
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
                    activePhase === index 
                      ? 'bg-cyan-500 text-white' 
                      : 'text-gray-600 hover:text-cyan-500'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="px-3 py-2 text-gray-600 hover:text-cyan-500 transition-colors"
                aria-label="toggle autoplay"
              >
                {autoPlay ? <Pause className="h-4 w-4 sm:h-5 sm:w-5" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </div>
          </div>

          {/* Active Phase Display */}
          <div className="max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-lg sm:text-2xl">
                      {activePhase + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{phases[activePhase].title}</h3>
                    <p className="text-cyan-600 font-semibold text-base sm:text-lg mb-3 sm:mb-4">{phases[activePhase].subtitle}</p>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{phases[activePhase].description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Hiring?</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto text-blue-100">
            Let's talk about how our recruitment process outsourcing can solve your talent acquisition challenges and accelerate your growth through strategic workforce management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact#contact-form">
              <Button size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-white text-cyan-600 hover:bg-gray-100 rounded-xl">
                Schedule a Free Consultation
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

export default ServicesRPO;