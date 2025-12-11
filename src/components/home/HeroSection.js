// src/components/home/HeroSection.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Briefcase,
  Building,
  Globe,
  Users,
  Target,
  Zap,
  Rocket,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: "Stronger Teams Start With Smarter Hiring",
      subtitle: "For Organizations",
      description: "We help USA & UK organizations hire faster, cut recruitment costs, and build high-performing teams through strategic, data-led RPO solutions.",
      button1Text: "Partner With Us",
      button1Link: "/services/rpo",
      button2Text: "Discover RPO Solutions",
      button2Link: "/services/rpo",
      features: [
        "Multi-market recruitment expertise",
        "24/7 sourcing and screening support"
      ],
      stats: { number: "500+", label: "Clients Served" },
      accentColor: "primary",
      image: "/images/hero-img.jpg",
      floatingElements: [
        { icon: Building, text: "RPO Experts", color: "primary" },
        { icon: Users, text: "Team Building", color: "secondary" },
        { icon: Target, text: "Strategic Goals", color: "primary" }
      ]
    },
    {
      title: "Your Next IT Opportunity Starts Here",
      subtitle: "For Professionals",
      description: "From interview prep to contract placements, we guide IT professionals (Java, .NET, Cloud, DevOps, QA & more) toward high-value career opportunities across the USA.",
      button1Text: "Find Your Next Role",
      button1Link: "/services/career-support",
      button2Text: "Advance Your Career",
      button2Link: "/services/career-support",
      features: [
        "Personalized career guidance",
        "Contract & project-based roles",
      ],
      stats: { number: "7K+", label: "Professionals Placed" },
      accentColor: "primary",
      image: "/images/hero-img4.jpg",
      floatingElements: [
        { icon: Briefcase, text: "Career Support", color: "secondary" },
        { icon: Zap, text: "IT Professionals", color: "primary" },
        { icon: Rocket, text: "USA Opportunities", color: "primary" }
      ]
    },
    {
      title: "Where Talent Strategy Meets Real Results",
      subtitle: "Recruitment Excellence",
      description: "Our recruitment solutions blend industry insight, advanced sourcing methods, and transparent reporting to deliver measurable hiring impact across USA & UK markets.",
      button1Text: "Explore How We Work",
      button1Link: "/services/rpo",
      button2Text: "Advance Your Career",
      button2Link: "/services/career-support",
      features: [
        "End-to-end talent acquisition",
        "Reduced hiring time & cost"
      ],
      stats: { number: "15+", label: "Industries" },
      accentColor: "primary",
      image: "/images/hero-img3.jpg",
      floatingElements: [
        { icon: Globe, text: "USA & UK Markets", color: "primary" },
        { icon: Star, text: "Excellence", color: "secondary" }
      ]
    },
  ];

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-15 md:pt-15">
      
      {/* Soft Brand Background Bubbles - Mobile Optimized */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-primary/20 rounded-full blur-3xl"
          animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-secondary/30 rounded-full blur-3xl"
          animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-60 md:h-60 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10 max-w-7xl py-4 md:py-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
          
          {/* LEFT SIDE - Mobile First */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1">

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white border border-primary/20 rounded-full px-3 sm:px-4 py-1 sm:py-2 mb-4 sm:mb-6 shadow-sm"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                Trusted by 500+ Organizations Worldwide
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              key={`subtitle-${currentSlide}`}
              className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 justify-center lg:justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="w-1.5 h-6 sm:h-8 bg-primary rounded-full"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-gray-600 uppercase">
                {currentSlideData.subtitle}
              </span>
            </motion.div>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {currentSlideData.title}
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {currentSlideData.description}
              </motion.p>
            </AnimatePresence>

            {/* Features - Single column on mobile, side-by-side on desktop */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-700 font-medium text-left">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA BUTTONS - Mobile Optimized */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href={currentSlideData.button1Link} className="w-full sm:w-auto">
                <Button className="bg-primary hover:bg-primary-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform w-full sm:w-auto text-sm sm:text-base">
                  {currentSlideData.button1Text}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </Link>

              <Link href={currentSlideData.button2Link} className="w-full sm:w-auto">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2 transition-all w-full sm:w-auto text-sm sm:text-base">
                  {currentSlideData.button2Text}
                </Button>
              </Link>
            </motion.div>

            {/* STATS - Mobile Optimized */}
            <motion.div 
              className="flex gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 border-t border-gray-200 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{currentSlideData.stats.number}</div>
                <div className="text-xs sm:text-sm text-gray-600">{currentSlideData.stats.label}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">30-60%</div>
                <div className="text-xs sm:text-sm text-gray-600">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600">Global Support</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE IMAGE - Mobile Optimized */}
          <motion.div 
            className="relative h-48 sm:h-64 md:h-80 lg:h-[500px] xl:h-[600px] flex items-center justify-center order-1 lg:order-2 mb-4 sm:mb-6 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">

              {/* Image Container */}
              <motion.div
                className="relative w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-200"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Main Image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlideData.image}
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-black/10 z-20" />

                {/* Floating Elements - Mobile Optimized */}
                {currentSlideData.floatingElements.map((element, index) => {
                  const IconComponent = element.icon;
                  return (
                    <motion.div
                      key={element.text}
                      className={`absolute ${
                        index === 0 ? "top-2 right-2 sm:top-4 sm:right-4" :
                        index === 1 ? "bottom-12 left-2 sm:bottom-16 sm:left-4" :
                        "bottom-2 right-2 sm:bottom-4 sm:right-4"
                      } bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border border-gray-200`}
                      initial={{ opacity: 0, y: index === 0 ? -10 : 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${element.color === "secondary" ? "text-secondary" : "text-primary"}`} />
                        <span className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">{element.text}</span>
                      </div>
                    </motion.div>
                  );
                })}

              </motion.div>

              {/* Decorative Brand Blobs - Mobile Optimized */}
              <motion.div
                className="absolute -top-1 -right-1 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 bg-primary/20 rounded-xl sm:rounded-2xl blur-xl"
                animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-secondary/20 rounded-xl sm:rounded-2xl blur-xl"
                animate={{ rotate: [0, -8, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators - Mobile Optimized */}
      {/* <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 
              ${currentSlide === index ? 
                'w-6 sm:w-8 h-2 sm:h-3 bg-primary' : 
                'w-2 sm:w-3 h-2 sm:h-3 bg-gray-300'}`}
          />
        ))}
      </div> */}

      {/* Prev / Next Buttons - Hidden on Mobile */}
      <div className="hidden md:flex absolute top-1/2 left-0 right-0 transform -translate-y-1/2 justify-between px-4 lg:px-6 z-20 pointer-events-none">
        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="pointer-events-auto w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition transform hover:scale-110"
        >
          <ArrowRight className="w-4 h-4 lg:w-6 lg:h-6 text-gray-700 rotate-180" />
        </button>

        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="pointer-events-auto w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition transform hover:scale-110"
        >
          <ArrowRight className="w-4 h-4 lg:w-6 lg:h-6 text-gray-700" />
        </button>
      </div>

    </section>
  );
};

export default HeroSection;