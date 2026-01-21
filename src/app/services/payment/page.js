"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  CreditCard,
  Lock,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";

// Local storage key for saved addresses
const SAVED_ADDRESSES_KEY = "novotion_saved_addresses";

// Address type options
const ADDRESS_TYPES = [
  { value: "home", label: "Home" },
  { value: "work", label: "Work" },
  { value: "other", label: "Other" },
];

// Optimized Input Component
const InputField = React.memo(({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  type = "text",
  placeholder,
  required = true,
  className = "",
  autoFocus = false,
  ...props
}) => {
  const inputRef = useRef(null);
  
  // Focus on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full h-11 px-4 rounded-lg border ${
          error && touched
            ? "border-red-300 bg-red-50 focus:border-red-500" 
            : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
        } focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors text-base placeholder-gray-400`}
        aria-invalid={!!error && touched}
        aria-describedby={error && touched ? `${name}-error` : undefined}
        {...props}
      />
      {error && touched && (
        <p id={`${name}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

const PaymentPage = () => {
  const { cart, getCartTotal, clearCart, isLoaded } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const total = getCartTotal();
  
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showSavedAddresses, setShowSavedAddresses] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Form state with individual fields to prevent whole form re-renders
  const [formData, setFormData] = useState(() => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IN",
    addressType: "home",
    saveAddress: true,
  }));

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Individual field change handlers to prevent re-rendering all fields
  const createInputChangeHandler = useCallback((fieldName) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  }, [errors]);

  // Handle blur for individual field
  const createBlurHandler = useCallback((fieldName) => () => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, []);

  // Phone input handler
  const handlePhoneChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData(prev => ({ ...prev, phone: value }));
    
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  }, [errors.phone]);

  // Address type change handler
  const handleAddressTypeChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, addressType: e.target.value }));
  }, []);

  // Country change handler
  const handleCountryChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, country: e.target.value }));
  }, []);

  // Load saved addresses on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_ADDRESSES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedAddresses(parsed);
        
        // Auto-select first saved address if available
        if (parsed.length > 0 && !isAddingNew) {
          const firstAddress = parsed[0];
          setFormData({
            ...firstAddress,
            saveAddress: true,
          });
        }
      }
    } catch (error) {
      console.error("Error loading saved addresses:", error);
    }
  }, [isAddingNew]);

  // Save addresses whenever they change
  useEffect(() => {
    if (savedAddresses.length > 0) {
      localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(savedAddresses));
    }
  }, [savedAddresses]);

  // Select saved address
  const handleSelectAddress = useCallback((address) => {
    setFormData({
      ...address,
      saveAddress: true,
    });
    setShowSavedAddresses(false);
    setIsAddingNew(false);
  }, []);

  // Add new address
  const handleAddNewAddress = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "IN",
      addressType: "home",
      saveAddress: true,
    });
    setIsAddingNew(true);
    setShowSavedAddresses(false);
  }, []);

  // Save current address
  const handleSaveAddress = useCallback(() => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    const newAddress = {
      id: Date.now(),
      ...formData,
      label: `${ADDRESS_TYPES.find(t => t.value === formData.addressType)?.label} - ${formData.city}`,
      timestamp: new Date().toISOString(),
    };

    setSavedAddresses(prev => {
      // Remove if exists (update)
      const filtered = prev.filter(addr => addr.id !== newAddress.id);
      return [newAddress, ...filtered];
    });

    toast.success("Address saved successfully");
  }, [formData]);

  // Validate form
  const validateForm = useCallback(() => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'postalCode'];
    const newErrors = {};
    
    required.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter 10-digit number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Process payment
  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error("No items in cart");
      return;
    }

    if (!validateForm()) {
      toast.error("Please check the form for errors");
      return;
    }

    // Save address if checkbox is checked
    if (formData.saveAddress) {
      handleSaveAddress();
    }

    setLoading(true);
    try {
      const customer = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ""),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      };

      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, customer }),
      });

      if (!res.ok) throw new Error("Payment failed");

      const data = await res.json();
      
      if (!data.redirectUrl) {
        throw new Error("Payment gateway error");
      }

      clearCart();
      window.location.href = data.redirectUrl;
    } catch (error) {
      toast.error("Payment failed", {
        description: "Please try again or contact support",
      });
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (cart.length === 0 && step !== 2) {
    return (
      <div className="min-h-screen bg-gray-50">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2">
              <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Billing Information
                  </h1>
                </div>

                <div className="p-6">
                  {/* Saved Addresses Dropdown */}
                  {savedAddresses.length > 0 && !isAddingNew && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Select Saved Address
                        </label>
                        <button
                          type="button"
                          onClick={handleAddNewAddress}
                          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          Add New
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {savedAddresses.slice(0, showSavedAddresses ? undefined : 3).map((address) => (
                          <div
                            key={address.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 ${
                              formData.email === address.email ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => handleSelectAddress(address)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                formData.email === address.email 
                                  ? 'border-blue-500 bg-blue-500' 
                                  : 'border-gray-300'
                              }`}>
                                {formData.email === address.email && (
                                  <div className="h-2 w-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">
                                    {address.firstName} {address.lastName}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                    {address.addressType === 'home' ? 'Home' : 
                                     address.addressType === 'work' ? 'Work' : 'Other'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{address.address}</p>
                                <p className="text-sm text-gray-600">
                                  {address.city}, {address.state} {address.postalCode}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {address.email} • {address.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {savedAddresses.length > 3 && !showSavedAddresses && (
                          <button
                            type="button"
                            onClick={() => setShowSavedAddresses(true)}
                            className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2"
                          >
                            Show {savedAddresses.length - 3} more addresses
                            <ChevronDown className="h-4 w-4 inline-block ml-1" />
                          </button>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="useSaved"
                            checked={!isAddingNew}
                            onChange={() => setIsAddingNew(true)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label htmlFor="useSaved" className="ml-2 text-sm text-gray-700">
                            Use selected saved address
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add New Address Form */}
                  {(isAddingNew || savedAddresses.length === 0) && (
                    <>
                      <div className="mb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {savedAddresses.length > 0 ? "Add New Address" : "Enter Billing Details"}
                          </h3>
                          {savedAddresses.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setIsAddingNew(false)}
                              className="text-sm text-gray-600 hover:text-gray-900"
                            >
                              ← Back to saved addresses
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <InputField
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={createInputChangeHandler('firstName')}
                          onBlur={createBlurHandler('firstName')}
                          placeholder="John"
                          error={errors.firstName}
                          touched={touched.firstName}
                          autoFocus={true}
                        />
                        <InputField
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={createInputChangeHandler('lastName')}
                          onBlur={createBlurHandler('lastName')}
                          placeholder="Doe"
                          error={errors.lastName}
                          touched={touched.lastName}
                        />
                        <div className="md:col-span-2">
                          <InputField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={createInputChangeHandler('email')}
                            onBlur={createBlurHandler('email')}
                            placeholder="john@example.com"
                            error={errors.email}
                            touched={touched.email}
                          />
                        </div>
                        <InputField
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          onBlur={createBlurHandler('phone')}
                          placeholder="9876543210"
                          error={errors.phone}
                          touched={touched.phone}
                        />
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Address Type
                          </label>
                          <select
                            name="addressType"
                            value={formData.addressType}
                            onChange={handleAddressTypeChange}
                            className="w-full h-11 px-4 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                          >
                            {ADDRESS_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <InputField
                            label="Street Address"
                            name="address"
                            value={formData.address}
                            onChange={createInputChangeHandler('address')}
                            onBlur={createBlurHandler('address')}
                            placeholder="123 Main Street, Apt 4B"
                            error={errors.address}
                            touched={touched.address}
                          />
                        </div>
                        <InputField
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={createInputChangeHandler('city')}
                          onBlur={createBlurHandler('city')}
                          placeholder="Mumbai"
                          error={errors.city}
                          touched={touched.city}
                        />
                        <InputField
                          label="State"
                          name="state"
                          value={formData.state}
                          onChange={createInputChangeHandler('state')}
                          onBlur={createBlurHandler('state')}
                          placeholder="Maharashtra"
                          error={errors.state}
                          touched={touched.state}
                        />
                        <InputField
                          label="Postal Code"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={createInputChangeHandler('postalCode')}
                          onBlur={createBlurHandler('postalCode')}
                          placeholder="400001"
                          error={errors.postalCode}
                          touched={touched.postalCode}
                        />
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleCountryChange}
                            className="w-full h-11 px-4 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                          >
                            <option value="IN">India</option>
                            <option value="US">United States</option>
                            <option value="GB">United Kingdom</option>
                          </select>
                        </div>
                      </div>

                      {/* Save Address Toggle */}
                      <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          id="saveAddress"
                          name="saveAddress"
                          checked={formData.saveAddress}
                          onChange={createInputChangeHandler('saveAddress')}
                          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="saveAddress" className="text-sm text-gray-700">
                          Save this address for future purchases
                        </label>
                      </div>
                    </>
                  )}

                  {/* Security Info */}
                  <div className="p-4 bg-blue-50 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Secure Payment Processing
                        </p>
                        <p className="text-xs text-blue-800">
                          All transactions are encrypted and secure. Your payment information is never stored on our servers.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-lg transition-colors shadow-sm hover:shadow"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing Secure Payment...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Pay ${total} Now
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-32">
                <h3 className="text-lg font-bold mb-6 pb-4 border-b border-gray-100">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">${total}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Encrypted and secure payment processing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;