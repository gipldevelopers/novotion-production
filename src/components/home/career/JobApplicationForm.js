'use client';

import { useState } from 'react';
import { X, Upload, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JobApplicationForm = ({ isOpen, onClose, selectedPosition = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: selectedPosition,
    noticePeriod: '',
    currentLocation: '',
    currentSalary: '',
    expectedSalary: '',
    skills: '',
    experience: '',
    resume: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positions = [
    'Recruitment Consultant',
    'RPO Specialist',
    'Career Support Specialist',
    'Talent Acquisition Manager',
    'Other'
  ];

  const noticePeriods = [
    'Immediate',
    '15 days',
    '30 days',
    '45 days',
    '60 days',
    '90 days'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: selectedPosition,
          noticePeriod: '',
          currentLocation: '',
          currentSalary: '',
          expectedSalary: '',
          skills: '',
          experience: '',
          resume: null
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isSubmitted ? 'Application Submitted!' : 'Apply for Position'}
              </h2>
              {!isSubmitted && selectedPosition && (
                <p className="text-primary font-medium mt-1">{selectedPosition}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Thank You for Applying!
            </h3>
            <p className="text-gray-600 mb-6">
              Your application has been received. Our HR team will review your details and get back to you soon.
            </p>
            <Button
              onClick={onClose}
              className="bg-primary hover:bg-primary-700 text-white"
            >
              Close
            </Button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Location *
                  </label>
                  <input
                    type="text"
                    id="currentLocation"
                    name="currentLocation"
                    required
                    value={formData.currentLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your current city"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Professional Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                    Position Applying For *
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  >
                    <option value="">Select a position</option>
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Experience (Years) *
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    required
                    min="0"
                    max="50"
                    step="0.1"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="e.g., 3.5"
                  />
                </div>

                <div>
                  <label htmlFor="currentSalary" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Salary (₹/year)
                  </label>
                  <input
                    type="text"
                    id="currentSalary"
                    name="currentSalary"
                    value={formData.currentSalary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="e.g., ₹8,00,000"
                  />
                </div>

                <div>
                  <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Salary (₹/year) *
                  </label>
                  <input
                    type="text"
                    id="expectedSalary"
                    name="expectedSalary"
                    required
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="e.g., ₹12,00,000"
                  />
                </div>

                <div>
                  <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-1">
                    Notice Period *
                  </label>
                  <select
                    id="noticePeriod"
                    name="noticePeriod"
                    required
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  >
                    <option value="">Select notice period</option>
                    {noticePeriods.map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Key Skills 
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    rows={3}
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="List your key skills separated by commas (e.g., JavaScript, React, Node.js)"
                  />
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Resume
              </h3>
              
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Resume (PDF only) *
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="resume"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      formData.resume
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className={`h-8 w-8 mb-2 ${
                        formData.resume ? 'text-primary' : 'text-gray-400'
                      }`} />
                      <p className="text-sm text-gray-500">
                        {formData.resume ? (
                          <span className="text-primary font-medium">{formData.resume.name}</span>
                        ) : (
                          <>
                            <span className="font-medium">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF only (Max. 5MB)</p>
                    </div>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;