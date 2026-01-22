'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, ShoppingBag, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import { toast } from 'sonner';

const Header = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch user info
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      toast.success("Logged out successfully");
      router.push('/');
    } catch (err) {
      toast.error("Logout failed");
    }
  };

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
        { href: '/services/pro-services', label: 'Pro Services' },
        { href: '/services/custom-services', label: 'Custom Services' }
      ]
    },
    { href: '/blog', label: 'Blog' },
    { href: '/career', label: 'Career' },
    { href: '/contact', label: 'Contact Us' },
    ...(user ? [{ href: '/my-services', label: 'My Services' }] : []),
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 
        ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'} 
        border-b border-gray-200`}
    >
      <nav className="container mx-auto px-4 sm:px-6">
        <div className="flex h-20 items-center gap-4">

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>

          {/* Logo */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center group">
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-4 xl:space-x-8 min-w-0">
            {navItems.map((item) => (
              <div key={item.label} className="relative group shrink-0">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
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
                    className={`text-sm font-medium relative transition-colors whitespace-nowrap
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

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
            <div className="hidden xl:flex items-center space-x-2 text-sm text-gray-700">
              <Phone className="h-4 w-4 text-secondary" />
              <span className="whitespace-nowrap">+1 (786) 652-3950</span>
            </div>

            <Link href="/services/cart" className="relative p-2 text-gray-700 hover:text-primary transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {!loading && (
              user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                      {user.image ? (
                        <Image src={user.image} alt={user.name} width={32} height={32} />
                      ) : (
                        <UserIcon className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in duration-200">
                      <div className="px-3 py-2 border-b border-gray-100 mb-2">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/my-services"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        My Services
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href={`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`} className="hidden sm:block">
                  <Button size="sm" variant="outline" className="rounded-lg">
                    Sign In
                  </Button>
                </Link>
              )
            )}

            {!user && (
              <Link href="/contact#contact-form" className="hidden sm:block">
                <Button
                  size="sm"
                  className="btn-primary px-4 py-2 font-medium rounded-lg"
                >
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-gray-200 bg-white">
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

              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-red-600 border border-red-200 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              ) : (
                <Link href={`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`} onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full py-3 font-medium rounded-lg">
                    Sign In
                  </Button>
                </Link>
              )}

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
