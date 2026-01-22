'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    CreditCard,
    Search,
    ChevronRight,
    ChevronLeft,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowRight,
    Filter,
    DollarSign,
    TrendingUp,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const PaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState({ totalRevenue: 0, successCount: 0 });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

    const fetchPayments = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                search: searchTerm,
                status: statusFilter
            });
            const res = await fetch(`/api/admin/payments?${query.toString()}`);
            const data = await res.json();
            if (data.payments) {
                setPayments(data.payments);
                setPagination(data.pagination);
                setStats(data.stats);
            }
        } catch (error) {
            toast.error("Failed to load payment records");
        } finally {
            setLoading(false);
        }
    }, [searchTerm, statusFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPayments(1);
        }, 300); // Debounce search
        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter, fetchPayments]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchPayments(newPage);
        }
    };

    return (
        <div className="animate-in fade-in duration-700 max-w-[1400px] mx-auto min-h-screen pb-20 font-sans">
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Transaction Ledger</h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 italic">Financial Velocity & Global Settlements</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                            <Search className="h-4 w-4 text-gray-300" />
                            <input
                                type="text"
                                placeholder="Search Order ID / User..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none text-[11px] font-bold text-gray-600 w-56 uppercase tracking-widest"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="h-10 px-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-50 transition-all shadow-sm text-gray-500 cursor-pointer"
                        >
                            <option value="">All Statuses</option>
                            <option value="SUCCESS">Success Only</option>
                            <option value="PENDING">Pending Only</option>
                            <option value="FAILED">Failed Records</option>
                        </select>

                        <button onClick={() => fetchPayments(1)} className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                            <RefreshCw className={`h-3.5 w-3.5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-emerald-100 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Settled Revenue</p>
                            <p className="text-4xl font-black text-gray-900 leading-none">${stats.totalRevenue.toLocaleString()}</p>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified Inflow</span>
                            </div>
                        </div>
                        <div className="h-16 w-16 rounded-[2.5rem] bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 group-hover:scale-110 transition-transform">
                            <DollarSign className="h-8 w-8" />
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Processed Transactions</p>
                            <p className="text-4xl font-black text-gray-900 leading-none">{stats.successCount}</p>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Global Settlements</span>
                            </div>
                        </div>
                        <div className="h-16 w-16 rounded-[2.5rem] bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 group-hover:scale-110 transition-transform">
                            <TrendingUp className="h-8 w-8" />
                        </div>
                    </div>
                </div>

                {/* Payments Table */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-[#F8FAFC]">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Transaction ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Sender Entity</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] text-center">Status Matrix</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] text-right">Settlement</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] text-right">Operation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {!loading ? (
                                    payments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-slate-50/50 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-11 w-11 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm outline outline-1 outline-transparent group-hover:outline-blue-100">
                                                        <CreditCard className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900 text-sm tracking-tighter uppercase">{payment.orderId.substring(0, 15)}...</p>
                                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{new Date(payment.createdAt).toLocaleDateString()} @ {new Date(payment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <Link href={`/admin/users/${payment.user?.id}`} className="flex flex-col group/user">
                                                    <p className="text-xs font-black text-gray-800 group-hover/user:text-blue-600 transition-colors uppercase tracking-tight flex items-center gap-2">
                                                        {payment.user?.name || 'Anonymous User'} <ExternalLink className="h-3 w-3 opacity-0 group-hover/user:opacity-100 transition-all" />
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-bold lowercase">{payment.user?.email}</p>
                                                </Link>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm ${payment.status === 'SUCCESS' ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' :
                                                            payment.status === 'FAILED' ? 'text-red-500 bg-red-50 border border-red-100' :
                                                                'text-amber-600 bg-amber-50 border border-amber-100'
                                                        }`}>
                                                        {payment.status === 'SUCCESS' ? <CheckCircle2 className="h-2.5 w-2.5" /> :
                                                            payment.status === 'FAILED' ? <XCircle className="h-2.5 w-2.5" /> :
                                                                <Clock className="h-2.5 w-2.5 animate-pulse" />}
                                                        {payment.status}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <p className="text-sm font-black text-gray-900">${payment.amount}</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{payment.currency}</p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Link href={`/admin/users/${payment.user?.id}`} className="inline-flex items-center gap-2 text-[10px] font-black text-blue-500 hover:text-blue-700 uppercase tracking-widest transition-all group/btn">
                                                    Trace Entity <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-8 py-6"><div className="h-12 w-56 bg-gray-50 rounded-2xl"></div></td>
                                            <td className="px-8 py-6"><div className="h-10 w-40 bg-gray-50 rounded-xl"></div></td>
                                            <td className="px-8 py-6"><div className="h-7 w-28 bg-gray-50 rounded-xl mx-auto"></div></td>
                                            <td className="px-8 py-6 text-right"><div className="h-10 w-24 bg-gray-50 rounded-xl ml-auto"></div></td>
                                            <td className="px-8 py-6 text-right"><div className="h-10 w-28 bg-gray-50 rounded-xl ml-auto"></div></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {!loading && payments.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center py-32">
                                <div className="h-20 w-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center border border-gray-100 text-gray-200 mb-6 group hover:rotate-12 transition-transform duration-500">
                                    <CreditCard className="h-10 w-10" />
                                </div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] font-sans">Zero Financial Traces</h3>
                                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-2 italic font-sans text-center px-10">Adjust filters or search parameters to locate specifically settled records.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="px-8 py-6 border-t border-gray-50 bg-[#F8FAFC]/50 flex items-center justify-between">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            SHOWING <span className="text-gray-900">{payments.length}</span> OF <span className="text-gray-900">{pagination.total}</span> AUDITS
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

export default PaymentsPage;
