// src/app/career/page.js
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Heart, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Star, 
  Target, 
  Zap,
  Sparkles,
  Rocket,
  Globe,
  Award,
  BookOpen,
  Globe2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobApplicationForm from '@/components/home/career/JobApplicationForm';

// Simple Card components
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

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    const steps = 60;
    const increment = parseInt(value) / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, parseInt(value));
      setCount(Math.floor(current));
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span className="font-bold">{count}{suffix}</span>;
};

const Career = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');

  const benefits = [
    { icon: TrendingUp, title: 'Grow With Us', description: 'Continuous learning and career advancement opportunities in the fast-paced recruitment industry and talent acquisition field', color: 'green' },
    { icon: Globe, title: 'Global Team, Unified Mission', description: 'Work with a diverse, talented team across USA, and India - bringing together the best minds in recruitment and career support from around the world', color: 'blue' },
    { icon: Heart, title: 'Work-Life Balance', description: 'Flexible work arrangements and a supportive environment in our recruitment operations that respects your personal life', color: 'pink' },
    { icon: Target, title: 'Make an Impact', description: 'Help shape careers and build successful organizations through talent acquisition. Your work in recruitment directly changes lives', color: 'purple' },
    { icon: Award, title: 'Clear Career Progression', description: 'Structured advancement paths in recruitment with regular performance reviews and promotion opportunities in RPO services', color: 'orange' },
    { icon: Zap, title: 'Cutting-Edge Tools', description: 'Access to the latest recruitment technologies, AI-powered tools, and industry-leading platforms for talent acquisition', color: 'yellow' },
  ];

  const openings = [
    {
      title: 'Recruitment Consultant',
      location: 'Ahmedabad, India',
      type: 'Full-Time',
      department: 'Career Services',
      experience: '2+ years',
      description: 'Help clients build exceptional teams through talent acquisition and support professionals in advancing their careers with our recruitment services.',
      tags: ['Talent Acquisition', 'Career Support', 'Client Management']
    },
    {
      title: 'RPO Specialist',
      location: 'Orlando, USA',
      type: 'Full-Time',
      department: 'RPO Services',
      experience: '3+ years',
      description: 'Manage end-to-end recruitment processes and talent acquisition for our U.S.-based clients through comprehensive RPO services.',
      tags: ['RPO', 'Full-Cycle Recruitment', 'US Market']
    },
    {
      title: 'Career Support Specialist',
      location: 'Ahmedabad, India',
      type: 'Full-Time',
      department: 'Career Services',
      experience: '1+ years',
      description: 'Guide IT professionals through the U.S. contract market and help them land their next role using career support services and bench sales expertise.',
      tags: ['Career Support', 'Bench Sales', 'IT Professionals']
    },
    {
      title: 'Talent Acquisition Manager',
      location: 'UK (Remote)',
      type: 'Full-Time',
      department: 'RPO Services',
      experience: '4+ years',
      description: 'Lead recruitment strategy for our UK clients and mentor junior team members in talent acquisition and RPO services.',
      tags: ['Strategy', 'Team Leadership', 'Client Relations']
    }
  ];

  const departments = ['all', 'RPO Services', 'Career Services', 'Business Development'];

  const filteredOpenings = activeTab === 'all' 
    ? openings 
    : openings.filter(opening => opening.department === activeTab);

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    pink: 'bg-pink-100 text-pink-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  const teamTestimonials = [
    {
      quote: "Working at Novotion has been transformational for my career in recruitment. The support, mentorship, and opportunities for growth in talent acquisition are unmatched.",
      name: "Sarah M.",
      role: "Recruitment Consultant"
    },
    {
      quote: "I love the global collaboration in recruitment. I learn something new every day about talent acquisition from my colleagues across different time zones and cultures.",
      name: "Raj P.",
      role: "Career Support Specialist"
    }
  ];

  const values = [
    {
      icon: Star,
      title: "Integrity",
      description: "Honest and ethical practices in all recruitment activities"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for the highest standards in talent acquisition"
    },
    {
      icon: Target,
      title: "Commitment",
      description: "Dedicated to delivering exceptional recruitment results"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Embracing new technologies and methods in RPO services"
    },
    {
      icon: Users,
      title: "Empowerment",
      description: "Enabling growth and development in career support"
    },
    {
      icon: Globe2,
      title: "Global Excellence",
      description: "Delivering unified recruitment excellence across the regions"
    }
  ];

   const handleApplyNow = (position) => {
    setSelectedPosition(position);
    setIsApplicationFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Header />

      {/* Enhanced Hero Section - Mobile First */}
      <section className="relative min-h-[70vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-20 md:pt-24">
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          <div className="space-y-6 sm:space-y-8">
            
            {/* Badge - Fixed positioning */}
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 mb-2 sm:mb-4 md:mb-6 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-sm font-semibold tracking-wide">
                  Join Our Team
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Build Your Career With Novotion
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
              We're more than just a recruitment company. We're a team committed to excellence in talent acquisition, innovation in RPO services, and making a real difference in people's careers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
              <Link href="#openings" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto text-sm sm:text-base"
                >
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact#contact-form" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                >
                  Contact Our HR Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile First */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-cyan-400">
                <AnimatedCounter value="50" />+
              </div>
              <div className="text-blue-100 text-xs sm:text-sm">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-blue-300">
                <AnimatedCounter value="3" />
              </div>
              <div className="text-blue-100 text-xs sm:text-sm">Continents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-green-300">
                <AnimatedCounter value="15" />+
              </div>
              <div className="text-blue-100 text-xs sm:text-sm">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-purple-300">
                <AnimatedCounter value="500" />+
              </div>
              <div className="text-blue-100 text-xs sm:text-sm">Clients Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work at Novotion */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Why Work at Novotion?</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              We're building a workplace where talent acquisition professionals can thrive and make a real impact in people's careers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover-lift group border-l-4 border-l-blue-600 bg-gradient-to-br from-white to-blue-50/50">
                <CardContent className="text-center space-y-4">
                  <div className={`h-12 w-12 rounded-lg ${colorClasses[benefit.color]} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600">
                At Novotion, we believe in Integrity, Excellence, Commitment, Innovation, and Empowerment in everything related to recruitment and career development.
              </p>
              <p className="text-lg text-gray-600 mt-2">
                These aren't just buzzwords - they're the foundation of our recruitment culture and how we approach talent acquisition every day.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover-lift">
                  <CardContent className="space-y-3">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Novotion & What You'll Experience */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              
              {/* About Novotion */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">About Novotion</h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg leading-relaxed">
                   Novotion is a focused RPO and placement services company committed to connecting top talent with high-performing organizations.
                  </p>
                  <p className="text-lg leading-relaxed">
                   Since 2021, we've expanded our operations across India, the USA, and the UK, offering tailored recruitment, training, and career development solutions to support both candidates and employers. 
                  </p>
                  <p className="text-lg leading-relaxed">
                   Our purpose is straightforward: empowering professionals and companies to achieve meaningful growth. Through a blend of expert guidance and modern recruitment strategies, we ensure every candidate is equipped, supported, and positioned for sustained success. 
                  </p>
                </div>
              </div>

              {/* What You'll Experience */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">What You'll Experience</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Comprehensive Training</h4>
                      <p className="text-gray-600">Regular training sessions and skill development programs in recruitment to keep you at the top of your talent acquisition game.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Global Collaboration</h4>
                      <p className="text-gray-600">Collaborate with recruitment colleagues across the USA, UK, and India, learning from diverse perspectives in talent acquisition and career support.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Clear Career Paths</h4>
                      <p className="text-gray-600">Transparent progression paths and promotion opportunities in recruitment based on merit and performance in RPO services.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Recognition & Rewards</h4>
                      <p className="text-gray-600">Your hard work in talent acquisition doesn't go unnoticed. We celebrate wins in recruitment, big and small.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Testimonials */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Our Team Says</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {teamTestimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift border-l-4 border-l-blue-600">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-blue-600 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50/50 to-blue-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600">
              Explore Opportunities to Join Our Growing Team
            </p>
            <p className="text-base text-gray-500 mt-2">
              We're always looking for talented individuals who share our passion for connecting people with career opportunities through innovative recruitment solutions.
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setActiveTab(department)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === department
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-600 border border-gray-200'
                }`}
              >
                {department === 'all' ? 'All Departments' : department}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {filteredOpenings.map((opening, index) => (
              <Card key={index} className="hover-lift border-l-4 border-l-blue-600 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{opening.title}</h3>
                      <p className="text-gray-600 mb-4">{opening.description}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {opening.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {opening.type}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Briefcase className="h-4 w-4" />
                          {opening.experience} experience
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {opening.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-4 lg:mt-0">
                      {/* <Link href="/contact#contact-form"> */}
                        <Button
                          onClick={() => handleApplyNow(opening.title)}
                          size="lg" 
                          className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full lg:w-auto"
                        >
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      {/* </Link> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50/50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Don't See the Right Role?</h3>
                <p className="text-gray-600 mb-6">
                  We're always interested in hearing from talented professionals passionate about recruitment and career development. Send us your resume and let us know how you'd like to contribute to Novotion's talent acquisition mission.
                </p>
                {/* <Link href="/contact#contact-form"> */}
                  <Button
                    onClick={() => handleApplyNow('')}
                    size="lg" 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg transition-all"
                  >
                    Submit Your Resume
                  </Button>
                {/* </Link> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

       {/* Application Form Popup */}
      <JobApplicationForm 
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        selectedPosition={selectedPosition}
      />

      {/* Final Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Join the Novotion Team?
            </h2>
            <p className="text-xl text-blue-100">
              Take the next step in your career in recruitment. Explore our open positions in talent acquisition and career support or reach out to learn more about life at Novotion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="#openings">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  View Open Positions
                </Button>
              </Link>
              <Link href="/contact#contact-form">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Contact Our HR Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Career;