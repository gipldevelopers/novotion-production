// src/components/home/WhyChooseUs.js
'use client';
import { useState, useEffect } from 'react';
import { Globe, CheckCircle, Users, Award, Shield, Zap, Target, Heart } from 'lucide-react';

const WhyChooseUs = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Globe,
      title: 'Global Reach, Personal Touch',
      description: 'Our recruitment solutions operate across three continents, but you\'ll always have a dedicated consultant who knows your name, understands your talent acquisition goals, and genuinely cares about your success.',
      color: 'primary'
    },
    {
      icon: Award,
      title: 'Industry Expertise',
      description: 'Our RPO services teams specialize in 15+ industries from tech and healthcare to finance and engineering. We speak your language and understand what makes your sector\'s hiring process unique.',
      color: 'primary'
    },
    {
      icon: Shield,
      title: 'Transparency You Can Trust',
      description: 'No hidden fees in our recruitment process outsourcing. No surprises. Just honest communication and measurable talent acquisition results at every step.',
      color: 'primary'
    },
    {
      icon: Users,
      title: 'End-to-End Partnership',
      description: 'We\'re not here for quick transactions. Whether it\'s your first conversation about workforce management or five years into our RPO partnership, we remain committed to your long-term success.',
      color: 'primary'
    },
    {
      icon: Zap,
      title: '24/7 Support',
      description: 'With teams across time zones, our recruitment solutions never sleep ensuring no career opportunity or hiring need slips through the cracks.',
      color: 'primary'
    },
  ];

  const currentFeature = features[activeFeature];

  if (!mounted) {
    return (
      <section className="min-h-[80vh] flex items-center bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] flex items-center bg-white relative overflow-hidden py-12">

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium mb-6 shadow-sm">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></div>
              Why Choose Novotion
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Your Trusted Partner for
              <span className="block text-primary">
                Recruitment Excellence
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Delivering measurable results through proven recruitment strategies and dedicated expertise.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* Left Feature Card */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">

                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                    {(() => {
                      const Icon = currentFeature.icon;
                      return <Icon className="h-6 w-6 text-white" />;
                    })()}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {currentFeature.title}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {currentFeature.description}
                </p>

                {/* Slide Indicators */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300
                          ${activeFeature === index
                            ? 'bg-primary w-3'
                            : 'bg-gray-300'
                          }`}
                      />
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 font-medium">
                    {activeFeature + 1} / {features.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Grid */}
            <div className="grid sm:grid-cols-2 gap-4">

              {features.map((feature, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveFeature(index)}
                  className={`group bg-white rounded-xl p-4 border transition-all cursor-pointer 
                    ${activeFeature === index
                      ? 'border-primary shadow-md scale-105'
                      : 'border-gray-100 hover:border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      {(() => {
                        const Icon = feature.icon;
                        return <Icon className="h-5 w-5 text-white" />;
                      })()}
                    </div>

                    <h3 className="font-semibold text-gray-900 text-sm">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
            {[
              { value: '500+', label: 'Clients' },
              { value: '7K+', label: 'Placements' },
              { value: '15+', label: 'Industries' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;