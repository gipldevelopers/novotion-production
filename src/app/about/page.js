'use client';
import React from 'react';
import { Target, Shield, Award, Users, Globe, Rocket } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32">
                <section className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-6xl font-black text-gray-900 mb-6">People, Potential, Partnership</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">We are Architects of opportunity and masters of talent acquisition.</p>
                </section>

                <section className="bg-gray-50 py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Shield, title: "Integrity", text: "We operate with unwavering honesty and transparency." },
                                { icon: Award, title: "Excellence", text: "We aim for the highest standard in every service." },
                                { icon: Users, title: "Commitment", text: "We are personally invested in your success." },
                                { icon: Rocket, title: "Innovation", text: "We constantly evolve our recruitment methods." },
                                { icon: Globe, title: "Global Reach", text: "Bridging talent across USA, UK and India." },
                                { icon: Target, title: "Results", text: "Delivering measurable hiring outcomes." }
                            ].map((value, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                        <value.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{value.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
