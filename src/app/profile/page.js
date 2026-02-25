"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Mail, Phone, MapPin, Lock, Save, Loader2, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            city: data.user.city || "",
            state: data.user.state || "",
            postalCode: data.user.postalCode || "",
            country: data.user.country || "",
            password: "",
          });
        } else {
          router.push("/auth/login?callbackUrl=/profile");
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    // Regex for international phone numbers: supports +, spaces, dashes, parentheses and 10-15 digits
    const re = /^\+?[0-9\s\-()]{10,20}$/;
    return re.test(String(phone));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user changes input
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        setUser(data.user);
        setFormData(prev => ({ ...prev, password: "" }));
      }
    } catch (err) {
      toast.error("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-500 font-medium text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">

          <div className="flex flex-col md:flex-row gap-8">

            {/* Left Sidebar: Profile Summary */}
            <div className="md:w-1/3 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
                <div className="h-24 w-24 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 truncate">{user?.name || "Account User"}</h2>
                <p className="text-sm text-gray-500 truncate mb-6">{user?.email}</p>
                <div className="pt-6 border-t border-gray-50 space-y-4">
                  <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold" onClick={() => router.push('/my-services')}>
                    <ShoppingBag className="h-4 w-4" />
                    View My Services
                  </Button>
                </div>
              </div>

              <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <ShieldCheck className="h-20 w-20 absolute -right-4 -bottom-4 opacity-20 rotate-12" />
                <h3 className="text-lg font-bold mb-2">Secure Account</h3>
                <p className="text-blue-100 text-sm">Your information is encrypted and visible only to you.</p>
              </div>
            </div>

            {/* Right: Profile Form */}
            <div className="md:flex-1">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">Manage Your Account</h1>
                  <p className="text-gray-500 mt-1">Update your personal details, address, and password</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4" /> Full Name
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full h-12 px-4 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100'} focus:border-blue-600 transition-all outline-none text-sm`}
                      />
                      {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Phone Number
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        className={`w-full h-12 px-4 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100'} focus:border-blue-600 transition-all outline-none text-sm`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Home Address
                    </label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. 123 Main St"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">City</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">State / Province</label>
                      <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Postal Code</label>
                      <input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Country</label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-sm"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-50">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 font-bold text-red-600">
                        <Lock className="h-4 w-4" /> Change Password
                      </label>
                      <p className="text-xs text-gray-500 mb-2">Leave blank if you don't want to change it</p>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-sm"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={saving}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all text-lg"
                  >
                    {saving ? (
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Save className="h-5 w-5" /> Update Profile
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}