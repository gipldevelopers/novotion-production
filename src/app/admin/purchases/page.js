'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    ShoppingBag,
    Search,
    ChevronRight,
    ChevronLeft,
    RefreshCw,
    CreditCard,
    DollarSign,
    TrendingUp,
    ExternalLink,
    User,
    Clock,
    CheckCircle2,
    XCircle,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const PurchasesPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, successfulPayments: 0 });
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

    const fetchPurchases = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/purchases?page=${page}&limit=10`);
            const data = await res.json();
            if (data.purchases) {
                setPurchases(data.purchases);
                setPagination(data.pagination);
                setStats(data.stats);
            }
        } catch (error) {
            toast.error("Failed to load purchases");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPurchases(1);
    }, [fetchPurchases]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchPurchases(newPage);
        }
    };

    return (
        <div className="animate-in fade-in duration-700 max-w-[1400px] mx-auto min-h-screen pb-20 font-sans">
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Purchases Matrix</h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 italic">Financial Inventory & Order Audit</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => fetchPurchases(pagination.page)} className="h-10 px-4 flex items-center gap-2 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync Live
                        </button>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Booked Revenue</p>
                            <p className="text-3xl font-black text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 group-hover:scale-110 transition-transform">
                            <DollarSign className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Deliverables</p>
                            <p className="text-3xl font-black text-gray-900">{stats.totalOrders}</p>
                        </div>
                        <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 group-hover:scale-110 transition-transform">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Successful Payments</p>
                            <p className="text-3xl font-black text-gray-900">${stats.successfulPayments.toLocaleString()}</p>
                        </div>
                        <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 group-hover:scale-110 transition-transform">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                {/* Purchases Table */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-[#F8FAFC]">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Purchased Item</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Customer Entity</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] text-center">Payment Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] text-right">Value</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {!loading ? (
                                    purchases.map((purchase) => (
                                        <tr key={purchase.id} className="hover:bg-slate-50/50 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                                        <ShoppingBag className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-800 text-sm tracking-tight">{purchase.itemName}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{purchase.type || 'Standard Service'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <Link href={`/admin/users/${purchase.user?.id}`} className="flex flex-col group/user">
                                                    <p className="text-xs font-black text-gray-700 group-hover/user:text-blue-600 transition-colors uppercase tracking-tight flex items-center gap-1.5">
                                                        {purchase.user?.name || 'Unknown User'} <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover/user:opacity-100 transition-all" />
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-bold lowercase">{purchase.user?.email}</p>
                                                </Link>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col items-center">
                                                    <div className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-sm ${purchase.payment?.status === 'SUCCESS' ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' : 'text-amber-600 bg-amber-50 border border-amber-100'
                                                        }`}>
                                                        {purchase.payment?.status === 'SUCCESS' ? <CheckCircle2 className="h-2.5 w-2.5" /> : <Clock className="h-2.5 w-2.5 animate-pulse" />}
                                                        {purchase.payment?.status || 'PENDING'}
                                                    </div>
                                                    {purchase.payment?.orderId && (
                                                        <span className="text-[8px] text-gray-400 font-black mt-2 uppercase tracking-tighter opacity-60">ID: {purchase.payment.orderId.substring(0, 10)}...</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <p className="text-sm font-black text-gray-900">${purchase.itemPrice}</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{new Date(purchase.createdAt).toLocaleDateString()}</p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Link href={`/admin/users/${purchase.user?.id}`} className="inline-flex items-center gap-2 text-[10px] font-black text-blue-500 hover:text-blue-700 uppercase tracking-widest transition-all group/btn">
                                                    Audit Entity <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-8 py-6"><div className="h-12 w-48 bg-gray-50 rounded-2xl"></div></td>
                                            <td className="px-8 py-6"><div className="h-10 w-40 bg-gray-50 rounded-xl"></div></td>
                                            <td className="px-8 py-6"><div className="h-6 w-24 bg-gray-50 rounded-lg mx-auto"></div></td>
                                            <td className="px-8 py-6 text-right"><div className="h-10 w-20 bg-gray-50 rounded-xl ml-auto"></div></td>
                                            <td className="px-8 py-6 text-right"><div className="h-10 w-24 bg-gray-50 rounded-xl ml-auto"></div></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {!loading && purchases.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center py-32">
                                <div className="h-20 w-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center border border-gray-100 text-gray-200 mb-6 rotate-12 group hover:rotate-0 transition-transform duration-500">
                                    <ShoppingBag className="h-10 w-10" />
                                </div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">No Purchase Records</h3>
                                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-2 italic">The matrix is currently empty</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="px-8 py-6 border-t border-gray-50 bg-[#F8FAFC]/50 flex items-center justify-between">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            PAGE <span className="text-gray-900">{pagination.page}</span> OF <span className="text-gray-900">{pagination.totalPages}</span> INDEXES
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1 || loading}
                                className="h-10 px-4 flex items-center gap-2 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 disabled:opacity-30 transition-all shadow-sm"
                            >
                                <ChevronLeft className="h-3.5 w-3.5" /> Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages || loading}
                                className="h-10 px-4 flex items-center gap-2 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 disabled:opacity-30 transition-all shadow-sm"
                            >
                                Next <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasesPage;
