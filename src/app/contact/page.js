'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Send, Clock, Users, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from "sonner";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success("Message sent successfully!");
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error("Failed to send message.");
            }
        } catch (err) {
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32">
                <section className="container mx-auto px-4 py-20">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
                        <div>
                            <h1 className="text-5xl font-black text-gray-900 mb-6">Let's Start a Conversation</h1>
                            <p className="text-xl text-gray-500 mb-12">Our team is here to help you accelerate your hiring goals and career growth.</p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                                        <p className="text-lg font-bold text-gray-900">info@novotionservices.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                                        <p className="text-lg font-bold text-gray-900">+1 (786) 652-3950</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <Button disabled={loading} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-100">
                                    {loading ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
