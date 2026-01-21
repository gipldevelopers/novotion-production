"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Info,
  AlertCircle,
  X,
  CheckCircle,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";

const CartPage = () => {
  const { cart, removeFromCart, getCartTotal, isLoaded } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
          <p className="text-sm font-medium text-gray-500">
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`, {
      description: "Item has been removed from your cart",
    });
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const getServiceType = (item) => {
    if (item.type === "package") return "Career Package";
    if (item.type === "career-plan") return "Career Plan";
    if (item.type === "pro-service") return "Pro Service";
    if (item.name.includes("Resume")) return "Resume Service";
    if (item.name.includes("LinkedIn")) return "LinkedIn Service";
    if (item.name.includes("Interview")) return "Interview Service";
    if (item.name.includes("Strategy")) return "Strategy Service";
    return "Professional Service";
  };

  const getServiceColor = (item) => {
    if (item.type === "package")
      return "bg-blue-50 text-blue-700 border-blue-200";
    if (item.type === "career-plan")
      return "bg-purple-50 text-purple-700 border-purple-200";
    if (item.type === "pro-service")
      return "bg-green-50 text-green-700 border-green-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getFeatures = (item) => {
    // Default features based on item type
    if (item.type === "package") {
      return [
        "Complete career assessment",
        "Personalized strategy session",
        "Ongoing support and guidance",
        "Progress tracking and reports",
        "Access to exclusive resources",
      ];
    }
    if (item.type === "career-plan") {
      return [
        "One-on-one consultation",
        "Custom career roadmap",
        "Interview preparation",
        "Resume optimization",
        "Job search strategy",
      ];
    }
    return [
      "Professional quality guarantee",
      "Timely delivery",
      "Expert consultation",
      "Follow-up support",
    ];
  };

  const getDeliveryInfo = (item) => {
    if (item.type === "package") return "3-5 business days";
    if (item.type === "career-plan") return "Starts within 24 hours";
    if (item.type === "pro-service") return "2-3 business days";
    return "Standard delivery schedule";
  };

  const getSupportInfo = (item) => {
    if (item.type === "package") return "30-day comprehensive support";
    if (item.type === "career-plan") return "Ongoing mentorship";
    return "Standard email support";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cart.length === 0
              ? "Your cart is empty"
              : `You have ${cart.length} ${
                  cart.length === 1 ? "item" : "items"
                } in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Browse our professional services to find what you need for your
              career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/services/pro-services">
                <Button className="h-11 px-6">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Explore Services
                </Button>
              </Link>
              <Link href="/services/career-packages">
                <Button variant="outline" className="h-11 px-6 border-gray-300">
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Service Icon */}
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-5 w-5 text-gray-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded border ${getServiceColor(
                                  item
                                )}`}
                              >
                                {getServiceType(item)}
                              </span>
                              {item.type === "career-plan" && (
                                <span className="text-xs font-medium px-2 py-1 rounded bg-yellow-50 text-yellow-700 border border-yellow-200">
                                  4 Installments
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">
                              ${item.price}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-gray-400 line-through">
                                ${item.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.description || "Professional career service"}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleViewDetails(item)}
                              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                              <Info className="h-4 w-4" />
                              View Details
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                $
                                {(item.price * (item.quantity || 1)).toFixed(2)}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-sm text-gray-500">
                                  ${item.price} each
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleRemove(item.id, item.name)}
                              className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <AlertCircle className="h-3 w-3" />
                            Delivery: {getDeliveryInfo(item)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link
                  href="/services/pro-services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Packages Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Need multiple services?
                    </p>
                    <p className="text-xs text-blue-700">
                      Check out our career packages for bundled savings and
                      comprehensive solutions.
                    </p>
                    <Link
                      href="/services/career-packages"
                      className="inline-block mt-2"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        View Packages
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">${total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-green-600 font-medium">Included</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${total}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {cart.reduce(
                        (sum, item) => sum + (item.quantity || 1),
                        0
                      )}{" "}
                      items
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="/services/payment">
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white mb-3">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  {/* Security Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Secure Payment
                          </p>
                          <p className="text-xs text-gray-500">
                            256-bit encryption
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Fast Activation
                          </p>
                          <p className="text-xs text-gray-500">
                            Starts within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Need help?</span>
                      <Link
                        href="/contact"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Contact Support
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Note */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      Your cart is saved
                    </p>
                    <p className="text-xs text-gray-600">
                      Items are saved for 30 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Item Details Modal */}
        {showDetailsModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Service Details
                  </h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Service Info */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {selectedItem.name}
                        </h4>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${getServiceColor(
                            selectedItem
                          )}`}
                        >
                          {getServiceType(selectedItem)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {selectedItem.description ||
                        "Professional career service designed to accelerate your growth."}
                    </p>
                  </div>

                  {/* Price Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Price</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ${selectedItem.price}
                        </div>
                        {selectedItem.originalPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            ${selectedItem.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {getFeatures(selectedItem).map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Delivery</span>
                      </div>
                      <p className="text-sm font-medium">
                        {getDeliveryInfo(selectedItem)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>Support</span>
                      </div>
                      <p className="text-sm font-medium">
                        {getSupportInfo(selectedItem)}
                      </p>
                    </div>
                    {selectedItem.type === "career-plan" && (
                      <div className="col-span-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CreditCard className="h-4 w-4" />
                          <span>Payment Plan</span>
                        </div>
                        <p className="text-sm font-medium">
                          4 monthly installments available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setShowDetailsModal(false)}
                        variant="outline"
                        className="flex-1 border-gray-300"
                      >
                        Close
                      </Button>
                      <Link href="/services/payment" className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Checkout Now
                        </Button>
                      </Link>
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
