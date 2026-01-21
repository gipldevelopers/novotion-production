'use client';
import React from 'react';
import Link from 'next/link';
import {
    ShoppingBag,
    Trash2,
    ArrowLeft,
    CreditCard,
    ShieldCheck,
    ArrowRight,
    Minus,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';

const CartPage = () => {
    const { cart, removeFromCart, getCartTotal, isLoaded } = useCart();

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                    <p className="text-sm font-medium text-gray-500">Loading your cart...</p>
                </div>
            </div>
        );
    }

    const total = getCartTotal();

    const handleRemove = (id, name) => {
        removeFromCart(id);
        toast.error(`${name} removed from cart`, {
            style: { borderRadius: '12px' }
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-20 max-w-5xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
                    <p className="text-gray-500 mt-2 text-lg">You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                {cart.length === 0 ? (
                    <div className="py-20 text-center border-t border-gray-100">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6 inline-flex p-4 rounded-full bg-slate-50">
                                <ShoppingBag className="h-8 w-8 text-slate-300" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Cart is empty</h2>
                            <p className="text-gray-500 mb-8">Ready to elevate your career? Browse our professional services to get started.</p>
                            <Link href="/services/pro-services">
                                <Button className="rounded-full px-8 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                                    Explore Services
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Cart Items List */}
                        <div className="lg:col-span-7">
                            <div className="space-y-0 divide-y divide-gray-100">
                                {cart.map((item) => (
                                    <div key={item.id} className="py-8 first:pt-0 group">
                                        <div className="flex gap-6 items-start">
                                            {/* Placeholder for item image icon */}
                                            <div className="h-20 w-20 rounded-2xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                                                <ShoppingBag className="h-8 w-8 text-blue-600/20 group-hover:text-blue-600/40" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                                                        {item.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => handleRemove(item.id, item.name)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-xl font-bold text-gray-900">
                                                        ${item.price}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                                                            Premium Service
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/services/pro-services" className="inline-flex items-center gap-2 mt-12 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Sticky Order Summary Card */}
                        <div className="lg:col-span-5">
                            <div className="bg-slate-50/50 rounded-3xl p-8 sticky top-32 border border-slate-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span className="text-sm">Subtotal</span>
                                        <span className="font-semibold text-gray-900">${total}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span className="text-sm">Service Fee</span>
                                        <span className="text-green-600 font-medium">Included</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                                        <span className="text-lg font-bold text-gray-900">Total Price</span>
                                        <span className="text-3xl font-extrabold text-blue-600">${total}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Link href="/services/payment">
                                        <Button className="w-full h-14 bg-gray-900 hover:bg-black text-white rounded-2xl shadow-xl transition-all gap-3 group text-lg font-semibold">
                                            Checkout
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>

                                    <div className="pt-8 space-y-4">
                                        <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-white border border-slate-100">
                                            <ShieldCheck className="h-6 w-6 text-blue-500" />
                                            <div>
                                                <p className="text-xs font-bold text-gray-900 uppercase tracking-tighter">Secure Payment</p>
                                                <p className="text-[11px] text-gray-500">Industry standard encryption</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-white border border-slate-100">
                                            <CreditCard className="h-6 w-6 text-indigo-500" />
                                            <div>
                                                <p className="text-xs font-bold text-gray-900 uppercase tracking-tighter">Fast Activation</p>
                                                <p className="text-[11px] text-gray-500">Service starts within 24 hours</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
