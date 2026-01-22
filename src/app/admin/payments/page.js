'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    CreditCard,
    Search,
    ChevronRight,
    ChevronLeft,
    RefreshCw,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    TrendingUp,
    Filter,
    MoreVertical,
    Eye
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const PaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState({ 
        totalRevenue: 0, 
        successCount: 0,
        pendingCount: 0,
        failedCount: 0
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [pagination, setPagination] = useState({ 
        page: 1, 
        limit: 10, 
        total: 0, 
        totalPages: 0 
    });

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
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter, fetchPayments]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchPayments(newPage);
        }
    };

    const totalSuccessRevenue = payments
        .filter(p => p.status === 'SUCCESS')
        .reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
                    <p className="text-gray-600 mt-1">Monitor and manage payment transactions</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                        Export Payments
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 rounded-lg transition-colors">
                        Process Refund
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">${totalSuccessRevenue.toLocaleString()}</p>
                        </div>
                        <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Successful payments</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Successful</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.successCount}</p>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Completed transactions</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.pendingCount}</p>
                        </div>
                        <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                        <Clock className="h-4 w-4" />
                        <span>Awaiting processing</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Failed</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.failedCount}</p>
                        </div>
                        <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span>Failed transactions</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by order ID or customer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-w-[140px]"
                        >
                            <option value="">All Status</option>
                            <option value="SUCCESS">Success</option>
                            <option value="PENDING">Pending</option>
                            <option value="FAILED">Failed</option>
                        </select>
                        <button
                            onClick={() => fetchPayments(1)}
                            className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={loading}
                        >
                            <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
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
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {!loading ? (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <CreditCard className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                                                        {payment.orderId}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{payment.method || 'Card'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {payment.user ? (
                                                <Link href={`/admin/users/${payment.user.id}`} className="group">
                                                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                                        {payment.user.name || 'Unknown User'}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{payment.user.email}</p>
                                                </Link>
                                            ) : (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Unknown User</p>
                                                    <p className="text-xs text-gray-500">User not found</p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm text-gray-600">
                                                {new Date(payment.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(payment.createdAt).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                payment.status === 'SUCCESS'
                                                    ? 'bg-green-100 text-green-800'
                                                    : payment.status === 'PENDING'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {payment.status === 'SUCCESS' ? (
                                                    <>
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Success
                                                    </>
                                                ) : payment.status === 'PENDING' ? (
                                                    <>
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        Pending
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        Failed
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm font-semibold text-gray-900">${payment.amount}</p>
                                            <p className="text-xs text-gray-500">{payment.currency || 'USD'}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                                                    View Details
                                                </button>
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                                <div className="h-3 w-40 bg-gray-200 rounded"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-8 w-28 bg-gray-200 rounded-lg"></div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    
                    {!loading && payments.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <CreditCard className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                {searchTerm || statusFilter
                                    ? "Try adjusting your search or filter to find what you're looking for."
                                    : "No payment records found."}
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                            <span className="font-medium">
                                {Math.min(pagination.page * pagination.limit, pagination.total)}
                            </span>{' '}
                            of <span className="font-medium">{pagination.total}</span> payments
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1 || loading}
                                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-1">
                                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                                    const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, pagination.page - 2)) + i;
                                    if (pageNum > pagination.totalPages) return null;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                                                pagination.page === pageNum
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            } transition-colors`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages || loading}
                                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentsPage;