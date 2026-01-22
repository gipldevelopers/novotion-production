"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  CreditCard,
  Lock,
  Plus,
  ChevronDown,
  Loader2,
  Trash2,
  Edit2,
  ArrowLeft,
  Home,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
const InputField = React.memo(
  ({
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
  },
);

InputField.displayName = "InputField";

const PaymentPage = () => {
  const { cart, getCartTotal, clearCart, isLoaded } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const total = getCartTotal();

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showSavedAddresses, setShowSavedAddresses] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US", // Default to US for international feel
    addressType: "home",
    saveAddress: true,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Fetch user info and pre-fill form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setFormData((prev) => ({
            ...prev,
            firstName: data.user.name?.split(" ")[0] || "",
            lastName: data.user.name?.split(" ").slice(1).join(" ") || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            city: data.user.city || "",
            state: data.user.state || "",
            postalCode: data.user.postalCode || "",
            country: data.user.country || "US",
          }));
        } else {
          // Redirect to login if not authenticated
          router.push("/auth/login?callbackUrl=/services/payment");
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        router.push("/");
      } finally {
        setAuthChecked(true);
      }
    };
    fetchUser();
  }, [router]);

  // Individual field change handlers
  const createInputChangeHandler = useCallback(
    (fieldName) => (e) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
    [errors],
  );

  const createBlurHandler = useCallback(
    (fieldName) => () => {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
    },
    [],
  );

  const handlePhoneChange = useCallback(
    (e) => {
      const value = e.target.value.replace(/[^\d+]/g, "").slice(0, 15);
      setFormData((prev) => ({ ...prev, phone: value }));

      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    },
    [errors.phone],
  );

  const handleAddressTypeChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, addressType: e.target.value }));
  }, []);

  const handleCountryChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, country: e.target.value }));
  }, []);

  // Load saved addresses on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_ADDRESSES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedAddresses(parsed);

        // Auto-select first saved address if available and user not found
        if (parsed.length > 0 && !isAddingNew && !user) {
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
  }, [isAddingNew, user]);

  useEffect(() => {
    if (savedAddresses.length > 0) {
      localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(savedAddresses));
    }
  }, [savedAddresses]);

  const handleSelectAddress = useCallback((address) => {
    setFormData({
      ...address,
      saveAddress: true,
    });
    setShowSavedAddresses(false);
    setIsAddingNew(false);
  }, []);

  const handleAddNewAddress = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      addressType: "home",
      saveAddress: true,
    });
    setEditingAddressId(null);
    setIsAddingNew(true);
    setShowSavedAddresses(false);
  }, [user]);

  const handleEditAddress = useCallback((e, address) => {
    e.stopPropagation();
    setFormData({
      ...address,
      saveAddress: true,
    });
    setEditingAddressId(address.id);
    setIsAddingNew(true);
    setShowSavedAddresses(false);
  }, []);

  const handleDeleteAddress = useCallback((e, addressId) => {
    e.stopPropagation();
    setSavedAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    toast.success("Address deleted");
  }, []);

  const handleBackToSaved = useCallback(() => {
    setIsAddingNew(false);
    setEditingAddressId(null);
    // If we have saved addresses, show them
    if (savedAddresses.length > 0) {
      setShowSavedAddresses(false); // Just reset to selection view
    }
  }, [savedAddresses.length]);

  const handleSaveAddress = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    const addressData = {
      ...formData,
      label: `${ADDRESS_TYPES.find((t) => t.value === formData.addressType)?.label} - ${formData.city}`,
      timestamp: new Date().toISOString(),
    };

    setSavedAddresses((prev) => {
      if (editingAddressId) {
        // Update existing
        return prev.map((addr) =>
          addr.id === editingAddressId
            ? { ...addressData, id: editingAddressId }
            : addr,
        );
      } else {
        // Add new
        const newAddress = {
          id: Date.now(),
          ...addressData,
        };
        const filtered = prev.filter(
          (addr) =>
            addr.email !== newAddress.email ||
            addr.address !== newAddress.address,
        );
        return [newAddress, ...filtered];
      }
    });

    setEditingAddressId(null);
    setIsAddingNew(false);
  }, [formData, editingAddressId]);

  const validateForm = useCallback(() => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ];
    const newErrors = {};

    required.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error("No items in cart");
      return;
    }

    if (!validateForm()) {
      toast.error("Please check the form for errors");
      return;
    }

    if (formData.saveAddress) {
      handleSaveAddress();
    }

    setLoading(true);
    try {
      const customer = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email,
        phone: formData.phone.replace(/[^\d+]/g, ""),
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

      // We clear the cart here, but the loading overlay will handle the "empty page" feel
      clearCart();
      window.location.href = data.redirectUrl;
    } catch (error) {
      toast.error("Payment initiation failed", {
        description: error.message || "Please try again or contact support",
      });
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Loading Overlay for redirect
  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <div className="h-24 w-24 rounded-full border-4 border-blue-50 border-t-blue-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck className="h-10 w-10 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Redirecting to Secure Payment
        </h2>
        <p className="text-gray-500 max-w-sm">
          Please do not refresh the page or click back. We are preparing your
          secure checkout session.
        </p>
        <div className="mt-8 flex items-center gap-2 grayscale opacity-50">
          <Image
            src="/logo/novotion_01.svg"
            alt="Novotion"
            width={30}
            height={30}
          />
          <span className="font-bold text-gray-400">×</span>
          <span className="font-bold text-gray-400">PAYGLOCAL</span>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && step !== 2) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 pt-48 pb-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="relative inline-block mb-8">
              <div className="h-32 w-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-700">
                <ShoppingBag className="h-16 w-16 text-blue-500/40" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 animate-in slide-in-from-bottom-2 duration-1000">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Your bag is empty
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed max-w-sm mx-auto">
              Looks like you haven't added any premium services to your cart
              yet. Explore our career-boosting packages today.
            </p>

            <div className="flex flex-col gap-4">
              <Link href="/services/pro-services">
                <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 text-lg">
                  Explore Services
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl font-bold text-gray-700 border-gray-200 hover:bg-gray-50"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-50 flex items-center justify-center gap-8 grayscale opacity-40">
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Secure
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Lock className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Encrypted
                </span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle2 className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isLoaded || !authChecked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-500 font-medium">Loading checkout...</p>
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
              <div
                className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-blue-600" : "bg-gray-200"}`}
              ></div>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                1
              </div>
              <div
                className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
              ></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Billing Information
                  </h1>
                  {user && (
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                      Signed in as {user.email}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  {/* Saved Addresses */}
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
                        {savedAddresses
                          .slice(0, showSavedAddresses ? undefined : 3)
                          .map((address) => (
                            <div
                              key={address.id || address.email}
                              className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-500 group ${
                                formData.address === address.address
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200"
                              }`}
                              onClick={() => handleSelectAddress(address)}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${
                                    formData.address === address.address
                                      ? "border-blue-500 bg-blue-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {formData.address === address.address && (
                                    <div className="h-2 w-2 rounded-full bg-white"></div>
                                  )}
                                </div>
                                <div className="flex-1 text-sm">
                                  <div className="flex items-center justify-between">
                                    <p className="font-bold text-gray-900">
                                      {address.firstName} {address.lastName}
                                    </p>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          handleEditAddress(e, address)
                                        }
                                        className="p-1 text-gray-400 hover:text-blue-600 rounded"
                                        title="Edit Address"
                                      >
                                        <Edit2 className="h-4 w-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          handleDeleteAddress(e, address.id)
                                        }
                                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                                        title="Delete Address"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-gray-600">
                                    {address.address}, {address.city}
                                  </p>
                                  <p className="text-gray-500">
                                    {address.email} • {address.phone}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Form Header for New/Edit */}
                  {isAddingNew && (
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                      <button
                        type="button"
                        onClick={handleBackToSaved}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Selection
                      </button>
                      <h2 className="text-lg font-bold text-gray-900">
                        {editingAddressId ? "Edit Address" : "Add New Address"}
                      </h2>
                    </div>
                  )}

                  {/* Form Fields */}
                  {(isAddingNew || savedAddresses.length === 0) && (
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <InputField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={createInputChangeHandler("firstName")}
                        onBlur={createBlurHandler("firstName")}
                        placeholder="e.g. Michael"
                        error={errors.firstName}
                        touched={touched.firstName}
                      />
                      <InputField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={createInputChangeHandler("lastName")}
                        onBlur={createBlurHandler("lastName")}
                        placeholder="e.g. Scott"
                        error={errors.lastName}
                        touched={touched.lastName}
                      />
                      <div className="md:col-span-2">
                        <InputField
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={createInputChangeHandler("email")}
                          onBlur={createBlurHandler("email")}
                          placeholder="e.g. michael.scott@dundermifflin.com"
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
                        onBlur={createBlurHandler("phone")}
                        placeholder="e.g. +1 123 456 7890"
                        error={errors.phone}
                        touched={touched.phone}
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
                          <option value="US">United States</option>
                          <option value="GB">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="IN">India</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <InputField
                          label="Street Address"
                          name="address"
                          value={formData.address}
                          onChange={createInputChangeHandler("address")}
                          onBlur={createBlurHandler("address")}
                          placeholder="e.g. 1725 Slough Avenue, Suite 200"
                          error={errors.address}
                          touched={touched.address}
                        />
                      </div>
                      <InputField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={createInputChangeHandler("city")}
                        onBlur={createBlurHandler("city")}
                        placeholder="e.g. Scranton"
                        error={errors.city}
                        touched={touched.city}
                      />
                      <InputField
                        label="State / Province"
                        name="state"
                        value={formData.state}
                        onChange={createInputChangeHandler("state")}
                        onBlur={createBlurHandler("state")}
                        placeholder="e.g. Pennsylvania"
                        error={errors.state}
                        touched={touched.state}
                      />
                      <InputField
                        label="Postal / Zip Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={createInputChangeHandler("postalCode")}
                        onBlur={createBlurHandler("postalCode")}
                        placeholder="e.g. 18505"
                        error={errors.postalCode}
                        touched={touched.postalCode}
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
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="saveAddress"
                      name="saveAddress"
                      checked={formData.saveAddress}
                      onChange={createInputChangeHandler("saveAddress")}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="saveAddress"
                      className="text-sm text-gray-700"
                    >
                      Save this information for later
                    </label>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-lg transition-colors shadow-sm hover:shadow active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Pay ${total} Now
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-32">
                <h3 className="text-lg font-bold mb-6 pb-4 border-b border-gray-100">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${total}
                    </span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-blue-900">
                        Secure Checkout
                      </p>
                      <p className="text-xs text-blue-800 leading-relaxed">
                        Powered by PayGlocal. Your data is encrypted and never
                        stored on our servers.
                      </p>
                    </div>
                  </div>
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
