'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Search,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Plus,
  Star,
  StarOff,
  Eye,
  Calendar,
  Edit,
  Trash2,
  MoreVertical,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [newTopicSuggestionsCount, setNewTopicSuggestionsCount] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [deletingId, setDeletingId] = useState(null);

  const fetchBlogs = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        search: searchTerm,
      });
      if (featuredFilter !== '') {
        query.append('featured', featuredFilter);
      }
      const res = await fetch(`/api/admin/blogs?${query.toString()}`);
      const data = await res.json();
      if (data.blogs) {
        setBlogs(data.blogs);
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, featuredFilter, pagination.limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, featuredFilter, fetchBlogs]);

  useEffect(() => {
    const fetchNewTopicSuggestionsCount = async () => {
      try {
        const res = await fetch("/api/admin/topic-suggestions/count");
        const data = await res.json();
        if (res.ok && data.count !== undefined) {
          setNewTopicSuggestionsCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching topic suggestions count:", error);
      }
    };

    fetchNewTopicSuggestionsCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchNewTopicSuggestionsCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
    }
  };

  const handleToggleFeatured = async (blogId, currentFeatured) => {
    try {
      const res = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentFeatured }),
      });

      if (res.ok) {
        toast.success(`Blog ${!currentFeatured ? 'marked as featured' : 'unmarked as featured'}`);
        fetchBlogs(pagination.page);
      } else {
        toast.error('Failed to update blog');
      }
    } catch (error) {
      toast.error('Failed to update blog');
    }
  };

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    setDeletingId(blogId);
    try {
      const res = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Blog deleted successfully');
        fetchBlogs(pagination.page);
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (error) {
      toast.error('Failed to delete blog');
    } finally {
      setDeletingId(null);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600 mt-1">Manage blog posts and articles</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/topic-suggestions"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors flex items-center gap-2 relative"
          >
            <Lightbulb className="h-4 w-4" />
            Topic Suggestions
            {newTopicSuggestionsCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full min-w-[20px] text-center">
                {newTopicSuggestionsCount > 99 ? '99+' : newTopicSuggestionsCount}
              </span>
            )}
          </Link>
          <Link
            href="/admin/blogs/new"
            className="px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Blog
          </Link>
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
                placeholder="Search blogs by title, excerpt, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-w-[140px]"
            >
              <option value="">All Blogs</option>
              <option value="true">Featured Only</option>
              <option value="false">Non-Featured</option>
            </select>
            <button
              onClick={() => fetchBlogs(1)}
              className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blog Post
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!loading ? (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {blog.title}
                            </h3>
                            {blog.featured && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2">{blog.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {blog.category}
                        </span>
                        {blog.subCategory && (
                          <span className="text-xs text-gray-500">{blog.subCategory}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
                          {getInitials(blog.createdBy?.name || blog.createdBy?.email)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {blog.createdBy?.name || 'Admin'}
                          </p>
                          <p className="text-xs text-gray-500">{blog.createdBy?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Eye className="h-3 w-3" />
                          {blog.views}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFeatured(blog.id, blog.featured)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            blog.featured
                              ? 'text-yellow-600 hover:bg-yellow-50'
                              : 'text-gray-400 hover:bg-gray-100'
                          }`}
                          title={blog.featured ? 'Unmark as featured' : 'Mark as featured'}
                        >
                          {blog.featured ? (
                            <Star className="h-4 w-4 fill-current" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </button>
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit blog"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={deletingId === blog.id}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete blog"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="h-4 w-48 bg-gray-200 rounded"></div>
                        <div className="h-3 w-64 bg-gray-200 rounded"></div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                        <div className="space-y-1">
                          <div className="h-3 w-20 bg-gray-200 rounded"></div>
                          <div className="h-2 w-32 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && blogs.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                {searchTerm || featuredFilter
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "Get started by creating your first blog post."}
              </p>
              {!searchTerm && !featuredFilter && (
                <Link
                  href="/admin/blogs/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create Blog
                </Link>
              )}
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
              of <span className="font-medium">{pagination.total}</span> blogs
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

export default BlogsPage;
