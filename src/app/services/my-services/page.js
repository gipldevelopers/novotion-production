'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  Download,
  Eye,
  MessageCircle,
  Star,
  TrendingUp,
  Award,
  Zap,
  Filter,
  Search,
  ChevronRight,
  AlertCircle,
  Play,
  Pause,
  RefreshCw,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const MyServicesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedService, setSelectedService] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock services data
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Resume Optimization Pro',
      type: 'Resume Services',
      status: 'completed',
      date: '2024-12-10',
      price: '$399',
      description: 'Professional resume review and optimization with ATS compatibility',
      deliverables: [
        { name: 'Optimized Resume PDF', type: 'file', url: '#' },
        { name: 'ATS Report', type: 'file', url: '#' },
        { name: 'Cover Letter Template', type: 'file', url: '#' }
      ],
      advisor: {
        name: 'Sarah Johnson',
        role: 'Senior Resume Strategist',
        rating: 4.9,
        completed: 247
      },
      progress: 100,
      rating: 5,
      review: 'Excellent service! My resume looks amazing and I got 3 interviews in 2 weeks.',
      canDownload: true,
      canRate: true,
      canMessage: true
    },
    {
      id: '2',
      name: 'LinkedIn Premium Package',
      type: 'LinkedIn & Profile',
      status: 'in-progress',
      date: '2024-12-12',
      estimatedCompletion: '2024-12-18',
      price: '$299',
      description: 'Complete LinkedIn profile transformation and optimization',
      deliverables: [
        { name: 'Profile Analysis Report', type: 'file', url: '#' },
        { name: 'Optimization Checklist', type: 'file', url: '#' }
      ],
      advisor: {
        name: 'Michael Chen',
        role: 'LinkedIn Expert',
        rating: 4.8,
        completed: 189
      },
      progress: 65,
      nextStep: 'Final review and recommendations',
      canMessage: true,
      canTrack: true
    },
    {
      id: '3',
      name: 'Mock Interview Session',
      type: 'Interview Preparation',
      status: 'upcoming',
      date: '2024-12-20',
      time: '2:00 PM EST',
      price: '$149',
      description: '90-minute comprehensive mock interview with expert feedback',
      advisor: {
        name: 'David Wilson',
        role: 'Interview Coach',
        rating: 4.9,
        completed: 312
      },
      preparation: [
        'Review your resume',
        'Prepare 3-5 questions for the coach',
        'Test your video/audio setup'
      ],
      canReschedule: true,
      canCancel: true
    },
    {
      id: '4',
      name: 'Executive Resume Package',
      type: 'Resume Services',
      status: 'completed',
      date: '2024-11-28',
      price: '$699',
      description: 'C-level executive resume and career strategy',
      deliverables: [
        { name: 'Executive Resume PDF', type: 'file', url: '#' },
        { name: 'Board Bio', type: 'file', url: '#' },
        { name: 'LinkedIn Executive Summary', type: 'file', url: '#' },
        { name: 'Career Strategy Report', type: 'file', url: '#' }
      ],
      advisor: {
        name: 'Emma Rodriguez',
        role: 'Executive Career Coach',
        rating: 5.0,
        completed: 156
      },
      progress: 100,
      rating: 5,
      review: 'Outstanding service! Emma perfectly captured my 15+ years of leadership experience.',
      canDownload: true,
      canRate: false
    },
    {
      id: '5',
      name: 'Career Strategy Session',
      type: 'Career Strategy',
      status: 'in-progress',
      date: '2024-12-15',
      price: '$199',
      description: 'One-on-one career planning and goal setting',
      advisor: {
        name: 'Robert Kim',
        role: 'Career Strategist',
        rating: 4.7,
        completed: 203
      },
      progress: 40,
      nextStep: 'Complete self-assessment questionnaire',
      canMessage: true
    }
  ]);

  const filters = [
    { id: 'all', label: 'All Services', count: services.length },
    { id: 'in-progress', label: 'In Progress', count: services.filter(s => s.status === 'in-progress').length },
    { id: 'upcoming', label: 'Upcoming', count: services.filter(s => s.status === 'upcoming').length },
    { id: 'completed', label: 'Completed', count: services.filter(s => s.status === 'completed').length }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'name', label: 'Name A-Z' },
    { id: 'price', label: 'Price' },
    { id: 'progress', label: 'Progress' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3" />
            In Progress
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Calendar className="h-3 w-3" />
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  const handleDownload = (service) => {
    toast.success(`Downloading ${service.name} files...`, {
      description: 'Your files will be downloaded shortly.'
    });
  };

  const handleRateService = (service) => {
    setSelectedService(service);
    toast.info('Rating feature coming soon!');
  };

  const handleMessageAdvisor = (service) => {
    toast.success(`Opening chat with ${service.advisor.name}...`);
  };

  const handleReschedule = (service) => {
    toast.info(`Reschedule ${service.name}?`, {
      action: {
        label: 'Reschedule',
        onClick: () => toast.success('Service rescheduled!')
      },
    });
  };

  const handleCancel = (service) => {
    toast.error(`Cancel ${service.name}? This action cannot be undone.`, {
      action: {
        label: 'Cancel Service',
        onClick: () => {
          setServices(prev => prev.filter(s => s.id !== service.id));
          toast.success('Service cancelled successfully.');
        }
      },
    });
  };

  const filteredServices = services
    .filter(service => {
      if (activeFilter !== 'all' && service.status !== activeFilter) return false;
      if (searchTerm && !service.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const stats = {
    total: services.length,
    completed: services.filter(s => s.status === 'completed').length,
    inProgress: services.filter(s => s.status === 'in-progress').length,
    upcoming: services.filter(s => s.status === 'upcoming').length,
    totalSpent: services.reduce((sum, s) => sum + parseFloat(s.price.replace('$', '')), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
                <p className="text-gray-600 mt-2">Track and manage your career services</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className="gap-2"
                >
                  {autoRefresh ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {autoRefresh ? 'Auto-refresh' : 'Refresh'}
                </Button>
                <Link href="/services/pro-services">
                  <Button className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Browse Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-500">Total Services</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.completed}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.inProgress}</div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.upcoming}</div>
              <div className="text-sm text-gray-500">Upcoming</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">${stats.totalSpent}</div>
              <div className="text-sm text-gray-500">Total Investment</div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                    <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none w-full sm:w-64"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredServices.map(service => (
              <div key={service.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Service Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{service.type}</span>
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{service.price}</div>
                      <div className="text-sm text-gray-500">
                        {service.status === 'upcoming' && service.time ? (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {service.date} at {service.time}
                          </span>
                        ) : (
                          new Date(service.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600">{service.description}</p>
                </div>

                {/* Service Details */}
                <div className="p-6">
                  {/* Progress Bar */}
                  {service.progress !== undefined && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{service.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            service.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${service.progress}%` }}
                        ></div>
                      </div>
                      {service.nextStep && (
                        <p className="text-sm text-gray-500 mt-2">
                          Next: <span className="font-medium">{service.nextStep}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Advisor Info */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-6">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {service.advisor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{service.advisor.name}</h4>
                      <p className="text-sm text-gray-500">{service.advisor.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{service.advisor.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{service.advisor.completed} completed</p>
                    </div>
                  </div>

                  {/* Deliverables */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Deliverables</h4>
                      <div className="space-y-2">
                        {service.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <span className="text-sm text-gray-700">{item.name}</span>
                            </div>
                            {service.canDownload && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(service)}
                                className="gap-1"
                              >
                                <Download className="h-3 w-3" />
                                Download
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preparation Steps */}
                  {service.preparation && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Preparation Required</h4>
                      <ul className="space-y-2">
                        {service.preparation.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Review */}
                  {service.review && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">Your Review</span>
                      </div>
                      <p className="text-sm text-gray-700 italic">"{service.review}"</p>
                      {service.canRate && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRateService(service)}
                            className="gap-1"
                          >
                            <Star className="h-3 w-3" />
                            Edit Review
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {service.canMessage && (
                      <Button
                        variant="outline"
                        onClick={() => handleMessageAdvisor(service)}
                        className="gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Message Advisor
                      </Button>
                    )}

                    {service.canReschedule && (
                      <Button
                        variant="outline"
                        onClick={() => handleReschedule(service)}
                        className="gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        Reschedule
                      </Button>
                    )}

                    {service.canCancel && (
                      <Button
                        variant="outline"
                        onClick={() => handleCancel(service)}
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    )}

                    {service.canTrack && (
                      <Button className="gap-2 ml-auto">
                        <Eye className="h-4 w-4" />
                        Track Progress
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {searchTerm ? 'No matching services found' : 'No services yet'}
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {searchTerm
                  ? 'Try adjusting your search or filter to find what you\'re looking for.'
                  : 'Start your career journey by exploring our professional services.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {searchTerm && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveFilter('all');
                    }}
                  >
                    Clear Search
                  </Button>
                )}
                <Link href="/services/pro-services">
                  <Button className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Browse Services
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Selected Service Modal */}
          {selectedService && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Rate Service</h3>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{selectedService.name}</h4>
                      <p className="text-gray-600">{selectedService.description}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Your Rating
                      </label>
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className="text-2xl hover:scale-110 transition-transform"
                            onClick={() => toast.success(`Rated ${star} stars!`)}
                          >
                            {star <= (selectedService.rating || 0) ? '★' : '☆'}
                          </button>
                        ))}
                      </div>

                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Your Review
                      </label>
                      <textarea
                        className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                        placeholder="Share your experience with this service..."
                      ></textarea>
                    </div>

                    <div className="flex gap-3 justify-end pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedService(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          toast.success('Thank you for your review!');
                          setSelectedService(null);
                        }}
                      >
                        Submit Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyServicesPage;