// // src/components/Header.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Menu, X, ChevronDown, Phone } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const isActive = (path) => pathname === path;

//   const navItems = [
//     { href: '/', label: 'Home' },
//     { href: '/about', label: 'About Us' },
//     {
//       label: 'Services',
//       children: [
//         { href: '/services/rpo', label: 'Recruitment Process Outsourcing' },
//         { href: '/services/career-support', label: 'Career Support Services' }
//       ]
//     },
//     { href: '/blog', label: 'Blog' },
//     { href: '/career', label: 'Career' },
//     { href: '/contact', label: 'Contact Us' },
//   ];

//   return (
//     <header
//       className={`fixed top-0 w-full z-50 transition-all duration-300 
//         ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'} 
//         border-b border-gray-200`}
//     >
//       <nav className="container mx-auto px-4 sm:px-6">
//         <div className="flex h-20 items-center justify-between relative">

//           {/* Mobile Menu Button - Positioned absolutely on left */}
//           <button
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition absolute left-0"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
//           </button>

//           {/* Logo - Centered on mobile, left on desktop */}
//           <Link 
//             href="/" 
//             className="flex items-center group lg:mx-0 mx-auto lg:absolute lg:left-0"
//           >
//             <div className="relative">
//               <div className="w-50 h-50 bg-transparent rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
//                 <Image
//                   src="/logo/novotion_01.svg"
//                   alt="Novotion Logo"
//                   width={80}
//                   height={80}
//                   className="w-full h-full object-contain"
//                   priority
//                 />
//               </div>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 mx-auto">
//             {navItems.map((item) => (
//               <div key={item.label} className="relative group">
//                 {item.children ? (
//                   <>
//                     <button
//                       className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
//                     >
//                       {item.label}
//                       <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
//                     </button>

//                     {/* Dropdown */}
//                     <div className="absolute left-0 mt-2 w-64 opacity-0 invisible 
//                       group-hover:opacity-100 group-hover:visible 
//                       transition-all duration-200 
//                       bg-white shadow-lg border border-gray-200 rounded-xl p-3 space-y-1 z-50"
//                     >
//                       {item.children.map((child) => (
//                         <Link
//                           key={child.href}
//                           href={child.href}
//                           className="block px-4 py-3 text-sm text-gray-700 
//                             hover:bg-primary/10 hover:text-primary 
//                             rounded-lg transition-all duration-150"
//                         >
//                           {child.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className={`text-sm font-medium relative transition-colors 
//                       ${isActive(item.href)
//                         ? 'text-primary'
//                         : 'text-gray-700 hover:text-primary'}`}
//                   >
//                     {item.label}
//                     {isActive(item.href) && (
//                       <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
//                     )}
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Desktop CTA */}
//           <div className="hidden lg:flex items-center space-x-4 absolute right-0">
//             <div className="flex items-center space-x-2 text-sm text-gray-700">
//               <Phone className="h-4 w-4 text-secondary" />
//               <span>+1 (786) 652-3950</span>
//             </div>

//             <Link href="/contact#contact-form">
//               <Button
//                 size="sm"
//                 className="btn-primary px-4 py-2 font-medium rounded-lg"
//               >
//                 Get Started
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden py-4 space-y-2 border-t border-gray-200 bg-white animate-fade-in-up">
//             {navItems.map((item) => (
//               <div key={item.label}>
//                 {item.children ? (
//                   <>
//                     <button
//                       onClick={() => setServicesOpen(!servicesOpen)}
//                       className="flex items-center justify-between w-full py-3 text-sm font-medium text-gray-700 hover:text-primary"
//                     >
//                       {item.label}
//                       <ChevronDown
//                         className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
//                       />
//                     </button>

//                     {servicesOpen && (
//                       <div className="pl-4 space-y-2 mt-2">
//                         {item.children.map((child) => (
//                           <Link
//                             key={child.href}
//                             href={child.href}
//                             className="block py-2 text-sm text-gray-600 hover:text-primary transition"
//                             onClick={() => setIsOpen(false)}
//                           >
//                             {child.label}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className={`block py-3 text-sm font-medium 
//                       ${isActive(item.href) ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {item.label}
//                   </Link>
//                 )}
//               </div>
//             ))}

//             {/* Mobile CTA */}
//             <div className="pt-4 border-t border-gray-200 space-y-3">
//               <div className="flex items-center space-x-2 text-sm text-gray-700 pb-2">
//                 <Phone className="h-4 w-4 text-secondary" />
//                 <span>+1 (786) 652-3950</span>
//               </div>

//               <Link href="/contact#contact-form" onClick={() => setIsOpen(false)}>
//                 <Button className="btn-primary w-full py-3 font-medium rounded-lg">
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';

const Header = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [paidServicesOpen, setPaidServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    {
      label: 'Services',
      children: [
        { href: '/services/rpo', label: 'Recruitment Process Outsourcing' },
        { href: '/services/career-support', label: 'Career Support Services' },
        { href: '/services/career-packages', label: 'Career Growth Packages' },
        { href: '/services/pro-services', label: 'Pro Services' }
      ]
    },
    { href: '/blog', label: 'Blog' },
    { href: '/career', label: 'Career' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 
        ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'} 
        border-b border-gray-200`}
    >
      <nav className="container mx-auto px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between relative">

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition absolute left-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group lg:mx-0 mx-auto lg:absolute lg:left-0"
          >
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 mx-auto">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute left-0 mt-2 w-64 opacity-0 invisible 
                      group-hover:opacity-100 group-hover:visible 
                      transition-all duration-200 
                      bg-white shadow-lg border border-gray-200 rounded-xl p-3 space-y-1 z-50"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-gray-700 
                            hover:bg-primary/10 hover:text-primary 
                            rounded-lg transition-all duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium relative transition-colors 
                      ${isActive(item.href)
                        ? 'text-primary'
                        : 'text-gray-700 hover:text-primary'}`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4 absolute right-0">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Phone className="h-4 w-4 text-secondary" />
              <span>+1 (786) 652-3950</span>
            </div>

            <Link href="/services/cart" className="relative p-2 text-gray-700 hover:text-primary transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link href="/contact#contact-form">
              <Button
                size="sm"
                className="btn-primary px-4 py-2 font-medium rounded-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-gray-200 bg-white animate-fade-in-up">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between w-full py-3 text-sm font-medium text-gray-700 hover:text-primary"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {servicesOpen && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-sm text-gray-600 hover:text-primary transition"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-3 text-sm font-medium 
                      ${isActive(item.href) ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Phone className="h-4 w-4 text-secondary" />
                  <span>+1 (786) 652-3950</span>
                </div>

                <Link href="/services/cart" onClick={() => setIsOpen(false)} className="relative p-2 text-gray-700 hover:text-primary transition-colors">
                  <ShoppingBag className="h-6 w-6" />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>

              <Link href="/contact#contact-form" onClick={() => setIsOpen(false)}>
                <Button className="btn-primary w-full py-3 font-medium rounded-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;