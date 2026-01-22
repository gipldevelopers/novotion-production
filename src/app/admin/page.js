"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Settings,
  UserPlus,
  TrendingUp,
  DollarSign,
  Package,
  Mail,
  Clock,
  CheckCircle,
  ChevronRight,
  Eye,
  RefreshCw,
  User,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    pendingInquiries: 0,
  });

  const [recentPurchases, setRecentPurchases] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState({
    stats: true,
    purchases: true,
    messages: true,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading({ stats: true, purchases: true, messages: true });

      const statsRes = await fetch("/api/admin/dashboard/stats");
      const statsData = await statsRes.json();
      if (statsRes.ok) setStats(statsData);

      const purchasesRes = await fetch("/api/admin/purchases?page=1&limit=4");
      const purchasesData = await purchasesRes.json();
      if (purchasesRes.ok) setRecentPurchases(purchasesData.purchases);

      const messagesRes = await fetch(
        "/api/admin/messages?page=1&limit=3&status=NEW",
      );
      const messagesData = await messagesRes.json();
      if (messagesRes.ok) setRecentMessages(messagesData.messages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading({ stats: false, purchases: false, messages: false });
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-5 rounded-xl border hover:shadow-sm transition-all">
      <div className="flex justify-between mb-3">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">
            {title.includes("Revenue") ? `$${value.toLocaleString()}` : value}
          </h3>
        </div>
        <div
          className={`p-3 rounded-xl ${color.replace("text-", "text-")} bg-opacity-15`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>

      {trend && (
        <div className="flex items-center text-xs text-green-600 gap-1">
          <TrendingUp className="h-3 w-3" />
          {trend} <span className="text-gray-400">from last month</span>
        </div>
      )}
    </div>
  );

  const QuickAction = ({ href, icon: Icon, title, description, color }) => (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:shadow-sm transition"
    >
      <div
        className={`p-3 rounded-xl ${color.replace("text-", "text-")} bg-opacity-15`}
      >
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Store overview & performance</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <RefreshCw
              className={`h-4 w-4 ${Object.values(loading).some((l) => l) && "animate-spin"}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="text-blue-600"
          trend="+12%"
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={Users}
          color="text-emerald-600"
          trend="+24%"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalPurchases}
          icon={Package}
          color="text-indigo-600"
          trend="+8%"
        />
        <StatCard
          title="Pending Inquiries"
          value={stats.pendingInquiries}
          icon={Mail}
          color="text-orange-600"
          trend="+3%"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border rounded-xl">
          <div className="p-4 border-b flex justify-between">
            <h2 className="font-semibold">Recent Orders</h2>
            <Link
              href="/admin/purchases"
              className="text-blue-600 text-sm flex items-center gap-1"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{p.user?.email}</td>
                  <td className="p-3">{p.itemName}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1 text-xs">
                      {p.status === "ACTIVE" && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {p.status === "PENDING" && (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">${p.itemPrice}</td>
                  <td className="p-3 text-center">
                    <Link href={`/admin/users/${p.userId}`}>
                      <Eye className="h-4 w-4 text-gray-500" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Messages */}
          <div className="bg-white border rounded-xl">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Recent Messages</h2>
            </div>

            {recentMessages.map((m) => (
              <Link
                key={m.id}
                href={`/admin/messages/${m.id}`}
                className="flex items-start gap-3 p-4 border-t hover:bg-gray-50"
              >
                <div className="p-2 bg-blue-100 rounded-full">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{m.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{m.message}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white border rounded-xl">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Quick Actions</h2>
            </div>

            <div className="p-4 space-y-3">
              <QuickAction
                href="/admin/users"
                icon={User}
                title="Manage Users"
                description="Create new user"
                color="text-blue-600"
              />
              <QuickAction
                href="/admin/purchases"
                icon={ShoppingBag}
                title="Process Order"
                description="Manage orders"
                color="text-indigo-600"
              />
       
              <QuickAction
                href="/admin/payments"
                icon={CreditCard}
                title="Payments"
                description="Payment setup"
                color="text-purple-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
