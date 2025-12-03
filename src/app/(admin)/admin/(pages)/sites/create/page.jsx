'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiCheck } from 'react-icons/bi';

export default function CreateGuestPostingSite() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    website_url: '',
    niche: '',
    language: 'English',
    country: 'USA',
    as: '',
    da: '',
    dr: '',
    ahrefs_traffic: '',
    ahrefs_keywords: '',
    semrush_traffic: '',
    semrush_countries: '',
    sports_allowed: false,
    pharmacy_allowed: false,
    crypto_allowed: false,
    foreign_lang_allowed: false,
    link_type: 'dofollow',
    link_validity: 'permanent',
    price: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  // Common niches, languages, and countries
  const niches = ['Tech', 'Health', 'Finance', 'Business', 'Marketing', 'Lifestyle', 'Education', 'Travel', 'Sports', 'Entertainment', 'General'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Arabic', 'Hindi'];
  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'India', 'China', 'Japan', 'Brazil', 'Mexico'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.website_url.trim()) {
      newErrors.website_url = 'Website URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.website_url)) {
      newErrors.website_url = 'Please enter a valid URL starting with http:// or https://';
    }
    
    if (!formData.niche.trim()) {
      newErrors.niche = 'Niche is required';
    }
    
    if (formData.da && (formData.da < 0 || formData.da > 100)) {
      newErrors.da = 'DA must be between 0 and 100';
    }
    
    if (formData.dr && (formData.dr < 0 || formData.dr > 100)) {
      newErrors.dr = 'DR must be between 0 and 100';
    }
    
    if (formData.price && isNaN(formData.price)) {
      newErrors.price = 'Price must be a number';
    } else if (formData.price && parseFloat(formData.price) < 0) {
      newErrors.price = 'Price must be positive';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });
    
    try {
      const token = localStorage.getItem('token');
      
      // Prepare data for API
      const apiData = {
        ...formData,
        as: formData.as || null,
        da: formData.da || null,
        dr: formData.dr || null,
        ahrefs_traffic: formData.ahrefs_traffic || null,
        ahrefs_keywords: formData.ahrefs_keywords || null,
        semrush_traffic: formData.semrush_traffic || null,
        semrush_countries: formData.semrush_countries || null,
        price: formData.price || null
      };
      
      const response = await fetch('https://api.glassworld06.com/api/guest-posting-sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(apiData)
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ 
          success: true, 
          message: 'Guest posting site created successfully!' 
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/admin/guest-posting-sites');
        }, 2000);
      } else {
        // Handle validation errors from backend
        if (responseData.errors) {
          const backendErrors = {};
          Object.keys(responseData.errors).forEach(key => {
            backendErrors[key] = responseData.errors[key][0];
          });
          setErrors(backendErrors);
          throw new Error('Validation failed');
        }
        throw new Error(responseData.message || 'Failed to create site');
      }
    } catch (error) {
      console.error('Error creating site:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.message || 'Error creating site. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Add New Guest Posting Site</h1>
            <p className="text-gray-600 mt-2">Fill in the details of the guest posting site</p>
          </div>

          {/* Status Message */}
          {submitStatus.message && (
            <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Website URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.website_url ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.website_url && (
                    <p className="mt-1 text-sm text-red-600">{errors.website_url}</p>
                  )}
                </div>

                {/* Niche */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niche *
                  </label>
                  <select
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.niche ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select a niche</option>
                    {niches.map(niche => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                  {errors.niche && (
                    <p className="mt-1 text-sm text-red-600">{errors.niche}</p>
                  )}
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Metrics Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Site Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* AS */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AS (Authority Score)
                    </label>
                    <input
                      type="number"
                      name="as"
                      value={formData.as}
                      onChange={handleChange}
                      placeholder="e.g., 12345"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* DA */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DA (Domain Authority)
                    </label>
                    <input
                      type="number"
                      name="da"
                      value={formData.da}
                      onChange={handleChange}
                      placeholder="0-100"
                      min="0"
                      max="100"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.da ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.da && (
                      <p className="mt-1 text-sm text-red-600">{errors.da}</p>
                    )}
                  </div>

                  {/* DR */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DR (Domain Rating)
                    </label>
                    <input
                      type="number"
                      name="dr"
                      value={formData.dr}
                      onChange={handleChange}
                      placeholder="0-100"
                      min="0"
                      max="100"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.dr ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.dr && (
                      <p className="mt-1 text-sm text-red-600">{errors.dr}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>
                </div>

                {/* Ahrefs & SEMrush Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ahrefs Traffic
                    </label>
                    <input
                      type="number"
                      name="ahrefs_traffic"
                      value={formData.ahrefs_traffic}
                      onChange={handleChange}
                      placeholder="Monthly traffic"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ahrefs Keywords
                    </label>
                    <input
                      type="number"
                      name="ahrefs_keywords"
                      value={formData.ahrefs_keywords}
                      onChange={handleChange}
                      placeholder="Number of keywords"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEMrush Traffic
                    </label>
                    <input
                      type="number"
                      name="semrush_traffic"
                      value={formData.semrush_traffic}
                      onChange={handleChange}
                      placeholder="Monthly traffic"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEMrush Countries
                    </label>
                    <input
                      type="number"
                      name="semrush_countries"
                      value={formData.semrush_countries}
                      onChange={handleChange}
                      placeholder="Number of countries"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Allowed Content Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Allowed Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sports Allowed */}
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sports_allowed"
                      checked={formData.sports_allowed}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-medium text-gray-700">Sports Content Allowed</span>
                      <p className="text-sm text-gray-500">Can publish sports-related articles</p>
                    </div>
                  </label>

                  {/* Pharmacy Allowed */}
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="pharmacy_allowed"
                      checked={formData.pharmacy_allowed}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-medium text-gray-700">Pharmacy Content Allowed</span>
                      <p className="text-sm text-gray-500">Can publish pharmacy/health-related articles</p>
                    </div>
                  </label>

                  {/* Crypto Allowed */}
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="crypto_allowed"
                      checked={formData.crypto_allowed}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-medium text-gray-700">Crypto Content Allowed</span>
                      <p className="text-sm text-gray-500">Can publish cryptocurrency-related articles</p>
                    </div>
                  </label>

                  {/* Foreign Language Allowed */}
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="foreign_lang_allowed"
                      checked={formData.foreign_lang_allowed}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-medium text-gray-700">Foreign Languages Allowed</span>
                      <p className="text-sm text-gray-500">Can publish articles in languages other than main site language</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Link Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Link Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Link Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link Type
                    </label>
                    <select
                      name="link_type"
                      value={formData.link_type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="dofollow">Dofollow</option>
                      <option value="nofollow">Nofollow</option>
                      <option value="sponsored">Sponsored</option>
                    </select>
                  </div>

                  {/* Link Validity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link Validity
                    </label>
                    <select
                      name="link_validity"
                      value={formData.link_validity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="permanent">Permanent</option>
                      <option value="temporary">Temporary</option>
                      <option value="30_days">30 Days</option>
                      <option value="60_days">60 Days</option>
                      <option value="90_days">90 Days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/guest-posting-sites')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  'Create Site'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}