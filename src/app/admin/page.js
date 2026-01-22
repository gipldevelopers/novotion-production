'use client';

import React, { useState, useEffect } from 'react';
import {
    Users,
    ShoppingBag,
    CreditCard,
    MessageSquare,
    Settings,
    ArrowRight,
    UserPlus,
    FileText,
    HelpCircle
} from 'lucide-react';
import Link from 'next/link';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPurchases: 0,
        totalRevenue: 0,
        pendingInquiries: 0
    });

    useEffect(() => {
        setStats({
            totalUsers: 142,
            totalPurchases: 89,
            totalRevenue: 12450,
            pendingInquiries: 5
        });
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{title}</span>
                <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 leading-none">
                {title.includes('Revenue') ? `$${value.toLocaleString()}` : value.toLocaleString()}
            </h3>
        </div>
    );

    const recentPurchases = [
        { id: '1', user: 'John Doe', item: 'Custom Elite Package', amount: 1000, date: 'Jan 22', status: 'Completed' },
        { id: '2', user: 'Sarah Smith', item: 'Resume Upgrade Pro', amount: 299, date: 'Jan 21', status: 'Pending' },
        { id: '3', user: 'Michael Brown', item: 'Standard Plan (CAP)', amount: 3500, date: 'Jan 21', status: 'Completed' },
    ];

    const recentMessages = [
        { id: '1', sender: 'Alex Rivera', subject: 'Inquiry about RPO', time: '2h ago' },
        { id: '2', sender: 'Elena G.', subject: 'Career Support help', time: '5h ago' },
        { id: '3', sender: 'Global Tech', subject: 'Enterprise Package', time: '1d ago' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Simple Light Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 text-xs">Manage your business operations</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="h-9 px-4 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all">
                        Audit Log
                    </button>
                    <button className="h-9 px-4 rounded-lg bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 transition-all shadow-sm">
                        New Order
                    </button>
                </div>
            </div>

            {/* Light Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Users" value={stats.totalUsers} icon={Users} color="text-blue-500" />
                <StatCard title="Revenue" value={stats.totalRevenue} icon={CreditCard} color="text-emerald-500" />
                <StatCard title="Orders" value={stats.totalPurchases} icon={ShoppingBag} color="text-indigo-500" />
                <StatCard title="Inquiries" value={stats.pendingInquiries} icon={MessageSquare} color="text-orange-500" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Clean Table Section */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-800">Recent Sales</h3>
                        <Link href="/admin/purchases" className="text-[11px] font-medium text-blue-600 hover:text-blue-700">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-3 text-[10px] font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-[10px] font-medium text-gray-400 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-[10px] font-medium text-gray-400 uppercase tracking-wider text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentPurchases.map((purchase) => (
                                    <tr key={purchase.id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{purchase.user}</p>
                                                <p className="text-[10px] text-gray-400">{purchase.date}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-gray-600">{purchase.item}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="text-sm font-semibold text-gray-900">${purchase.amount}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Clean Sidebar Modules */}
                <div className="space-y-6">
                    {/* Inquiries List */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <h3 className="text-sm font-semibold text-gray-800 mb-5">Pending Messages</h3>
                        <div className="space-y-4">
                            {recentMessages.map((msg) => (
                                <div key={msg.id} className="flex flex-col gap-1 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-semibold text-gray-900">{msg.sender}</p>
                                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 truncate">{msg.subject}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <Link href="/admin/users" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <UserPlus className="h-4 w-4 text-blue-500" />
                                    <span className="text-xs font-medium text-gray-700">Add New User</span>
                                </div>
                                <ArrowRight className="h-3 w-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </Link>
                            <Link href="/admin/settings" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <Settings className="h-4 w-4 text-emerald-500" />
                                    <span className="text-xs font-medium text-gray-700">Platform Settings</span>
                                </div>
                                <ArrowRight className="h-3 w-3 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                            </Link>
                            <Link href="/api/docs" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-indigo-500" />
                                    <span className="text-xs font-medium text-gray-700">System Logs</span>
                                </div>
                                <ArrowRight className="h-3 w-3 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
