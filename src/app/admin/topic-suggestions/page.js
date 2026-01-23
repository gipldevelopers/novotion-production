'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Lightbulb,
  Search,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  CheckCircle,
  Clock,
  X,
  Trash2,
  Mail,
  User,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

const TopicSuggestionsPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [deletingId, setDeletingId] = useState(null);

  const fetchSuggestions = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      if (statusFilter) {
        query.append('status', statusFilter);
      }
      const res = await fetch(`/api/admin/topic-suggestions?${query.toString()}`);
      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error('Failed to load topic suggestions');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, pagination.limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [statusFilter, fetchSuggestions]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchSuggestions(newPage);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/topic-suggestions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success('Status updated successfully');
        fetchSuggestions(pagination.page);
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this suggestion?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/topic-suggestions/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Suggestion deleted successfully');
        fetchSuggestions(pagination.page);
      } else {
        toast.error('Failed to delete suggestion');
      }
    } catch (error) {
      toast.error('Failed to delete suggestion');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredSuggestions = searchTerm
    ? suggestions.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (s.message && s.message.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : suggestions;

  const getStatusBadge = (status) => {
    const styles = {
      NEW: 'bg-blue-100 text-blue-800',
      REVIEWED: 'bg-yellow-100 text-yellow-800',
      IMPLEMENTED: 'bg-green-100 text-green-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Topic Suggestions</h1>
          <p className="text-gray-600 mt-1">Manage blog topic suggestions from users</p>
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
                placeholder="Search suggestions..."
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
              <option value="REVIEWED">Reviewed</option>
              <option value="IMPLEMENTED">Implemented</option>
            </select>
            <button
              onClick={() => fetchSuggestions(1)}
              className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic Category
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
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
                filteredSuggestions.map((suggestion) => (
                  <tr key={suggestion.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                          {suggestion.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{suggestion.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {suggestion.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded">
                        {suggestion.topic}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                        {suggestion.message || 'No message provided'}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={suggestion.status}
                        onChange={(e) => handleStatusChange(suggestion.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-none outline-none cursor-pointer ${getStatusBadge(suggestion.status)}`}
                      >
                        <option value="NEW">New</option>
                        <option value="REVIEWED">Reviewed</option>
                        <option value="IMPLEMENTED">Implemented</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(suggestion.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDelete(suggestion.id)}
                        disabled={deletingId === suggestion.id}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete suggestion"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                          <div className="h-3 w-32 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 w-64 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && filteredSuggestions.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || statusFilter
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "No topic suggestions have been submitted yet."}
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
              of <span className="font-medium">{pagination.total}</span> suggestions
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

export default TopicSuggestionsPage;
