'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    MessageSquare,
    Search,
    ChevronRight,
    ChevronLeft,
    RefreshCw,
    Clock,
    CheckCircle,
    AlertCircle,
    Mail,
    Phone,
    User,
    Filter,
    MoreVertical,
    Eye
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [stats, setStats] = useState({ 
        newCount: 0, 
        inProgressCount: 0, 
        resolvedCount: 0,
        total: 0 
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

    const fetchMessages = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                search: searchTerm,
                status: statusFilter
            });
            const res = await fetch(`/api/admin/messages?${query.toString()}`);
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages);
                setPagination(data.pagination);
                setStats(data.stats);
            }
        } catch (error) {
            toast.error("Failed to load messages");
        } finally {
            setLoading(false);
        }
    }, [searchTerm, statusFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMessages(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter, fetchMessages]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchMessages(newPage);
        }
    };

    const newMessages = messages.filter(m => m.status === 'NEW').length;
    const inProgressMessages = messages.filter(m => m.status === 'IN_PROGRESS').length;
    const resolvedMessages = messages.filter(m => m.status === 'RESOLVED').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    <p className="text-gray-600 mt-1">Manage customer inquiries and support requests</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                        Export Messages
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 rounded-lg transition-colors">
                        New Message
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Total Messages</p>
                            <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
                        </div>
                        <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <MessageSquare className="h-6 w-6 text-gray-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>All inquiries</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">New</p>
                            <p className="text-2xl font-bold text-gray-900">{newMessages}</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                        <Mail className="h-4 w-4" />
                        <span>Awaiting response</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">In Progress</p>
                            <p className="text-2xl font-bold text-gray-900">{inProgressMessages}</p>
                        </div>
                        <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                        <Clock className="h-4 w-4" />
                        <span>Being handled</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Resolved</p>
                            <p className="text-2xl font-bold text-gray-900">{resolvedMessages}</p>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Completed</span>
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
                                placeholder="Search by name, email, or message..."
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
                            <option value="NEW">New</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                        </select>
                        <button
                            onClick={() => fetchMessages(1)}
                            className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={loading}
                        >
                            <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sender
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Message
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {!loading ? (
                                messages.map((msg) => (
                                    <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <User className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{msg.fullName}</p>
                                                    <p className="text-xs text-gray-500">From contact form</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm text-gray-600 line-clamp-2 max-w-[300px]">
                                                {msg.message}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-3 w-3 text-gray-400" />
                                                    <p className="text-sm text-gray-900">{msg.email}</p>
                                                </div>
                                                {msg.phone && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-3 w-3 text-gray-400" />
                                                        <p className="text-sm text-gray-900">{msg.phone}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                msg.status === 'NEW'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : msg.status === 'IN_PROGRESS'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {msg.status === 'NEW' ? (
                                                    <>
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        New
                                                    </>
                                                ) : msg.status === 'IN_PROGRESS' ? (
                                                    <>
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        In Progress
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Resolved
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm text-gray-600">
                                                {new Date(msg.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/messages/${msg.id}`}
                                                    className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    View
                                                </Link>
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
                                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="h-4 w-64 bg-gray-200 rounded"></div>
                                                <div className="h-3 w-48 bg-gray-200 rounded"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    
                    {!loading && messages.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                {searchTerm || statusFilter
                                    ? "Try adjusting your search or filter to find what you're looking for."
                                    : "No messages have been received yet."}
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
                            of <span className="font-medium">{pagination.total}</span> messages
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

export default MessagesPage;