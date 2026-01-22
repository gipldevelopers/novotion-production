"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  CreditCard,
  MessageCircle,
  MapPin,
  CheckCircle,
  Clock,
  Shield,
  User,
  DollarSign,
  Package,
  Globe,
  Home,
  ArrowLeft,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const UserDetailPage = () => {
  const { id } = useParams("id");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/admin/users/${id}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          toast.error(data.error || "User not found");
          router.push("/admin/users");
        }
      } catch (error) {
        toast.error("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const totalSpent =
    user.payments?.reduce((sum, payment) => {
      return payment.status === "SUCCESS" ? sum + payment.amount : sum;
    }, 0) || 0;

  const totalPurchases = user.purchases?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/users"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
            <p className="text-gray-600">View and manage user information</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
            Edit User
          </button>
          <button className="px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-700 rounded-lg transition-colors">
            Suspend
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - User Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                {user.name?.[0] || user.email?.[0]?.toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {user.name || "No Name"}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === "ADMIN"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.role === "ADMIN" ? (
                  <>
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </>
                ) : (
                  <>
                    <User className="h-3 w-3 mr-1" />
                    User
                  </>
                )}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.phone}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${user.email}`}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full">
                <MessageCircle className="h-4 w-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Verified payments</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Total Purchases</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalPurchases}
                  </p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-indigo-600">
                <ShoppingBag className="h-4 w-4" />
                <span>Active orders</span>
              </div>
            </div>
          </div>

          {/* Recent Purchases */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Purchases
              </h3>
              <p className="text-sm text-gray-500">User's order history</p>
            </div>
            <div className="overflow-x-auto">
              {user.purchases?.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {user.purchases.map((purchase) => (
                      <tr
                        key={purchase.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <p className="text-sm font-medium text-gray-900">
                            {purchase.itemName}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-600">
                            {new Date(purchase.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm font-semibold text-gray-900">
                            ${purchase.itemPrice}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-6 w-6 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No purchases yet
                  </h4>
                  <p className="text-gray-500">
                    This user hasn't made any purchases.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Payment History
              </h3>
              <p className="text-sm text-gray-500">
                User's transaction records
              </p>
            </div>
            <div className="p-6">
              {user.payments?.length > 0 ? (
                <div className="space-y-4">
                  {user.payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            payment.status === "SUCCESS"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {payment.status === "SUCCESS" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Order #{payment.orderId}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(payment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${payment.amount}
                        </p>
                        <span
                          className={`text-xs font-medium ${
                            payment.status === "SUCCESS"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No payment history
                  </h4>
                  <p className="text-gray-500">
                    No payment records found for this user.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          {(user.address || user.city || user.country) && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Address Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Home className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Address
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                  {user.city && (
                    <p className="text-sm text-gray-600">
                      {user.city}, {user.state} {user.postalCode}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Country
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.country || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
