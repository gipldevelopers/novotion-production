// src/components/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-12">
          
          {/* Company */}
          <div className="lg:col-span-1 text-center md:text-left">
            <Link href="/" className="flex items-center group justify-center md:justify-start mb-6">
              <div className="relative">
                <div className="w-50 h-50 bg-transparent rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/logo/novotion_01.svg"
                    alt="Novotion Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
              Empowering businesses across USA & UK markets with strategic recruitment solutions and IT career support services since 2021.
            </p>

            <div className="flex space-x-4 justify-center md:justify-start">
              {[
                { name: 'LinkedIn', icon: 'in' },
                { name: 'Facebook', icon: 'f' },
                { name: 'Twitter', icon: 't' }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
                  hover:bg-primary transition-colors cursor-pointer"
                  aria-label={social.name}
                >
                  <span className="font-semibold text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/blog', label: 'Blog' },
                { href: '/career', label: 'Career' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center group justify-center md:justify-start"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                { href: '/services/rpo', label: 'Recruitment Process Outsourcing' },
                { href: '/services/career-support', label: 'Career Support Services' },
                { href: '/services/rpo#services', label: 'Our RPO Service Model' },
                { href: '/services/career-support#services', label: 'Our Career Approach' },
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center group justify-center md:justify-start"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              {[
                { href: '/about#our-journey', label: 'Our Journey' },
                { href: '/about#values', label: 'Our Core Value' },
                { href: '/blog', label: 'Blog & Insights' },
                { href: '/contact#faq', label: 'FAQ' },
              ].map((resource, index) => (
                <li key={index}>
                  {resource.href.startsWith('/#') ? (
                    <button
                      onClick={() => scrollToSection(resource.href.substring(2))}
                      className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center group justify-center md:justify-start w-full text-left"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {resource.label}
                    </button>
                  ) : (
                    <Link
                      href={resource.href}
                      className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center group justify-center md:justify-start"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {resource.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-6">Contact</h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <a 
                  href="mailto:info@novotionservices.com" 
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  info@novotionservices.com
                </a>
              </li>

              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div>+1 (786) 652-3950</div>
                  <div className="text-xs text-gray-500 mt-1">USA Office</div>
                </div>
              </li>

              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div className="font-medium mb-1">USA:</div>
                  <div>7345 W, Sand Lake Rd, Ste 210</div>
                  <div>Orlando, FL 32819</div>
                </div>
              </li>

              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div className="font-medium mb-1">India:</div>
                  <div>Fourth floor, Streebo house</div>
                  <div>Nr DAV school, off S.G. highway</div>
                  <div>DAV International school, Makarba</div>
                  <div>Ahmedabad district: Ahmedabad,</div>
                  <div>Gujarat 380051</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="text-gray-400 text-center md:text-left text-sm">
              <p className="mb-1">Copyright © 2025 Novotion. All Rights Reserved.</p>
              <p className="text-xs md:text-sm">Strategic Recruitment Solutions & IT Career Support Services</p>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Powered by{' '}
                  <a 
                    href="https://gohilinfotech.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors underline"
                  >
                    Gohil Infotech
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 text-sm flex-wrap justify-center">
              <Link href="/privacy" className="text-gray-400 hover:text-primary text-xs md:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary text-xs md:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-gray-400 hover:text-primary text-xs md:text-sm transition-colors">
                Cancellation & Refund
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-gray-400 hover:text-primary text-xs md:text-sm transition-colors"
              >
                Back to Top
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;