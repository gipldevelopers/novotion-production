'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Users,
    Search,
    ChevronRight,
    ChevronLeft,
    RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const fetchUsers = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page: page.toString(),
                limit: pagination.limit.toString(),
                search: searchTerm,
                role: roleFilter
            });
            const res = await fetch(`/api/admin/users?${query.toString()}`);
            const data = await res.json();
            if (data.users) {
                setUsers(data.users);
                setPagination(data.pagination);
            }
        } catch (error) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    }, [searchTerm, roleFilter, pagination.limit]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers(1);
        }, 300); // Debounce search
        return () => clearTimeout(timer);
    }, [searchTerm, roleFilter, fetchUsers]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchUsers(newPage);
        }
    };

    return (
        <div className="animate-in fade-in duration-700 max-w-[1400px] mx-auto min-h-screen pb-20 font-sans">
            <div className="space-y-10">
                {/* Refined Header */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">User Directory</h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 italic">Enterprise Management Matrix</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                            <Search className="h-4 w-4 text-gray-300" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none text-[11px] font-bold text-gray-600 w-48 uppercase tracking-widest"
                            />
                        </div>

                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="h-10 px-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-50 transition-all shadow-sm text-gray-500 cursor-pointer"
                        >
                            <option value="">Global Roles</option>
                            <option value="ADMIN">Master Admins</option>
                            <option value="USER">Standard Users</option>
                        </select>

                        <button onClick={() => fetchUsers(1)} className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                            <RefreshCw className={`h-3.5 w-3.5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Users Matrix */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#F8FAFC]">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Identity Profile</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Auth Role</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Timeline</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Asset Yield</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] text-right">Operation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {!loading ? (
                                    users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-all group">
                                            <td className="px-8 py-6">
                                                <Link href={`/admin/users/${user.id}`} className="flex items-center gap-5">
                                                    <div className="h-12 w-12 rounded-2xl bg-[#F8FAFC] text-blue-600 flex items-center justify-center font-black text-sm border border-gray-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                                                        {user.name?.[0] || user.email?.[0]?.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-800 text-sm tracking-tight mb-0.5">{user.name || 'Anonymous'}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold transition-colors group-hover:text-gray-500">{user.email}</p>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] ${user.role === 'ADMIN' ? 'text-indigo-600 bg-indigo-50 border border-indigo-100' : 'text-gray-400 bg-gray-50 border border-gray-100'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{user._count?.purchases || 0} Assets</span>
                                                        <span className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.25em]">{user._count?.payments || 0} Paid</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Link href={`/admin/users/${user.id}`} className="h-10 w-10 inline-flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-2xl hover:shadow-blue-200 transition-all text-gray-300 hover:text-blue-600 bg-[#F8FAFC] border border-transparent hover:border-blue-100 ml-auto">
                                                    <ChevronRight className="h-4 w-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-8 py-6"><div className="h-12 w-48 bg-gray-50 rounded-2xl"></div></td>
                                            <td className="px-8 py-6"><div className="h-4 w-16 bg-gray-50 rounded-lg"></div></td>
                                            <td className="px-8 py-6"><div className="h-4 w-24 bg-gray-50 rounded-lg"></div></td>
                                            <td className="px-8 py-6"><div className="h-8 w-20 bg-gray-50 rounded-lg"></div></td>
                                            <td className="px-8 py-6 text-right"><div className="h-10 w-10 bg-gray-50 rounded-2xl ml-auto"></div></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {!loading && users.length === 0 && (
                            <div className="py-32 text-center bg-white">
                                <div className="h-16 w-16 bg-gray-50 text-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-100">
                                    <Users className="h-8 w-8" />
                                </div>
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Matrix Empty</p>
                            </div>
                        )}
                    </div>

                    <div className="px-8 py-6 border-t border-gray-50 bg-[#F8FAFC]/50 flex items-center justify-between">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            SHOWING <span className="text-gray-900">{users.length}</span> OF <span className="text-gray-900">{pagination.total}</span> ENTITIES
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1 || loading}
                                className="h-10 px-4 flex items-center gap-2 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all shadow-sm"
                            >
                                <ChevronLeft className="h-3.5 w-3.5" /> Previous
                            </button>

                            <div className="flex items-center gap-1 mx-2">
                                {[...Array(pagination.totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`h-10 w-10 flex items-center justify-center rounded-2xl text-[10px] font-black transition-all ${pagination.page === i + 1
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105'
                                                : 'text-gray-400 hover:bg-white hover:text-gray-900'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages || loading}
                                className="h-10 px-4 flex items-center gap-2 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all shadow-sm"
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

export default UsersPage;
