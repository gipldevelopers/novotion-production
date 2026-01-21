'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Shield,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Bell,
  Globe,
  Lock,
  Award,
  Star,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    jobTitle: 'Senior Product Manager',
    company: 'TechCorp Inc.',
    bio: 'Experienced product manager with 8+ years in SaaS and B2B platforms. Passionate about building user-centric products.',
    joinDate: '2024-01-15',
    lastLogin: '2024-12-15 14:30',
    notifications: true,
    twoFactor: false,
    newsletter: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);

  // Mock services data
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Resume Optimization Pro',
      type: 'Resume Services',
      status: 'completed',
      date: '2024-12-10',
      price: '$399',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'LinkedIn Premium Package',
      type: 'LinkedIn & Profile',
      status: 'in-progress',
      date: '2024-12-12',
      price: '$299',
      estimatedCompletion: '2024-12-18'
    },
    {
      id: '3',
      name: 'Mock Interview Session',
      type: 'Interview Preparation',
      status: 'upcoming',
      date: '2024-12-20',
      price: '$149'
    },
    {
      id: '4',
      name: 'Executive Resume Package',
      type: 'Resume Services',
      status: 'completed',
      date: '2024-11-28',
      price: '$699',
      downloadUrl: '#'
    }
  ]);

  // Mock saved addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: '1',
      type: 'home',
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      name: 'John Doe',
      address: '456 Tech Park, Suite 300',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'USA',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ]);

  const handleEdit = () => {
    setEditData({ ...user });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(editData);
    setIsEditing(false);
    setLoading(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDeleteAddress = (id) => {
    setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
    toast.success('Address deleted');
  };

  const handleSetDefaultAddress = (id) => {
    setSavedAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success('Default address updated');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3" />
            In Progress
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Calendar className="h-3 w-3" />
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account, services, and preferences</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.jobTitle}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'personal'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'services'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    My Services
                    <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                      {services.length}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'addresses'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                    Saved Addresses
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'security'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    Security
                  </button>
               
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link href="/">
                    <Button variant="outline" className="w-full gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                        <p className="text-gray-600 text-sm mt-1">Update your personal details</p>
                      </div>
                      {!isEditing ? (
                        <Button onClick={handleEdit} className="gap-2">
                          <Edit2 className="h-4 w-4" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={handleCancel} variant="outline" className="gap-2">
                            <X className="h-4 w-4" />
                            Cancel
                          </Button>
                          <Button onClick={handleSave} disabled={loading} className="gap-2">
                            {loading ? (
                              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <Save className="h-4 w-4" />
                            )}
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    {isEditing ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={editData.name}
                              onChange={handleInputChange}
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={editData.email}
                              onChange={handleInputChange}
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={editData.phone}
                              onChange={handleInputChange}
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Job Title
                            </label>
                            <input
                              type="text"
                              name="jobTitle"
                              value={editData.jobTitle}
                              onChange={handleInputChange}
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Company
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={editData.company}
                              onChange={handleInputChange}
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={editData.location}
                              onChange={handleInputChange}
                              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                          </label>
                          <textarea
                            name="bio"
                            value={editData.bio}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors resize-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Full Name</label>
                              <p className="text-gray-900 font-medium mt-1">{user.name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Email Address</label>
                              <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                {user.email}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Phone Number</label>
                              <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                {user.phone}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Job Title</label>
                              <p className="text-gray-900 font-medium mt-1">{user.jobTitle}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Company</label>
                              <p className="text-gray-900 font-medium mt-1">{user.company}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Location</label>
                              <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                {user.location}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Bio</label>
                          <p className="text-gray-900 mt-2 leading-relaxed">{user.bio}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Member Since</label>
                            <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {new Date(user.joinDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Last Login</label>
                            <p className="text-gray-900 font-medium mt-1">
                              {new Date(user.lastLogin).toLocaleString('en-US', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* My Services Tab */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">My Services</h2>
                        <p className="text-gray-600 text-sm mt-1">Track and manage your purchased services</p>
                      </div>
                      <Link href="/services/pro-services">
                        <Button className="gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Browse More Services
                        </Button>
                      </Link>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Service</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {services.map((service) => (
                            <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-medium text-gray-900">{service.name}</p>
                                  <p className="text-sm text-gray-500 mt-1">{service.type}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-gray-700">{service.type}</span>
                              </td>
                              <td className="py-4 px-4">
                                {getStatusBadge(service.status)}
                              </td>
                              <td className="py-4 px-4">
                                <p className="text-sm text-gray-700">
                                  {new Date(service.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </p>
                                {service.estimatedCompletion && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Est. completion: {service.estimatedCompletion}
                                  </p>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                <p className="font-medium text-gray-900">{service.price}</p>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  {service.downloadUrl && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1"
                                      onClick={() => toast.success('Download started!')}
                                    >
                                      <Download className="h-3 w-3" />
                                      Download
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1"
                                  >
                                    <Eye className="h-3 w-3" />
                                    View
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {services.length === 0 && (
                      <div className="text-center py-12">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
                        <p className="text-gray-500 mb-6">You haven't purchased any services yet.</p>
                        <Link href="/services/pro-services">
                          <Button>Browse Services</Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{services.length}</div>
                      <div className="text-sm text-gray-500">Total Services</div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {services.filter(s => s.status === 'completed').length}
                      </div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {services.filter(s => s.status === 'in-progress').length}
                      </div>
                      <div className="text-sm text-gray-500">In Progress</div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        ${services.reduce((sum, s) => sum + parseFloat(s.price.replace('$', '')), 0)}
                      </div>
                      <div className="text-sm text-gray-500">Total Spent</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                        <p className="text-gray-600 text-sm mt-1">Manage your billing and shipping addresses</p>
                      </div>
                      <Button onClick={() => toast.info('Add new address feature coming soon!')} className="gap-2">
                        <MapPin className="h-4 w-4" />
                        Add New Address
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {savedAddresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                address.type === 'home' 
                                  ? 'bg-blue-100 text-blue-600' 
                                  : 'bg-purple-100 text-purple-600'
                              }`}>
                                {address.type === 'home' ? '🏠' : '🏢'}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {address.type === 'home' ? 'Home Address' : 'Work Address'}
                                </h3>
                                <p className="text-sm text-gray-500">{address.name}</p>
                              </div>
                            </div>
                            {address.isDefault && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3" />
                                Default
                              </span>
                            )}
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <p>{address.address}</p>
                            <p>{address.city}, {address.state} {address.postalCode}</p>
                            <p>{address.country}</p>
                            <p className="flex items-center gap-2 mt-2">
                              <Phone className="h-3 w-3" />
                              {address.phone}
                            </p>
                          </div>

                          <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleSetDefaultAddress(address.id)}
                              disabled={address.isDefault}
                            >
                              {address.isDefault ? 'Default' : 'Set as Default'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => toast.info('Edit feature coming soon!')}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {savedAddresses.length === 0 && (
                      <div className="text-center py-12">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <MapPin className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved addresses</h3>
                        <p className="text-gray-500 mb-6">Add addresses for faster checkout.</p>
                        <Button onClick={() => toast.info('Add new address feature coming soon!')}>
                          Add Your First Address
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                    <p className="text-gray-600 text-sm mt-1">Manage your account security</p>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${user.twoFactor ? 'text-green-600' : 'text-gray-500'}`}>
                          {user.twoFactor ? 'Enabled' : 'Disabled'}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setUser(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
                            toast.success(`2FA ${!user.twoFactor ? 'enabled' : 'disabled'} successfully!`);
                          }}
                        >
                          {user.twoFactor ? 'Disable' : 'Enable'}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Change Password</h3>
                          <p className="text-sm text-gray-500">Update your account password</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => toast.info('Password change feature coming soon!')}
                      >
                        Change Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Active Sessions</h3>
                          <p className="text-sm text-gray-500">Manage your active login sessions</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => toast.info('Session management coming soon!')}
                      >
                        View Sessions
                      </Button>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-red-900 mb-1">Delete Account</h3>
                          <p className="text-sm text-red-700">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 hover:border-red-300"
                          onClick={() => toast.error('Account deletion requires confirmation!')}
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

        
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;