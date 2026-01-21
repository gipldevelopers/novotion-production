'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Mail,
    MapPin,
    Phone,
    Send,
    CheckCircle,
    Clock,
    Users,
    Globe,
    Sparkles,
    Rocket,
    ArrowRight,
    MessageCircle,
    Calendar,
    HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactCountryFlag from 'react-country-flag';
import { toast } from "sonner";

// Enhanced Card components
const Card = ({ children, className = "", ...props }) => (
    <div className={`rounded-lg sm:rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 ${className}`} {...props}>
        {children}
    </div>
);

const CardContent = ({ children, className = "", ...props }) => (
    <div className={`p-4 sm:p-6 ${className}`} {...props}>
        {children}
    </div>
);

// Custom Input Component
const Input = ({ label, required, type = "text", placeholder, value, onChange, className = "" }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base bg-white/50 backdrop-blur-sm ${className}`}
        />
    </div>
);

// Custom Textarea Component
const Textarea = ({ label, required, placeholder, value, onChange, rows = 4, className = "" }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-sm sm:text-base bg-white/50 backdrop-blur-sm ${className}`}
        />
    </div>
);

// Custom Select Component
const Select = ({ label, required, value, onChange, options, placeholder, className = "" }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            value={value}
            onChange={onChange}
            required={required}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm text-sm sm:text-base ${className}`}
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

// Custom Checkbox Component
const Checkbox = ({ checked, onChange, label, id }) => (
    <div className="flex items-start gap-3">
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={id} className="text-sm text-gray-600 cursor-pointer">
            {label}
        </label>
    </div>
);

// Chevron Icon for Accordion
const ChevronDown = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

// Accordion Component
const Accordion = ({ items }) => {
    const [openItem, setOpenItem] = useState(null);

    return (
        <div className="space-y-3 sm:space-y-4">
            {items.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                    <button
                        onClick={() => setOpenItem(openItem === index ? null : index)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-800 hover:text-cyan-600 transition-colors flex justify-between items-center text-sm sm:text-base"
                    >
                        {item.question}
                        <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${openItem === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openItem === index && (
                        <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 text-sm sm:text-base animate-fadeIn">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        userType: '',
        message: '',
        agreedToTerms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const userTypeOptions = [
        { value: 'organization', label: 'An Organization looking for RPO services and recruitment solutions' },
        { value: 'professional', label: 'An IT Professional seeking Career Support and contract opportunities' },
        { value: 'other', label: 'Other' }
    ];

    const faqs = [
        {
            question: "How quickly can I expect a response about your recruitment services?",
            answer: "We typically respond within 24 hours on business days to all RPO and career support inquiries."
        },
        {
            question: "Do you charge professionals for Career Support services?",
            answer: "Yes, our Career Support Services for IT professionals require an upfront investment. Our career coaching, resume optimization, and interview preparation services are designed to maximize your success in landing your next IT contract, and we charge for the comprehensive support we provide."
        },
        {
            question: "What industries do your recruitment solutions specialize in?",
            answer: "Our talent acquisition teams work across 15+ industries, including Technology & IT staffing, Healthcare, Finance, Manufacturing, and more with specialized RPO services."
        },
        {
            question: "Can I schedule a call directly about your RPO services?",
            answer: "Absolutely. Use the contact form above for recruitment inquiries, and our talent acquisition team will reach out to schedule a convenient time to discuss your hiring needs."
        },
        {
            question: "How does your recruitment process work?",
            answer: "For organizations: We start with a consultation to understand your talent acquisition needs, then design customized RPO solutions. For professionals: We begin with profile optimization and immediately start marketing you to our network of IT clients for relevant contract opportunities."
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreedToTerms) {
            toast.error('Please agree to the Privacy Policy and Terms of Service.');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to send message");
            } else {
                toast.success("Message sent successfully!");
                setIsSubmitted(true);

                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    company: '',
                    userType: '',
                    message: '',
                    agreedToTerms: false
                });
            }
        } catch (err) {
            toast.error("An expected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
            <Header />

            {/* Enhanced Hero Section - Mobile First */}
            <section className="relative min-h-[70vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-20 md:pt-24">

                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
                    <div className="space-y-6 sm:space-y-8">

                        {/* Badge */}
                        <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 mb-2 sm:mb-4 md:mb-6 shadow-2xl">
                            <div className="flex items-center gap-2">
                                <span className="text-white/90 text-sm font-semibold tracking-wide">
                                    Get In Touch
                                </span>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
                            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                Let's Start the Conversation
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
                            Thank you for your interest in Novotion. Every great partnership starts with a clear conversation about your hiring or career needs.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 max-w-2xl mx-auto">
                            <div className="flex flex-col items-center justify-center text-center gap-2">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-cyan-400" />
                                </div>
                                <div>
                                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">24h</div>
                                    <div className="text-cyan-200 text-xs sm:text-sm">Response Time</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-2">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">15+</div>
                                    <div className="text-blue-200 text-xs sm:text-sm">Industries</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-2">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-400" />
                                </div>
                                <div>
                                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">2</div>
                                    <div className="text-purple-200 text-xs sm:text-sm">Core Markets</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Are You? Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Tell Us How We Can Assist You</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            To ensure your inquiry about our recruitment solutions reaches the right team without delay, please select the option that best describes you:
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                        <Card className="hover-lift border-l-4 border-l-blue-600 bg-gradient-to-br from-white to-blue-50/50">
                            <CardContent className="space-y-4">
                                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">For Organizations</h3>
                                <p className="text-gray-600">
                                    Are you looking to optimize your talent acquisition, reduce hiring costs through RPO services, or scale your team in the USA or UK with strategic recruitment solutions?
                                </p>
                                <p className="text-gray-600">
                                    Connect with our recruitment process outsourcing specialists to discuss your unique workforce management needs.
                                </p>
                                <div className="pt-4">
                                    <Link href="mailto:info@novotionservices.com">
                                        <Button className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 px-6 py-3 rounded-lg transition-all w-full sm:w-auto">
                                            Contact RPO Team
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover-lift border-l-4 border-l-cyan-600 bg-gradient-to-br from-white to-cyan-50/50">
                            <CardContent className="space-y-4">
                                <div className="h-12 w-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                                    <MessageCircle className="h-6 w-6 text-cyan-600" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">For IT Professionals</h3>
                                <p className="text-gray-600">
                                    Are you a skilled IT professional in the USA market seeking expert career marketing, placement support through bench sales, and your next contract opportunity?
                                </p>
                                <p className="text-gray-600">
                                    Our Career Support Services team is ready to help you advance your career in the IT industry.
                                </p>
                                <div className="pt-4">
                                    <Link href="mailto:info@novotionservices.com">
                                        <Button className="group bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 px-6 py-3 rounded-lg transition-all w-full sm:w-auto">
                                            Contact Career Support
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact-form" className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Contact Form</h2>
                            <p className="text-lg text-gray-600">
                                For the fastest response about our recruitment solutions or career support, please fill out the form below.
                            </p>
                        </div>

                        {isSubmitted ? (
                            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50/50">
                                <CardContent className="p-8 text-center">
                                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                                    <p className="text-green-700 mb-4">
                                        Thank you for contacting Novotion. We'll get back to you within 24 hours.
                                    </p>
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        variant="outline"
                                        className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                                    >
                                        Send Another Message
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="hover-lift bg-gradient-to-br from-white to-blue-50/30 border-blue-100/50">
                                <CardContent className="p-6 lg:p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Input
                                                label="Full Name"
                                                required
                                                value={formData.fullName}
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                placeholder="John Doe"
                                            />
                                            <Input
                                                label="Email Address"
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                placeholder="john@company.com"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Input
                                                label="Phone Number"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                placeholder="+1 (555) 000-0000"
                                            />
                                            <Input
                                                label="Company/Organization (if applicable)"
                                                value={formData.company}
                                                onChange={(e) => handleInputChange('company', e.target.value)}
                                                placeholder="Your Company"
                                            />
                                        </div>

                                        <Select
                                            label="I am:"
                                            required
                                            value={formData.userType}
                                            onChange={(e) => handleInputChange('userType', e.target.value)}
                                            options={userTypeOptions}
                                            placeholder="Select one"
                                        />

                                        <Textarea
                                            label="Message"
                                            required
                                            value={formData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            placeholder="Tell us about your recruitment needs or career goals..."
                                            rows={4}
                                        />

                                        <Checkbox
                                            id="terms"
                                            checked={formData.agreedToTerms}
                                            onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                                            label="I have read and agree to the Novotion Privacy Policy and Terms of Service."
                                        />

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="group w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                                    Submit Message
                                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </section>

            {/* Our Global Offices */}
            <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50/50 to-blue-50/50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Global Offices</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We operate across multiple time zones to provide localized recruitment expertise and 24/7 talent acquisition support.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <Card className="hover-lift border-l-4 border-l-blue-600 bg-gradient-to-br from-white to-blue-50/50">
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <ReactCountryFlag
                                        countryCode="US"
                                        svg
                                        style={{
                                            width: "2em",
                                            height: "2em",
                                        }}
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">United States</h3>
                                        <p className="text-blue-600 font-medium">USA Office</p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div>7345 W, Sand Lake Rd, Ste 210</div>
                                            <div>Orlando, FL 32819</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-blue-500" />
                                        <span>info@novotionservices.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-blue-500" />
                                        <span>+1 (786) 652-3950</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover-lift border-l-4 border-l-cyan-600 bg-gradient-to-br from-white to-cyan-50/50">
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <ReactCountryFlag
                                        countryCode="IN"
                                        svg
                                        style={{
                                            width: "2em",
                                            height: "2em",
                                        }}
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">India</h3>
                                        <p className="text-cyan-600 font-medium">India Office</p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div>Fourth floor, Streebo house</div>
                                            <div>Nr DAV school, off S.G. highway </div>
                                            <div>DAV International school, Makarba </div>
                                            <div>Ahmedabad district: Ahmedabad,</div>
                                            <div>Gujarat 380051</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-cyan-500" />
                                        <span>info@novotionservices.com</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-12 sm:py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <Accordion items={faqs} />
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Prefer to Connect Directly?
                        </h2>
                        <p className="text-xl text-blue-100">
                            Give us a call or drop us an email about your recruitment or career needs. Our talent acquisition and career support teams are here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/contact#contact-form">
                                <Button
                                    size="lg"
                                    className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Schedule a Consultation
                                </Button>
                            </Link>
                            <Link href="mailto:info@novotionservices.com">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all font-semibold"
                                >
                                    <Mail className="mr-2 h-5 w-5" />
                                    Email Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Global Styles */}
            <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }

        .animate-fadeIn {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
        </div>
    );
};

export default Contact;
