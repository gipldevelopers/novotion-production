'use client';

import React, { useState, useEffect } from 'react';
import {
    Users,
    ShoppingBag,
    CreditCard,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Package,
    Activity,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPurchases: 0,
        totalRevenue: 0,
        activeServices: 0
    });

    // Mock stats for now - you can replace with API calls in the future
    useEffect(() => {
        setStats({
            totalUsers: 142,
            totalPurchases: 89,
            totalRevenue: 12450,
            activeServices: 12
        });
    }, []);

    const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${color} bg-opacity-10 transition-transform group-hover:scale-110 duration-300`}>
                    <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {trendValue}
                </div>
            </div>
            <div>
                <p className="text-slate-500 text-sm font-semibold mb-1">{title}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    {title.includes('Revenue') ? `$${value.toLocaleString()}` : value.toLocaleString()}
                </h3>
            </div>
        </div>
    );

    const recentPurchases = [
        { id: '1', user: 'John Doe', item: 'Custom Elite Package', amount: 1000, date: '2026-01-22', status: 'COMPLETED' },
        { id: '2', user: 'Sarah Smith', item: 'Resume Upgrade Pro', amount: 299, date: '2026-01-21', status: 'PENDING' },
        { id: '3', user: 'Michael Brown', item: 'Standard Plan (CAP)', amount: 3500, date: '2026-01-21', status: 'COMPLETED' },
        { id: '4', user: 'Emily Davis', item: 'Custom Starter Package', amount: 500, date: '2026-01-20', status: 'COMPLETED' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
                <p className="text-slate-500 font-medium">Welcome back! Here's what's happening with Novotion today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    trend="up"
                    trendValue="+12%"
                    color="bg-blue-600"
                />
                <StatCard
                    title="Total Purchases"
                    value={stats.totalPurchases}
                    icon={ShoppingBag}
                    trend="up"
                    trendValue="+8%"
                    color="bg-indigo-600"
                />
                <StatCard
                    title="Total Revenue"
                    value={stats.totalRevenue}
                    icon={CreditCard}
                    trend="up"
                    trendValue="+24%"
                    color="bg-emerald-600"
                />
                <StatCard
                    title="Active Services"
                    value={stats.activeServices}
                    icon={Activity}
                    trend="down"
                    trendValue="-2%"
                    color="bg-orange-600"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity Table */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Purchases</h3>
                        <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentPurchases.map((purchase) => (
                                    <tr key={purchase.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                    {purchase.user.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">{purchase.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 text-sm">{purchase.item}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1">
                                                    <Clock className="h-3 w-3" /> {purchase.date}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 font-black text-slate-900 text-sm">${purchase.amount}</td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${purchase.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                }`}>
                                                {purchase.status === 'COMPLETED' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                                {purchase.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Admin Quick Actions & Performance */}
                <div className="space-y-8">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                        <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Quick Actions</h3>
                        <div className="grid gap-4">
                            <button className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 group">
                                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <span className="font-bold text-sm">Manage All Users</span>
                            </button>
                            <button className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 text-slate-700 hover:bg-indigo-600 hover:text-white transition-all duration-300 group">
                                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <ShoppingBag className="h-5 w-5 text-indigo-600" />
                                </div>
                                <span className="font-bold text-sm">New Service Order</span>
                            </button>
                            <button className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 text-slate-700 hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <CreditCard className="h-5 w-5 text-emerald-600" />
                                </div>
                                <span className="font-bold text-sm">Financial Reports</span>
                            </button>
                        </div>
                    </div>

                    {/* Sales Performance Target */}
                    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-2 tracking-tight">Monthly Target</h3>
                            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-8">Revenue Goal: $25,000</p>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-3xl font-black">$12,450</span>
                                    <span className="text-sm font-bold text-blue-300">50% Achieved</span>
                                </div>
                                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ width: '50%' }}></div>
                                </div>
                                <p className="text-[10px] text-blue-200 font-medium leading-relaxed italic">
                                    You are $12,550 away from your goal. Keep pushing for that 100% mark!
                                </p>
                            </div>
                        </div>
                        <TrendingUp className="absolute -right-6 -bottom-6 h-32 w-32 text-white/5 rotate-12" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
