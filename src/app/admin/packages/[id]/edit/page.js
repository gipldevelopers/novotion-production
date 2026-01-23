'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Loader2,
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

const iconOptions = [
  'Zap',
  'Star',
  'Sparkles',
  'Shield',
  'Globe',
  'Users',
  'Briefcase',
  'Target',
  'Rocket',
];

const colorOptions = [
  { value: 'blue', label: 'Blue', bgColor: 'bg-blue-500', bgLight: 'bg-blue-50', textColor: 'text-blue-600' },
  { value: 'indigo', label: 'Indigo', bgColor: 'bg-indigo-500', bgLight: 'bg-indigo-50', textColor: 'text-indigo-600' },
  { value: 'slate', label: 'Slate', bgColor: 'bg-slate-500', bgLight: 'bg-slate-50', textColor: 'text-slate-600' },
];

const EditPackagePage = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    features: [''],
    color: 'blue',
    badge: '',
    icon: 'Zap',
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`/api/admin/custom-packages/${params.id}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            name: data.name || '',
            price: data.price?.toString() || '',
            description: data.description || '',
            features: data.features && data.features.length > 0 ? data.features : [''],
            color: data.color || 'blue',
            badge: data.badge || '',
            icon: data.icon || 'Zap',
          });
        } else {
          toast.error(data.error || 'Failed to load package');
          router.push('/admin/packages');
        }
      } catch (error) {
        toast.error('Failed to load package');
        router.push('/admin/packages');
      } finally {
        setFetching(false);
      }
    };

    if (params.id) {
      fetchPackage();
    }
  }, [params.id, router]);

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData({ ...formData, features: newFeatures });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Filter out empty features
    const filteredFeatures = formData.features.filter((f) => f.trim() !== '');

    if (filteredFeatures.length === 0) {
      toast.error('Please add at least one feature');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/custom-packages/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: filteredFeatures,
          badge: formData.badge || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Package updated successfully');
        router.push('/admin/packages');
      } else {
        toast.error(data.error || 'Failed to update package');
      }
    } catch (error) {
      toast.error('Failed to update package');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/packages"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Package</h1>
            <p className="text-gray-500 mt-1">Update package details</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Package Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Custom Starter Package"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="A detailed description of the package..."
            required
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Feature ${index + 1}`}
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Feature
            </button>
          </div>
        </div>

        {/* Color and Icon */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Color
            </label>
            <div className="flex gap-3">
              {colorOptions.map((color) => {
                const IconComponent = iconMap[formData.icon] || Zap;
                return (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      formData.color === color.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${color.bgColor} flex items-center justify-center`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{color.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Icon
            </label>
            <div className="grid grid-cols-3 gap-2">
              {iconOptions.map((iconName) => {
                const IconComponent = iconMap[iconName] || Zap;
                const selectedColor = colorOptions.find((c) => c.value === formData.color) || colorOptions[0];
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      formData.icon === iconName
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${selectedColor.bgLight} flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${selectedColor.textColor}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{iconName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Badge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Badge (Optional)
          </label>
          <input
            type="text"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Popular, Starter, Best Value"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/packages"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Updating...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Update Package
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPackagePage;
