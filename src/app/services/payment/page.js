'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
    ShieldCheck,
    CheckCircle2,
    ShoppingBag,
    Zap,
    User,
    Mail,
    Phone,
    MapPin,
    ChevronRight,
    ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';

const PaymentPage = () => {
    const { cart, getCartTotal, clearCart, isLoaded } = useCart();
    const [step, setStep] = useState(1); // 1: User Info, 2: Payment, 3: Confirmation
    const [loading, setLoading] = useState(false);
    const total = getCartTotal();

    // User information state
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'IN',
    });

    const [errors, setErrors] = useState({});

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate user info
    const validateUserInfo = () => {
        const newErrors = {};
        
        if (!userInfo.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!userInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!userInfo.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!userInfo.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(userInfo.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (!userInfo.address.trim()) newErrors.address = 'Address is required';
        if (!userInfo.city.trim()) newErrors.city = 'City is required';
        if (!userInfo.state.trim()) newErrors.state = 'State is required';
        if (!userInfo.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Go to payment step
    const handleContinueToPayment = () => {
        if (validateUserInfo()) {
            setStep(2);
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    // Process payment
    const handlePayment = async () => {
        if (cart.length === 0) {
            toast.error("No items in cart to pay for.");
            return;
        }

        setLoading(true);
        try {
            const customer = {
                name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
                email: userInfo.email,
                phone: userInfo.phone.replace(/\D/g, ''),
                address: userInfo.address,
                city: userInfo.city,
                state: userInfo.state,
                postalCode: userInfo.postalCode,
                country: userInfo.country,
            };

            const res = await fetch('/api/payments/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart, customer }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to initiate payment');
            }

            const data = await res.json();

            if (!data.redirectUrl) {
                throw new Error('No redirectUrl from payment gateway');
            }

            clearCart();
            window.location.href = data.redirectUrl;
        } catch (error) {
            console.error("[Payment Error]", error.message);
            toast.error(error.message || "Unable to process payment", {
                description: "Please try again or contact support if the issue persists.",
                duration: 6000,
            });
            setLoading(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header />
                <div className="pt-40 pb-20 text-center">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
                    <Link href="/services/pro-services">
                        <Button>Go to Services</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Input field component
    const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = true }) => (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                <input
                    type={type}
                    name={name}
                    value={userInfo[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`w-full h-11 ${Icon ? 'pl-10' : 'pl-4'} pr-4 rounded-xl border ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm`}
                />
            </div>
            {errors[name] && <p className="text-xs text-red-500">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-5xl mx-auto">
                    {/* Progress Bar */}
                    <div className="flex items-center justify-center mb-12">
                        <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-200'} font-bold`}>1</div>
                            <span className="ml-3 font-semibold hidden sm:block">Your Info</span>
                        </div>
                        <div className={`w-12 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-200'} font-bold`}>2</div>
                            <span className="ml-3 font-semibold hidden sm:block">Payment</span>
                        </div>
                        <div className={`w-12 h-0.5 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-blue-600 bg-blue-50' : 'border-gray-200'} font-bold`}>3</div>
                            <span className="ml-3 font-semibold hidden sm:block">Confirmation</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {step === 1 && (
                            <>
                                {/* User Info Form */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                            <User className="h-6 w-6 text-blue-600" />
                                            Billing Information
                                        </h2>

                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <InputField
                                                label="First Name"
                                                name="firstName"
                                                placeholder="John"
                                                icon={User}
                                            />
                                            <InputField
                                                label="Last Name"
                                                name="lastName"
                                                placeholder="Doe"
                                            />
                                            <InputField
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                icon={Mail}
                                            />
                                            <InputField
                                                label="Phone Number"
                                                name="phone"
                                                type="tel"
                                                placeholder="9876543210"
                                                icon={Phone}
                                            />
                                            <div className="sm:col-span-2">
                                                <InputField
                                                    label="Street Address"
                                                    name="address"
                                                    placeholder="123 Main Street, Apt 4B"
                                                    icon={MapPin}
                                                />
                                            </div>
                                            <InputField
                                                label="City"
                                                name="city"
                                                placeholder="Mumbai"
                                            />
                                            <InputField
                                                label="State"
                                                name="state"
                                                placeholder="Maharashtra"
                                            />
                                            <InputField
                                                label="Postal Code"
                                                name="postalCode"
                                                placeholder="400001"
                                            />
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                                                <select
                                                    name="country"
                                                    value={userInfo.country}
                                                    onChange={handleInputChange}
                                                    className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-sm"
                                                >
                                                    <option value="IN">India</option>
                                                    <option value="US">United States</option>
                                                    <option value="GB">United Kingdom</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="AU">Australia</option>
                                                    <option value="SG">Singapore</option>
                                                    <option value="AE">UAE</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-gray-100">
                                            <Button 
                                                onClick={handleContinueToPayment}
                                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 font-semibold"
                                            >
                                                Continue to Payment
                                                <ChevronRight className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* Payment Section */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                                <ShieldCheck className="h-6 w-6 text-blue-600" />
                                                Secure Payment
                                            </h2>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Zap className="h-4 w-4 text-yellow-500" />
                                                Powered by PayGlocal
                                            </div>
                                        </div>

                                        {/* User Info Summary */}
                                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-semibold text-gray-700">Billing Details</h3>
                                                <button 
                                                    onClick={() => setStep(1)}
                                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                                >
                                                    <ArrowLeft className="h-3 w-3" />
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-2 text-sm">
                                                <p><span className="text-gray-500">Name:</span> {userInfo.firstName} {userInfo.lastName}</p>
                                                <p><span className="text-gray-500">Email:</span> {userInfo.email}</p>
                                                <p><span className="text-gray-500">Phone:</span> {userInfo.phone}</p>
                                                <p><span className="text-gray-500">City:</span> {userInfo.city}, {userInfo.state}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                                                <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0" />
                                                <p className="text-sm text-blue-800 leading-relaxed">
                                                    You'll be redirected to our PCI-DSS compliant payment partner to securely complete your payment. We never store your card details.
                                                </p>
                                            </div>

                                            <div className="flex gap-3">
                                                <Button 
                                                    variant="outline"
                                                    onClick={() => setStep(1)}
                                                    className="h-12 px-6 rounded-xl border-gray-200"
                                                >
                                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                                    Back
                                                </Button>
                                                <Button
                                                    onClick={handlePayment}
                                                    disabled={loading}
                                                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                                                >
                                                    {loading ? (
                                                        <span className="flex items-center gap-2">
                                                            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        <>
                                                            Pay ${total}
                                                            <Zap className="h-5 w-5" />
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            /* Success State */
                            <div className="lg:col-span-3">
                                <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center max-w-2xl mx-auto">
                                    <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                                    </div>
                                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                                    <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                                        Thank you for choosing Novotion. We've sent a confirmation email to {userInfo.email}.
                                    </p>

                                    <div className="bg-slate-50 rounded-2xl p-8 mb-10 text-left grid sm:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Order Number</h4>
                                            <p className="text-lg font-bold text-gray-900">#NOV-{Math.floor(Math.random() * 90000) + 10000}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Customer</h4>
                                            <p className="text-lg font-bold text-gray-900">{userInfo.firstName} {userInfo.lastName}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Total Paid</h4>
                                            <p className="text-lg font-bold text-blue-600">${total}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Next Step</h4>
                                            <p className="text-sm font-medium text-gray-900">Our advisor will reach out within 24h</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link href="/">
                                            <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold">
                                                Go to Home
                                            </Button>
                                        </Link>
                                        <Link href="/services/pro-services">
                                            <Button variant="outline" className="h-12 px-8 rounded-xl border-gray-200">
                                                View Other Services
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sidebar Order Summary - show on step 1 and 2 */}
                        {step < 3 && (
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-32">
                                    <h3 className="text-lg font-bold mb-6 pb-4 border-b">Order Summary</h3>

                                    <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start gap-3">
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-semibold text-gray-900 leading-tight">{item.name}</h4>
                                                    <p className="text-[10px] text-gray-500 line-clamp-1">{item.description}</p>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">${item.price}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 py-6 border-t border-gray-100">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span>${total}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-900 font-bold border-t pt-3">
                                            <span className="text-lg">Total</span>
                                            <span className="text-2xl text-blue-600">${total}</span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                                        <div className="flex items-center gap-2 text-[11px] text-green-700 font-bold bg-green-50 px-2 py-1 rounded-full w-fit">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                                            Secure Checkout
                                        </div>
                                        <p className="text-[10px] text-gray-500">
                                            Your information is protected with 256-bit SSL encryption.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaymentPage;
