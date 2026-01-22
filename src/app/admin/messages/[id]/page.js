'use client';

import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    ArrowLeft,
    Mail,
    Phone,
    User,
    Clock,
    CheckCircle,
    Save,
    Building,
    Briefcase,
    Calendar,
    Send,
    Edit,
    History,
    RefreshCw,
    MoreVertical
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const MessageDetailPage = () => {
    const { id } = useParams("id");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [adminNotes, setAdminNotes] = useState('');
    const [status, setStatus] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await fetch(`/api/admin/messages/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setMessage(data.message);
                    setAdminNotes(data.message.adminNotes || '');
                    setStatus(data.message.status);
                } else {
                    toast.error("Message not found");
                    router.push('/admin/messages');
                }
            } catch (error) {
                toast.error("Failed to load message details");
            } finally {
                setLoading(false);
            }
        };
        fetchMessage();
    }, [id, router]);

    const handleUpdate = async () => {
        if (!status && !adminNotes) {
            toast.info("No changes to save");
            return;
        }
        
        setUpdating(true);
        try {
            const res = await fetch(`/api/admin/messages/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    status: status || message.status, 
                    adminNotes: adminNotes || message.adminNotes 
                })
            });
            if (res.ok) {
                toast.success("Message updated successfully");
                setMessage({ ...message, status: status || message.status, adminNotes });
            } else {
                toast.error("Failed to update message");
            }
        } catch (error) {
            toast.error("Network error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="h-10 w-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm text-gray-500">Loading message details...</p>
                </div>
            </div>
        );
    }

    if (!message) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/messages"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Message Details</h1>
                        <p className="text-gray-600">View and manage this inquiry</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                        <MoreVertical className="h-4 w-4" />
                    </button>
                    <button 
                        onClick={handleUpdate}
                        disabled={updating}
                        className="px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                        {updating ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Sender Info & Status */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Sender Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                                {message.fullName?.[0]?.toUpperCase()}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">{message.fullName}</h2>
                            <p className="text-sm text-gray-500 mb-4">{message.email}</p>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                message.status === 'NEW'
                                    ? 'bg-blue-100 text-blue-800'
                                    : message.status === 'IN_PROGRESS'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                            }`}>
                                {message.status === 'NEW' ? (
                                    <>
                                        <Mail className="h-3 w-3 mr-1" />
                                        New
                                    </>
                                ) : message.status === 'IN_PROGRESS' ? (
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
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            {message.phone && (
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Phone className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <p className="text-sm font-medium text-gray-900">{message.phone}</p>
                                    </div>
                                </div>
                            )}

                            {message.company && (
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Building className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Company</p>
                                        <p className="text-sm font-medium text-gray-900">{message.company}</p>
                                    </div>
                                </div>
                            )}

                            {message.userType && (
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Briefcase className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">User Type</p>
                                        <p className="text-sm font-medium text-gray-900">{message.userType}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="h-4 w-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Submitted</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(message.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(message.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Update */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
                        <div className="space-y-2">
                            {['NEW', 'IN_PROGRESS', 'RESOLVED'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatus(s)}
                                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                                        (status || message.status) === s
                                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                            : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {(status || message.status) === s ? (
                                            <CheckCircle className="h-4 w-4" />
                                        ) : (
                                            <div className="h-4 w-4 rounded-full border border-gray-300" />
                                        )}
                                        {s.replace('_', ' ')}
                                    </div>
                                    {(status || message.status) === s && (
                                        <span className="text-xs font-medium">Current</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Message & Notes */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Message Content */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Message</h3>
                            <p className="text-sm text-gray-500">Full inquiry from {message.fullName}</p>
                        </div>
                        <div className="p-6">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                    {message.message}
                                </p>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                                    <Send className="h-4 w-4 text-gray-400" />
                                    <span className="text-xs text-gray-500">
                                        Sent on {new Date(message.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Notes */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Admin Notes</h3>
                                    <p className="text-sm text-gray-500">Internal notes and updates</p>
                                </div>
                                <Edit className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="p-6">
                            <textarea
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Add notes about this inquiry, resolution steps, or follow-up actions..."
                                className="w-full h-48 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none placeholder-gray-400"
                            />
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <History className="h-4 w-4" />
                                    Last updated: {new Date(message.updatedAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdminNotes(message.adminNotes || '')}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={updating || (adminNotes === (message.adminNotes || ''))}
                                        className="px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {updating ? 'Saving...' : 'Save Notes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a
                                href={`mailto:${message.email}`}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                Reply via Email
                            </a>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                <MessageSquare className="h-4 w-4" />
                                Mark as Spam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageDetailPage;