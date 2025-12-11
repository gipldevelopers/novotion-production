// src/components/home/StatsSection.js
'use client';
import { useState, useEffect } from 'react';
import { Building, Users, TrendingUp, MapPin } from 'lucide-react';

const StatsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            setCounted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [counted]);

  const stats = [
    { 
      value: '500+', 
      label: 'Organizations Partnered', 
      delay: '100',
      icon: Building,
      description: 'For RPO services since 2021'
    },
    { 
      value: '7,000+', 
      label: 'Professionals Placed', 
      delay: '200',
      icon: Users,
      description: 'Through career support services'
    },
    { 
      value: '15+', 
      label: 'Industries Covered', 
      delay: '300',
      icon: TrendingUp,
      description: 'With specialized talent acquisition'
    },
    { 
      value: '2', 
      label: 'Global Offices', 
      delay: '400',
      icon: MapPin,
      description: 'India, USA delivering solutions'
    },
  ];

  if (!mounted) {
    return (
      <section id="stats-section" className="min-h-[40vh] md:min-h-[60vh] flex items-center bg-primary text-white relative overflow-hidden py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-pulse">
                <div className="h-12 md:h-16 bg-white/20 rounded-lg mb-3 mx-auto w-12 md:w-16"></div>
                <div className="h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="stats-section" 
      className="min-h-[40vh] md:min-h-[60vh] flex items-center bg-primary text-white relative overflow-hidden py-8 md:py-12"
    >
      {/* Background bubbles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            Making a Difference
            <span className="block text-secondary mt-1">
              Since 2021
            </span>
          </h2>
          <p className="text-white/80 max-w-md mx-auto text-sm md:text-base">
            Our recruitment solutions have transformed talent acquisition for organizations and professionals worldwide
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center observe group transition-all"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              {/* Icon Bubble */}
              <div className="relative inline-flex items-center justify-center mb-3">
                <div className="absolute inset-0 bg-white/10 rounded-full scale-125 transition-transform group-hover:scale-110"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 group-hover:bg-white/20 transition-all">
                  <stat.icon className="h-6 w-6 text-secondary" />
                </div>
              </div>

              {/* Number */}
              <div className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white">
                {counted ? stat.value : '0'}
              </div>

              {/* Label */}
              <div className="text-white/80 font-medium text-xs md:text-sm mb-1">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-white/70 text-xs hidden md:block">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item} 
                  className="w-6 h-6 bg-secondary rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-gray-900"
                >
                  {item}
                </div>
              ))}
            </div>
            <span className="text-white/80 text-sm">Trusted by 500+ companies worldwide</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default StatsSection;