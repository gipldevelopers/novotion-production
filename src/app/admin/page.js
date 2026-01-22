"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Settings,
  ArrowRight,
  UserPlus,
  FileText,
  TrendingUp,
  DollarSign,
  Package,
  Mail,
  Clock,
  CheckCircle,
  ChevronRight,
  Eye,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    pendingInquiries: 0,
  });

  useEffect(() => {
    setStats({
      totalUsers: 142,
      totalPurchases: 89,
      totalRevenue: 12450,
      pendingInquiries: 5,
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {title.includes("Revenue")
              ? `$${value.toLocaleString()}`
              : value.toLocaleString()}
          </h3>
        </div>
        <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-')} bg-opacity-10`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs">
          <TrendingUp className="h-3 w-3 text-green-500" />
          <span className="text-green-600 font-medium">{trend}</span>
          <span className="text-gray-400 ml-1">from last month</span>
        </div>
      )}
    </div>
  );

  const recentPurchases = [
    {
      id: "1",
      user: "John Doe",
      email: "john@example.com",
      item: "Custom Elite Package",
      amount: 1000,
      date: "Jan 22, 2024",
      status: "Completed",
    },
    {
      id: "2",
      user: "Sarah Smith",
      email: "sarah@example.com",
      item: "Resume Upgrade Pro",
      amount: 299,
      date: "Jan 21, 2024",
      status: "Pending",
    },
    {
      id: "3",
      user: "Michael Brown",
      email: "michael@example.com",
      item: "Standard Plan (CAP)",
      amount: 3500,
      date: "Jan 21, 2024",
      status: "Completed",
    },
    {
      id: "4",
      user: "Emma Wilson",
      email: "emma@example.com",
      item: "Career Support",
      amount: 499,
      date: "Jan 20, 2024",
      status: "Processing",
    },
  ];

  const recentMessages = [
    {
      id: "1",
      sender: "Alex Rivera",
      subject: "Inquiry about RPO services",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      sender: "Elena G.",
      subject: "Career Support help needed",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      sender: "Global Tech Inc",
      subject: "Enterprise Package inquiry",
      time: "1 day ago",
      read: true,
    },
  ];

  const QuickAction = ({ href, icon: Icon, title, description, color }) => (
    <Link
      href={href}
      className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all flex items-start gap-3"
    >
      <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-')} bg-opacity-10 shrink-0`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-gray-500 mt-1 truncate">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 rounded-lg transition-colors">
            + New Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="text-blue-600"
          trend="+12.5%"
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          color="text-emerald-600"
          trend="+24.3%"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalPurchases}
          icon={Package}
          color="text-indigo-600"
          trend="+8.2%"
        />
        <StatCard
          title="Pending Inquiries"
          value={stats.pendingInquiries}
          icon={Mail}
          color="text-orange-600"
          trend="+3.1%"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <p className="text-sm text-gray-500">Latest transactions</p>
              </div>
              <Link
                href="/admin/purchases"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentPurchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{purchase.user}</p>
                          <p className="text-xs text-gray-500">{purchase.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">{purchase.item}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600">{purchase.date}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            purchase.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : purchase.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {purchase.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-semibold text-gray-900">${purchase.amount.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-6">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Recent Messages */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
                  <p className="text-sm text-gray-500">Customer inquiries</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  3 new
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentMessages.map((message) => (
                <Link
                  key={message.id}
                  href="/admin/messages"
                  className={`block p-4 hover:bg-gray-50 transition-colors ${!message.read ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${message.read ? "bg-gray-100" : "bg-blue-100"} shrink-0`}>
                      <MessageSquare className={`h-4 w-4 ${message.read ? "text-gray-600" : "text-blue-600"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{message.sender}</p>
                          <p className="text-sm text-gray-600 truncate mt-1">{message.subject}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                          <span className="text-xs text-gray-500 whitespace-nowrap">{message.time}</span>
                          {!message.read && (
                            <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-medium rounded">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-gray-200">
              <Link
                href="/admin/messages"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1"
              >
                View all messages
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-500">Frequently used actions</p>
            </div>
            <div className="p-4 space-y-3">
              <QuickAction
                href="/admin/users"
                icon={UserPlus}
                title="Add New User"
                description="Create a new user account"
                color="text-blue-600"
              />
              <QuickAction
                href="/admin/purchases"
                icon={ShoppingBag}
                title="Process Order"
                description="Manage customer orders"
                color="text-indigo-600"
              />
              <QuickAction
                href="/admin/settings"
                icon={Settings}
                title="System Settings"
                description="Update platform configuration"
                color="text-emerald-600"
              />
              <QuickAction
                href="/admin/payments"
                icon={CreditCard}
                title="Payment Settings"
                description="Configure payment methods"
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