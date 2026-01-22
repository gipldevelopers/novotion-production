'use client';

import React, { useState, useEffect, use } from 'react';
import {
    Mail,
    Phone,
    Calendar,
    ShoppingBag,
    CreditCard,
    ChevronLeft,
    MessageCircle,
    MapPin,
    CheckCircle2,
    XCircle,
    ShieldCheck,
    Lock,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const UserDetailPage = ({ params }) => {
    const { id } = use(params);
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
                    router.push('/admin/users');
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="h-10 w-10 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessing Profile Matrix...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 px-6">
            {/* Header / Navigation */}
            <div className="mb-10 pt-6">
                <Link
                    href="/admin/users"
                    className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-blue-600 transition-all uppercase tracking-[0.2em] group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Matrix
                </Link>
                <div className="mt-8 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Identity Profile</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1.5 italic">Consolidated User Intelligence</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Administrative Context</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Profile Card Cluster */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ShieldCheck className="h-5 w-5 text-blue-100" />
                        </div>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="h-24 w-24 rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center text-3xl font-black mb-6 border border-white shadow-2xl shadow-blue-100/50 relative transform group-hover:scale-105 transition-transform duration-500">
                                {user.name?.[0] || user.email?.[0]?.toUpperCase()}
                                <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-blue-600 rounded-[0.75rem] flex items-center justify-center text-white border-4 border-white shadow-lg">
                                    <ShieldCheck className="h-4 w-4" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-1">{user.name || 'Anonymous User'}</h2>
                            <p className="text-xs text-gray-400 font-bold mb-6 lowercase tracking-tight">{user.email}</p>

                            <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2 ${user.role === 'ADMIN' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                }`}>
                                {user.role} Status
                            </div>
                        </div>

                        <div className="mt-10 space-y-3 pt-10 border-t border-gray-50/50">
                            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group/item">
                                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/item:bg-white group-hover/item:shadow-sm transition-all text-gray-300 group-hover/item:text-blue-500">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Contact</p>
                                    <p className="text-xs font-bold text-gray-700 truncate">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group/item">
                                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/item:bg-white group-hover/item:shadow-sm transition-all text-gray-300 group-hover/item:text-blue-500">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Cellular</p>
                                    <p className="text-xs font-bold text-gray-700">{user.phone || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group/item">
                                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover/item:bg-white group-hover/item:shadow-sm transition-all text-gray-300 group-hover/item:text-blue-500">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Since</p>
                                    <p className="text-xs font-bold text-gray-700">{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
                        <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                            Quick Actions
                        </h3>
                        <div className="grid gap-3">
                            <a href={`mailto:${user.email}`} className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-100">
                                <Mail className="h-3.5 w-3.5" /> Email Entity
                            </a>
                            <button className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                                <Lock className="h-3.5 w-3.5" /> Access Control
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Analytics Column */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Compact Summary */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group">
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lifetime Investment</p>
                                    <p className="text-4xl font-black text-gray-900 leading-none tracking-tighter">${user.payments?.reduce((acc, curr) => acc + (curr.status === 'SUCCESS' ? curr.amount : 0), 0).toFixed(2)}</p>
                                </div>
                                <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 group-hover:scale-110 transition-transform duration-500">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-1.5">
                                <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500`} />
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified Revenue</span>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group">
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Service Utilization</p>
                                    <p className="text-4xl font-black text-gray-900 leading-none tracking-tighter">{user._count?.purchases || 0}</p>
                                </div>
                                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 group-hover:scale-110 transition-transform duration-500">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-1.5">
                                <span className={`h-1.5 w-1.5 rounded-full bg-blue-500`} />
                                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Active Assets</span>
                            </div>
                        </div>
                    </div>

                    {/* Registry Block */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.25em]">Purchased Asset Logs</h3>
                            <ShoppingBag className="h-3.5 w-3.5 text-gray-300" />
                        </div>

                        {user.purchases?.length > 0 ? (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/50">
                                        <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Descriptor</th>
                                        <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Timestamp</th>
                                        <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Valuation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {user.purchases.map((p) => (
                                        <tr key={p.id} className="hover:bg-blue-50/20 transition-all duration-300 group">
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-gray-800 text-sm tracking-tight group-hover:text-blue-600 transition-colors uppercase">{p.itemName}</p>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{p.type || 'Standard'}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-[10px] font-bold text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className="text-[13px] font-black text-gray-900 group-hover:scale-110 inline-block transition-transform">${p.itemPrice}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-24 text-center">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Nil Inventory Records</p>
                            </div>
                        )}
                    </div>

                    {/* Dynamic Entity Registry (Billing) */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-200">
                        <div className="relative z-10">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 flex items-center gap-3 opacity-60">
                                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-ping" /> Entity Billing Master
                            </h3>
                            <div className="grid md:grid-cols-2 gap-12 relative z-10">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Registered Address</p>
                                    <p className="text-sm font-bold leading-relaxed max-w-xs">{user.address || 'Not registered in portal'}</p>
                                    <p className="text-xs text-slate-400 font-medium">{user.city} {user.postalCode}</p>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">State Protocol</p>
                                        <p className="text-sm font-bold uppercase tracking-widest">{user.state || 'Global'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Global Region</p>
                                        <p className="text-sm font-bold uppercase tracking-widest">{user.country || 'International'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MapPin className="absolute -right-16 -bottom-16 h-64 w-64 text-white/5 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000" />
                    </div>

                    {/* Modular Transaction Log */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.25em]">Transaction Ledger</h3>
                            <CreditCard className="h-3.5 w-3.5 text-gray-300" />
                        </div>
                        <div className="p-8">
                            {user.payments?.length > 0 ? (
                                <div className="grid gap-3">
                                    {user.payments.map((p) => (
                                        <div key={p.id} className="flex items-center justify-between p-6 rounded-3xl border border-gray-50 bg-[#F8FAFC]/50 transition-all hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-50 group">
                                            <div className="flex items-center gap-6">
                                                <div className={`h-12 w-12 rounded-[1.25rem] flex items-center justify-center transition-all ${p.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                                                    {p.status === 'SUCCESS' ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black text-gray-900 tracking-tight uppercase mb-0.5">{p.orderId}</p>
                                                    <p className="text-[9px] text-gray-400 font-bold uppercase">{new Date(p.createdAt).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-black text-gray-900 leading-none mb-1">${p.amount}</p>
                                                <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${p.status === 'SUCCESS' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                    {p.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center">
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">No financial velocity detected</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
