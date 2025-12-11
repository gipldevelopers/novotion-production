// src/components/home/TestimonialsSection.js
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // Default to 3 for desktop

  useEffect(() => {
    setMounted(true);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Phani Datta Pabisetty",
      role: "QA Analyst, Ampup",
      content: "Novotion's help was a game-changer. Their trainer didn't just prep me; they refined my entire approach to QA testing. I had an offer from Ampup within weeks. What really stood out was the post-placement support—they actually checked in and guided me after I started.",
      rating: 5
    },
    {
      id: 2,
      name: "Sanjay Nair",
      role: "Electrical Engineer, UPS",
      content: "The Novotion team didn't just rebuild my resume; they helped me see how to position my electrical engineering skills for the roles I really wanted. The interview coaching was focused and practical. I'm now at UPS, and I know their guidance was what made the difference.",
      rating: 5
    },
    {
      id: 3,
      name: "Rohan Verma",
      role: "Network Engineer, Sarasota County Government",
      content: "I had strong technical skills but was struggling to even get noticed. Novotion's team got to work, optimized my LinkedIn profile, and ran customized interview sessions that built my confidence. I secured my role with Sarasota County Government shortly after. Their personal attention is what sets them apart.",
      rating: 5
    },
    {
      id: 4,
      name: "Karthik Iyer",
      role: "DevOps Engineer, Meta",
      content: "Novotion has real industry experts. They connected me with a trainer who understood exactly what companies like Meta look for in a DevOps Engineer. We dove deep into CI/CD and cloud concepts, which was critical in my interviews. I owe a huge part of my success to their team.",
      rating: 5
    },
    {
      id: 5,
      name: "Aditya Kumar",
      role: "Full Stack Developer, Amazon Audible",
      content: "From the first resume edit to the final, advanced interview rounds, Novotion was with me. My consultant and trainer were relentless, working with me to sharpen my coding and problem-solving skills. The result? I landed my dream job as a Full Stack Developer at Amazon Audible.",
      rating: 5
    },
    {
      id: 6,
      name: "Vikram Reddy",
      role: "Electrical Engineer, Honeywell",
      content: "I was stuck in a cycle of rejections before I found Novotion. They were honest about what needed to change. They refined my resume and put me through targeted technical mock interviews that felt like the real thing. It gave me the confidence I was missing. Now, I'm part of the engineering team at Honeywell.",
      rating: 5
    },
    {
      id: 7,
      name: "Priya Sharma",
      role: "Design Engineer, TekWissen",
      content: "The team at Novotion genuinely treated me like family. My consultant guided me through every single step, from finding the right openings to helping me prepare for salary negotiation. The mock interviews were so realistic and incredibly effective. I'm now a Design Engineer at TekWissen!",
      rating: 5
    },
    {
      id: 8,
      name: "Arjun Patel",
      role: "SOC Analyst, Fivesky",
      content: "The Novotion team truly understands the cybersecurity domain. They connected me with a personal technical trainer who strengthened my SIEM and SOC fundamentals, moving me from theory to practical application. Within a month, I joined Fivesky. Their support and mentoring are excellent.",
      rating: 5
    },
    {
      id: 9,
      name: "Rahul Sharma",
      role: "Network Admin, Sierra Digital Inc",
      content: "Novotion helped me shape my professional journey. It wasn't just a placement service. From the resume revamp to their continuous follow-ups, they provided genuine career assistance. Their after-placement guidance made settling into my new role so much easier. I highly recommend them.",
      rating: 5
    }
  ];

  // Calculate visible testimonials based on screen size
  const getVisibleTestimonials = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) return 3; // Desktop - 3 cards
    if (screenWidth >= 768) return 2;  // Tablet - 2 cards
    return 1; // Mobile - 1 card
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleTestimonials());
      // Reset current index when screen size changes to avoid out of bounds
      setCurrentIndex(0);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleTestimonials]);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= testimonials.length) {
        return 0; // Loop back to start
      }
      // For multiple visible cards, ensure we don't go beyond the last possible starting index
      const maxStartIndex = Math.max(0, testimonials.length - visibleCount);
      return Math.min(nextIndex, maxStartIndex);
    });
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, visibleCount, testimonials.length]);

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        // Loop to the last possible starting position
        return Math.max(0, testimonials.length - visibleCount);
      }
      return prevIndex;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    // Ensure the index is valid and doesn't cause out of bounds
    const maxStartIndex = Math.max(0, testimonials.length - visibleCount);
    const safeIndex = Math.min(index, maxStartIndex);
    setCurrentIndex(safeIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-scroll functionality - FIXED
  useEffect(() => {
    // Only set up auto-scroll if not animating and component is mounted
    if (!mounted || isAnimating) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, visibleCount, mounted, isAnimating, nextSlide]);

  // Get current visible testimonials
  const getCurrentTestimonials = () => {
    const endIndex = Math.min(currentIndex + visibleCount, testimonials.length);
    let visibleTestimonials = testimonials.slice(currentIndex, endIndex);
    
    // If we're at the end and need to wrap around
    if (visibleTestimonials.length < visibleCount) {
      const remaining = visibleCount - visibleTestimonials.length;
      visibleTestimonials = [
        ...visibleTestimonials,
        ...testimonials.slice(0, remaining)
      ];
    }
    
    return visibleTestimonials;
  };

  if (!mounted) {
    return (
      <section className="min-h-[60vh] flex items-center bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-6"></div>
          <div className="h-12 bg-gray-300 rounded w-72 mx-auto mb-10"></div>
          <div className="max-w-2xl mx-auto">
            <div className="h-32 bg-gray-300 rounded-lg mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonials = getCurrentTestimonials();
  const totalSlides = Math.ceil(testimonials.length / visibleCount);
  const currentSlide = Math.floor(currentIndex / visibleCount);

  return (
    <section id='testimonials' className="min-h-[70vh] flex items-center bg-gradient-to-br from-slate-50 to-blue-50/30 relative py-16 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          
           <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 shadow-sm">
             Success Stories
           </div>

          {/* <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Success Stories That
            <span className="block text-primary">
              Inspire & Transform
            </span>
          </h2> */}

           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
             Real Results. Real People.
             <span className="block text-cyan-600">
               Real Impact.
             </span>
           </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
             Hear from professionals who have transformed their careers with our support
           </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-7xl mx-auto">
          
          {/* Navigation Buttons - Desktop */}
          <div className="hidden lg:flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="group p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-500 font-medium">
                Showing {currentIndex + 1}-{Math.min(currentIndex + visibleCount, testimonials.length)} of {testimonials.length} testimonials
              </div>
            </div>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="group p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-opacity duration-500 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            {currentTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentIndex}-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group hover-lift"
              >
                
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Quote className="h-5 w-5 text-white" />
                  </div>
                  
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed text-sm lg:text-base italic line-clamp-5 group-hover:line-clamp-none transition-all">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-900 text-base lg:text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-primary font-medium text-sm lg:text-base">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex justify-between items-center mt-8">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * visibleCount)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-primary' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Desktop Dots Indicator */}
          <div className="hidden lg:flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * visibleCount)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-primary w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Stats */}
          {/* <div className="text-center mt-12">
            <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">{testimonials.length}+</div>
                <div className="text-gray-600 text-sm">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">100%</div>
                <div className="text-gray-600 text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">4.9/5</div>
                <div className="text-gray-600 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">9+</div>
                <div className="text-gray-600 text-sm">Industries Served</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;

