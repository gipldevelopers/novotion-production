// src/app/about/page.js
"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Heart,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  Star,
  Award,
  Globe,
  Rocket,
  ChevronRight,
  Quote,
  Zap,
  Shield,
  Clock,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Enhanced Card components
const Card = ({ children, className = "", delay = 0, ...props }) => (
  <div
    className={`rounded-lg sm:rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We operate our recruitment solutions with unwavering honesty, transparency, and respect. No exceptions in our hiring process. No shortcuts in talent acquisition.",
      color: "primary",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We aim for the highest standard in every recruitment service we deliver - from a single resume optimization to a full RPO implementation.",
      color: "primary",
    },
    {
      icon: Heart,
      title: "Commitment",
      description:
        "We are personally invested in your career success and hiring goals. Your talent acquisition objectives become our objectives. Your wins in recruitment are our wins.",
      color: "primary",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly evolve our recruitment process outsourcing, adopting smarter, more human-centric hiring methods and technologies to stay ahead.",
      color: "primary",
    },
    {
      icon: TrendingUp,
      title: "Empowerment",
      description:
        "We equip professionals with the tools, career training, and confidence they need through our career support services to achieve their aspirations.",
      color: "primary",
    },
    {
      icon: Globe,
      title: "Global Excellence",
      description:
        "Bridging talent acquisition across the USA & UK with localized recruitment expertise and global RPO standards.",
      color: "primary",
    },
  ];

  const testimonials = [
    {
      name: "Hiring Manager, Ampup ",
      title: "",
      text: "Novation transformed our hiring experience. Their strategic interview preparation and candidate support helped us secure the right talent quickly. What impressed us most was their continued support even after placement.",
      rating: 5,
      company: "Ampup",
    },
    {
      name: "Aditya Kumar",
      title: "Full Stack Developer, Amazon Audible",
      text: "From the first resume edit to the final interview rounds, Novotion's career coaching was with me. My consultant and trainer worked relentlessly, sharpening my coding skills through their interview preparation program. I landed my dream job at Amazon Audible.",
      rating: 5,
      company: "Amazon",
    },
    {
      name: "Hiring Manager, Meta ",
      title: "",
      text: "Novotion brings true industry expertise to talent acquisition. Their team quickly understood our hiring expectations and delivered candidates who were exceptionally well-prepared. Their recruitment support made a measurable impact.",
      rating: 5,
      company: "Meta",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "The Beginning",
      description:
        "Started with a vision to transform recruitment solutions - making talent acquisition more human, more strategic, and more impactful through innovative RPO services.",
    },
    {
      year: "2022",
      title: "Momentum Builds",
      description:
        "Crossed 100 successful placements and established our reputation for quality recruitment process outsourcing and reliable career support services.",
    },
    {
      year: "2023",
      title: "Going Global",
      description:
        "Expanded recruitment solutions to USA and UK markets, bringing our client-first RPO approach and talent acquisition expertise to international audiences.",
    },
    {
      year: "2024",
      title: "Scaling Impact",
      description:
        "Served 500+ organizations worldwide with recruitment process outsourcing and placed thousands of professionals through comprehensive career support services.",
    },
    {
      year: "2025",
      title: "Onward & Upward",
      description:
        "Placed over 7,000+ professionals with our career support programs and continue to redefine excellence in recruitment and talent acquisition.",
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Header />

      {/* Enhanced Hero Section - Fixed Spacing */}
      <section className="relative min-h-[80vh] sm:min-h-[70vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-24 md:pt-24">
        {/* Background Elements - Mobile Optimized */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-8 sm:space-y-10 md:space-y-12 py-8 sm:py-4">
            
            {/* Badge - With proper spacing */}
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 mb-4 sm:mb-6 md:mb-8 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-sm font-semibold tracking-wide">
                  Our Story
                </span>
              </div>
            </div>

            {/* Main Heading - With proper spacing */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  People, Potential, Partnership
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
                We are Novotion - architects of opportunity and masters of talent
                acquisition.
              </p>
            </div>

            {/* CTA Buttons - With proper spacing */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sm:pt-6 md:pt-8">
              <Link href="/contact#contact-form" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white px-6 sm:px-8 py-4 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto text-base sm:text-base font-semibold"
                >
                  Partner With Us
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link
                href="/services/career-support"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-4 sm:py-4 rounded-lg transition-all w-full sm:w-auto text-base sm:text-base font-semibold"
                >
                  Start Your Career Journey
                  <TrendingUp className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Enhanced */}
      <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              {/* Introduction */}
              <div className="space-y-6 animate-on-scroll">
                <div className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-blue-600">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  Who We Are
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  We are Novotion - a specialized Recruitment Process
                  Outsourcing (RPO) and Career Support Services company.
                </h2>

                <div className="space-y-4 leading-relaxed text-gray-600">
                  <p className="text-sm sm:text-base">
                    But we see ourselves as something more: we are architects of
                    opportunity and masters of talent acquisition.
                  </p>
                  <p className="text-sm sm:text-base">
                    For businesses in the USA and UK, we build high-performing
                    teams through strategic recruitment solutions that drive
                    sustainable growth. For skilled professionals worldwide, our
                    career support services pave the way for long-term success.
                  </p>
                  <p className="text-sm sm:text-base">
                    Founded in 2021, Novotion operates with a truly global
                    recruitment footprint. With strategic centers in India and
                    the USA, and strengthened operational capabilities across
                    the UK, we blend deep local market expertise with the power
                    of 24/7 workforce management operations.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-blue-600"
                      ></div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold">50+ Team Members</div>
                    <div className="text-xs sm:text-sm">
                      Across global locations
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission & Stats */}
              <div className="space-y-6 animate-on-scroll">
                <Card className="hover-lift border-l-4 border-l-blue-600 bg-gradient-to-br from-white to-blue-50/50">
                  <CardContent className="space-y-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      Our Mission is to be the most reliable partner in career
                      growth and talent acquisition recognized not only for our
                      RPO excellence, but for our integrity and our steadfast
                      dedication to the success of every client and candidate we
                      support.
                    </p>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-xl p-4 sm:p-6 text-white text-center bg-gradient-to-r from-blue-600 to-cyan-600">
                    <div className="text-xl sm:text-2xl font-bold">500+</div>
                    <div className="text-xs sm:text-sm">Clients Served</div>
                  </div>
                  <div className="rounded-xl p-4 sm:p-6 text-white text-center bg-gradient-to-r from-blue-600 to-cyan-600">
                    <div className="text-xl sm:text-2xl font-bold">7K+</div>
                    <div className="text-xs sm:text-sm">
                      Professionals Placed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Journey Timeline */}
      <section id="our-journey" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50/50 to-blue-50/50">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-blue-600 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              Our Journey
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Building Excellence
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                Through Innovation
              </span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full bg-blue-600"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative mb-8 ${
                    index % 2 === 0
                      ? "md:flex md:flex-row"
                      : "md:flex md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-6" : "md:pl-6"
                    }`}
                  >
                    <Card className="hover-lift border-l-4 border-l-blue-600 bg-white/60 backdrop-blur-sm">
                      <CardContent className="p-4 sm:p-6">
                        <div className="text-lg sm:text-xl font-bold text-blue-600">
                          {milestone.year}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full z-10 border-4 border-blue-600"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Values */}
      <section id="values" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-blue-600 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              Our Core Value
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Core Values That
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                Drive Us
              </span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto px-4">
              These aren't just words—they're the principles that guide every
              recruitment decision, every RPO partnership, and every talent
              placement we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="hover-lift group border-l-4 border-l-blue-600 bg-gradient-to-br from-white to-blue-50/50"
              >
                <CardContent className="text-center space-y-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <value.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {value.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced What Sets Us Apart */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50/50 to-blue-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What Sets
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {" "}
                  Novotion Apart?
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 animate-on-scroll">
                {[
                  {
                    icon: Award,
                    title: "Industry Specialization",
                    description:
                      "Our recruitment solutions teams are specialized across 15+ industries and countless job functions. We speak your language and understand the nuances of your workforce management needs.",
                  },
                  {
                    icon: Zap,
                    title: "Complete Transparency",
                    description:
                      "We believe in full visibility in our recruitment process outsourcing. You'll receive measurable talent acquisition outcomes, clear communication, and honest hiring updates at every step.",
                  },
                  {
                    icon: Shield,
                    title: "End-to-End Partnership",
                    description:
                      "From the first conversation about RPO services to long-term post-placement support, we are your partners for the entire recruitment journey.",
                  },
                  {
                    icon: Clock,
                    title: "24/7 Support",
                    description:
                      "Our global reach and round-the-clock recruitment support model mean our talent acquisition team is always working for you - ensuring no career opportunity is missed.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Content - Visual Element */}
              <div className="relative animate-on-scroll">
                <div className="rounded-xl p-6 sm:p-8 text-white text-center shadow-xl bg-gradient-to-r from-blue-600 to-cyan-600">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                    85%+
                  </div>
                  <div className="text-base sm:text-lg font-semibold mb-2">
                    Placement Success Rate
                  </div>
                  <p className="text-blue-100 text-sm sm:text-base">
                    Consistently delivering exceptional recruitment process
                    outsourcing outcomes for both organizations and
                    professionals through proven talent acquisition strategies.
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
                    <div className="rounded-xl p-3 sm:p-4 bg-white/10">
                      <div className="text-lg sm:text-xl font-bold">15+</div>
                      <div className="text-xs sm:text-sm">Industries</div>
                    </div>
                    <div className="rounded-xl p-3 sm:p-4 bg-white/10">
                      <div className="text-lg sm:text-xl font-bold">24/7</div>
                      <div className="text-xs sm:text-sm">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-blue-600 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              Success Stories
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Our Clients and Candidates
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                Trust Us
              </span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Real stories from real professionals who found their dream roles
              with Novotion's career support services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover-lift border-l-4 border-l-blue-600 bg-gradient-to-br from-white to-blue-50/50"
              >
                <CardContent className="space-y-4">
                  {/* Quote Icon */}
                  <div className="text-blue-100">
                    <Quote className="h-6 w-6" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 leading-relaxed italic text-sm sm:text-base">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="font-semibold text-gray-900 text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {testimonial.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {testimonial.company.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {testimonial.company}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-8 sm:mt-12 animate-on-scroll">
            <div className="rounded-xl p-6 sm:p-8 text-white max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Ready to Experience the Novotion Difference?
              </h3>
              <p className="text-white text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                Whether you're ready to transform your hiring process through
                recruitment process outsourcing or take your career to the next
                level with our career support services, we're here to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact#contact-form" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-sm sm:text-base"
                  >
                    Partner With Us
                  </Button>
                </Link>
                <Link
                  href="/services/career-support"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 px-4 sm:px-6 py-3 rounded-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                  >
                    Start Your Career Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
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

export default About;