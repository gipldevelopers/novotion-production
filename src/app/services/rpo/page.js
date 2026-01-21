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
  ChevronDown
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
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold hover:text-blue-600 transition-colors flex justify-between items-center text-sm sm:text-base"
          >
            {item.question}
            <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${openItem === index ? 'rotate-180' : ''}`} />
          </button>
          {openItem === index && (
            <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 text-sm sm:text-base">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

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
      description: 'Scale your talent acquisition efforts up or down instantly. We adjust our recruitment resources to fit your exact needs.'
    },
    {
      icon: Zap,
      title: 'Access to Expertise & Technology',
      description: 'Get immediate access to sourcing specialists, compliance experts, and advanced AI-powered recruitment tools.'
    },
    {
      icon: Users,
      title: 'Focus on What Matters',
      description: 'Let your leaders focus on culture and talent development while we handle the operational engine of recruitment.'
    },
  ];

  const services = [
    {
      title: 'Full RPO Partnership',
      description: 'Our most comprehensive recruitment solution. We become your dedicated, full-service hiring department.',
      features: [
        'End-to-end recruitment process management',
        'Dedicated RPO account team',
        'Full ATS integration and hiring analytics',
        'Employer branding support',
        'Compliance and legal alignment'
      ],
      bestFor: 'Organizations ready to fully outsource talent acquisition.'
    },
    {
      title: 'Recruitment On-Demand',
      description: 'Need to ramp up hiring for a specific project or product launch? We deliver a high-performance team.',
      features: [
        'Flexible, short-term RPO engagement',
        'Dedicated project recruitment team',
        'Fast deployment of resources',
        'Scalable talent acquisition'
      ],
      bestFor: 'Organizations with fluctuating talent acquisition needs.'
    },
    {
      title: 'Recruitment Outsourcing',
      description: 'A powerful "recruitment engine" for your existing team. Our offshore recruiters work 24/7.',
      features: [
        '24/7 candidate sourcing and screening',
        'Cost-effective global talent pool access',
        'Seamless integration with internal teams',
        'Reduced time-to-hire'
      ],
      bestFor: 'Teams looking to supercharge sourcing power.'
    }
  ];

  const phases = [
    {
      title: 'Discovery & Planning',
      subtitle: 'Phase 1: The Deep Dive',
      description: 'We understand your culture, goals, and recruitment pain points to build a roadmap.'
    },
    {
      title: 'Team Deployment',
      subtitle: 'Phase 2: Integration & Setup',
      description: 'We integrate with your systems and align with your employer brand.'
    },
    {
      title: 'Operational Launch',
      subtitle: 'Phase 3: Launch & Optimize',
      description: 'We begin sourcing and screening candidates, measuring performance against KPIs.'
    },
    {
      title: 'Continuous Improvement',
      subtitle: 'Phase 4: Ongoing Partnership',
      description: 'We provide ongoing reporting and market insights for long-term success.'
    }
  ];

  const faqs = [
    {
      question: 'What exactly does RPO include?',
      answer: 'RPO includes end-to-end recruitment support - from sourcing and screening to interviewing and onboarding.'
    },
    {
      question: 'How is RPO different from agencies?',
      answer: 'RPO provides a long-term, scalable model with predictable costs and deeper collaboration.'
    }
  ];

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

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-blue-900 text-white pt-24">
        <div className="relative container mx-auto px-4 text-center z-10">
          <h1 className="text-4xl sm:text-6xl font-black mb-6">Your Hiring Goals, Accelerated</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">Strategic Recruitment Process Outsourcing that scales with your business.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 rounded-2xl font-bold">
              Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center bg-white rounded-3xl p-10 shadow-xl">
          <div>
            <div className="text-4xl font-black text-blue-600 mb-2"><AnimatedCounter value="500" />+</div>
            <div className="text-gray-500 font-medium">Organizations Served</div>
          </div>
          <div>
            <div className="text-4xl font-black text-blue-600 mb-2"><AnimatedCounter value="85" />%</div>
            <div className="text-gray-500 font-medium">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-black text-blue-600 mb-2"><AnimatedCounter value="60" />%</div>
            <div className="text-gray-500 font-medium">Cost Reduction</div>
          </div>
          <div>
            <div className="text-4xl font-black text-blue-600 mb-2">24/7</div>
            <div className="text-gray-500 font-medium">Support</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesRPO;
