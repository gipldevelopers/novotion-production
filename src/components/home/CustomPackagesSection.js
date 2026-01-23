'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Sparkles,
    CheckCircle,
    ShoppingCart,
    ArrowRight,
    Zap,
    Shield,
    Star,
    Globe,
    Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';

// Icon mapping function
const getIconComponent = (iconName) => {
    const iconMap = {
        Zap,
        Star,
        Sparkles,
        Shield,
        Globe,
        Users,
    };
    return iconMap[iconName] || Zap; // Default to Zap if icon not found
};

const CustomPackagesSection = () => {
    const { addToCart } = useCart();
    const [customPackages, setCustomPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await fetch('/api/custom-packages');
                const data = await res.json();
                setCustomPackages(data);
            } catch (error) {
                console.error('Error fetching custom packages:', error);
                toast.error('Failed to load custom packages');
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const handleAddToCart = (pkg) => {
        const serviceWithId = {
            ...pkg,
            id: pkg.id || pkg.name.toLowerCase().replace(/\s+/g, '-'),
            type: 'custom-package'
        };

        addToCart(serviceWithId);
        toast.success(`${pkg.name} added to cart!`, {
            description: "You've successfully added this custom package. Check your cart to proceed.",
            duration: 3000,
            action: {
                label: 'View Cart',
                onClick: () => window.location.href = '/services/cart'
            },
        });
    };

    if (loading) {
        return (
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (customPackages.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] translate-x-1/2" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-100">
                        <Sparkles className="h-3 w-3" />
                        Custom Solutions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Tailored <span className="text-blue-600">Custom Packages</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Need something more specific? Our custom packages offer flexible, high-impact solutions matched exactly to your unique career trajectory.
                    </p>
                    <div className="mt-8">
                        <Link href="/services/custom-services">
                            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-8 h-12 shadow-sm">
                                Explore All Custom Services
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {customPackages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="group relative transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-blue-100/50 group-hover:border-blue-100" />

                            <div className="relative p-8 md:p-12 h-full flex flex-col">
                                {pkg.badge && (
                                    <div className="absolute -top-4 right-10 px-5 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                                        {pkg.badge}
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className={`h-16 w-16 rounded-2xl ${pkg.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-current/10`}>
                                        <pkg.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-3">{pkg.name}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{pkg.description}</p>
                                </div>

                                <div className="mb-10 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-slate-900">${pkg.price}</span>
                                        <span className="text-slate-400 font-bold uppercase tracking-tight text-sm">/ Package</span>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">One-time investment</p>
                                </div>

                                <div className="space-y-4 mb-12 flex-1">
                                    {pkg.features.map((feature, fidx) => (
                                        <div key={fidx} className="flex items-start gap-3">
                                            <div className="mt-1 h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                                            </div>
                                            <span className="text-slate-600 font-semibold text-sm leading-snug">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-slate-100">
                                    <Button
                                        onClick={() => handleAddToCart(pkg)}
                                        className={`w-full h-14 ${pkg.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : pkg.color === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-900 hover:bg-black shadow-slate-200'} text-white font-black rounded-2xl shadow-xl transition-all duration-300 gap-3 text-lg group/btn`}
                                    >
                                        <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                                        Add to Cart
                                    </Button>
                                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                        <Shield className="h-3 w-3" /> Secure 256-bit SSL Payment
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Footer */}
                <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-slate-900" />
                        <span className="font-bold text-slate-900 text-sm">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-slate-900" />
                        <span className="font-bold text-slate-900 text-sm">Global Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-slate-900" />
                        <span className="font-bold text-slate-900 text-sm">Expert Mentors</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomPackagesSection;
