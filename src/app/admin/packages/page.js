'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Lock,
  Zap,
  Star,
  Sparkles,
  Shield,
  Globe,
  Users,
  Briefcase,
  Target,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

// Icon mapping
const iconMap = {
  Zap,
  Star,
  Sparkles,
  Shield,
  Globe,
  Users,
  Briefcase,
  Target,
  Rocket,
};

const getIconComponent = (iconName) => {
  return iconMap[iconName] || Package;
};

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/custom-packages');
      const data = await res.json();
      if (res.ok) {
        setPackages(data);
      } else {
        toast.error(data.error || 'Failed to load packages');
      }
    } catch (error) {
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleDelete = async (pkgId, isSeed) => {
    if (isSeed) {
      toast.error('Cannot delete seed packages');
      return;
    }

    if (!confirm('Are you sure you want to delete this package?')) {
      return;
    }

    setDeletingId(pkgId);
    try {
      const res = await fetch(`/api/admin/custom-packages/${pkgId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Package deleted successfully');
        fetchPackages();
      } else {
        toast.error(data.error || 'Failed to delete package');
      }
    } catch (error) {
      toast.error('Failed to delete package');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Custom Packages</h1>
          <p className="text-gray-500 mt-1">
            Manage custom service packages (seed packages cannot be deleted)
          </p>
        </div>
        <Link
          href="/admin/packages/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Package
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={fetchPackages}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Packages List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No packages found' : 'No packages yet'}
          </p>
          {!searchTerm && (
            <Link
              href="/admin/packages/new"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Your First Package
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const IconComponent = getIconComponent(pkg.icon);
                          return (
                            <div
                              className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                pkg.color === 'blue'
                                  ? 'bg-blue-50 text-blue-600'
                                  : pkg.color === 'indigo'
                                  ? 'bg-indigo-50 text-indigo-600'
                                  : 'bg-slate-50 text-slate-600'
                              }`}
                            >
                              <IconComponent className="h-5 w-5" />
                            </div>
                          );
                        })()}
                        <div>
                          <div className="font-semibold text-gray-900">
                            {pkg.name}
                            {pkg.badge && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                                {pkg.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {pkg.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        ${pkg.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {pkg.features.length} feature{pkg.features.length !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {pkg.isSeed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                          <Lock className="h-3 w-3" />
                          Seed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                          Custom
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/packages/${pkg.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        {!pkg.isSeed && (
                          <button
                            onClick={() => handleDelete(pkg.id, pkg.isSeed)}
                            disabled={deletingId === pkg.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === pkg.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;
