'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BiCheck, BiUpload, BiPlus, BiTrash } from 'react-icons/bi';

export default function CreateGuestPostingSite() {
  const router = useRouter();
  
  // Initial form state matching API structure
  const [formData, setFormData] = useState({
    website_url: '',
    publication: '',
    niche: '',
    language: 'English',
    country: 'USA',
    description: '',
    p_rules: '',
    sponsored: false,
    indexed: false,
    do_follow: true,
    sports_allowed: false,
    pharmacy_allowed: false,
    crypto_allowed: false,
    foreign_lang_allowed: false,
    link_type: 'Text',
    link_validity: 'Permanent',
    price: '',
    credit: 5
  });

  // Metrics as object (not array)
  const [metrics, setMetrics] = useState({
    da: '',
    dr: '',
    ahrefs_traffic: '',
    ahrefs_keywords: '',
    semrush_traffic: '',
    semrush_countries: ''
  });

  // Services as object with arrays
  const [orderTypes, setOrderTypes] = useState([{ value: '' }]);
  const [articleNiches, setArticleNiches] = useState([{ value: '' }]);
  const [wordOptions, setWordOptions] = useState([{ value: '' }]);

  // Files state
  const [mainImage, setMainImage] = useState(null);
  const [exampleImage, setExampleImage] = useState(null);
  const [guidelinesPdf, setGuidelinesPdf] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([{ file: null, alt: '' }]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  // Dynamic options for select fields
  const niches = ['Technology', 'Health', 'Finance', 'Business', 'Marketing', 'Lifestyle', 
                 'Education', 'Travel', 'Sports', 'Entertainment', 'General', 'Real Estate',
                 'Beauty', 'Food', 'Gaming', 'Fashion', 'Automotive', 'Home Improvement'];
  
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
                    'Russian', 'Chinese', 'Japanese', 'Arabic', 'Hindi', 'Korean'];
  
  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 
                    'Italy', 'India', 'China', 'Japan', 'Brazil', 'Mexico', 'Netherlands',
                    'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria'];
  
  const linkTypes = ['Text', 'Image', 'Guest Post', 'Sponsored Post', 'Editorial', 'Review', 'Press Release'];
  const linkValidities = ['Permanent', 'Temporary', '30 Days', '60 Days', '90 Days', '6 Months', '1 Year'];

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle metrics changes
  const handleMetricsChange = (field, value) => {
    setMetrics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle order types changes
  const handleOrderTypeChange = (index, value) => {
    const updated = [...orderTypes];
    updated[index] = { value };
    setOrderTypes(updated);
  };

  // Add new order type
  const addOrderType = () => {
    setOrderTypes([...orderTypes, { value: '' }]);
  };

  // Remove order type
  const removeOrderType = (index) => {
    if (orderTypes.length > 1) {
      const updated = orderTypes.filter((_, i) => i !== index);
      setOrderTypes(updated);
    }
  };

  // Handle article niches changes
  const handleArticleNicheChange = (index, value) => {
    const updated = [...articleNiches];
    updated[index] = { value };
    setArticleNiches(updated);
  };

  // Add new article niche
  const addArticleNiche = () => {
    setArticleNiches([...articleNiches, { value: '' }]);
  };

  // Remove article niche
  const removeArticleNiche = (index) => {
    if (articleNiches.length > 1) {
      const updated = articleNiches.filter((_, i) => i !== index);
      setArticleNiches(updated);
    }
  };

  // Handle word options changes
  const handleWordOptionChange = (index, value) => {
    const updated = [...wordOptions];
    updated[index] = { value };
    setWordOptions(updated);
  };

  // Add new word option
  const addWordOption = () => {
    setWordOptions([...wordOptions, { value: '' }]);
  };

  // Remove word option
  const removeWordOption = (index) => {
    if (wordOptions.length > 1) {
      const updated = wordOptions.filter((_, i) => i !== index);
      setWordOptions(updated);
    }
  };

  // Handle main image upload
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  // Handle example image upload
  const handleExampleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExampleImage(file);
    }
  };

  // Handle PDF upload
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setGuidelinesPdf(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  // Handle additional images
  const handleAdditionalImageChange = (index, file) => {
    const updated = [...additionalImages];
    updated[index] = { ...updated[index], file };
    setAdditionalImages(updated);
  };

  const updateImageAlt = (index, alt) => {
    const updated = [...additionalImages];
    updated[index] = { ...updated[index], alt };
    setAdditionalImages(updated);
  };

  const addAdditionalImage = () => {
    setAdditionalImages([...additionalImages, { file: null, alt: '' }]);
  };

  const removeAdditionalImage = (index) => {
    if (additionalImages.length > 1) {
      const updated = additionalImages.filter((_, i) => i !== index);
      setAdditionalImages(updated);
    } else {
      // Reset the single image
      setAdditionalImages([{ file: null, alt: '' }]);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.website_url.trim()) {
      newErrors.website_url = 'Website URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.website_url)) {
      newErrors.website_url = 'Please enter a valid URL';
    }
    
    if (!formData.niche.trim()) {
      newErrors.niche = 'Niche is required';
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (formData.credit && (formData.credit < 0 || formData.credit > 100)) {
      newErrors.credit = 'Credit must be between 0 and 100';
    }
    
    // Validate order types
    orderTypes.forEach((item, index) => {
      if (!item.value.trim()) {
        newErrors[`order_type_${index}`] = 'Order type is required';
      }
    });
    
    // Validate article niches
    articleNiches.forEach((item, index) => {
      if (!item.value.trim()) {
        newErrors[`article_niche_${index}`] = 'Article niche is required';
      }
    });
    
    // Validate word options
    wordOptions.forEach((item, index) => {
      if (!item.value.trim()) {
        newErrors[`word_option_${index}`] = 'Word option is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Prepare FormData for multipart upload
      const formDataToSend = new FormData();
      
      // Add form data - ensure boolean fields are actual booleans
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          // Convert boolean fields to actual booleans
          if (['sponsored', 'indexed', 'do_follow', 'sports_allowed', 
               'pharmacy_allowed', 'crypto_allowed', 'foreign_lang_allowed'].includes(key)) {
            formDataToSend.append(key, formData[key] ? '1' : '0');
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });
      
      // Add metrics as JSON string (object format)
      const formattedMetrics = {};
      Object.keys(metrics).forEach(key => {
        if (metrics[key] !== '' && metrics[key] !== null) {
          formattedMetrics[key] = parseInt(metrics[key]) || metrics[key];
        }
      });
      
      if (Object.keys(formattedMetrics).length > 0) {
        formDataToSend.append('metrics', JSON.stringify(formattedMetrics));
      }
      
      // Format services as object with arrays
      const formattedServices = {
        order_types: orderTypes
          .filter(item => item.value.trim())
          .map(item => item.value.trim()),
        article_niches: articleNiches
          .filter(item => item.value.trim())
          .map(item => item.value.trim()),
        word_options: wordOptions
          .filter(item => item.value.trim())
          .map(item => item.value.trim())
      };
      
      // Add services as JSON string
      formDataToSend.append('services', JSON.stringify(formattedServices));
      
      // Add files
      if (mainImage) {
        formDataToSend.append('image', mainImage);
      } else {
        formDataToSend.append('image', 'placeholder.jpg');
      }
      
      if (exampleImage) {
        formDataToSend.append('example_image', exampleImage);
      } else {
        formDataToSend.append('example_image', 'sample.jpg');
      }
      
      if (guidelinesPdf) {
        formDataToSend.append('guidelines_pdf', guidelinesPdf);
      } else {
        formDataToSend.append('guidelines_pdf', 'guideline.pdf');
      }
      
      // Add additional images
      additionalImages.forEach((image, index) => {
        if (image.file) {
          formDataToSend.append(`images[${index}][file]`, image.file);
        } else {
          formDataToSend.append(`images[${index}][file]`, `placeholder${index + 1}.jpg`);
        }
        formDataToSend.append(`images[${index}][alt]`, image.alt || `Image ${index + 1}`);
      });
      
      console.log('Sending form data:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      
      const response = await fetch('https://api.glassworld06.com/api/guest-posting-sites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ 
          success: true, 
          message: 'Guest posting site created successfully!' 
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/admin/sites');
        }, 2000);
      } else {
        console.log('API Error Response:', responseData);
        if (responseData.errors) {
          const backendErrors = {};
          Object.keys(responseData.errors).forEach(key => {
            backendErrors[key] = Array.isArray(responseData.errors[key]) 
              ? responseData.errors[key][0] 
              : responseData.errors[key];
          });
          setErrors(backendErrors);
          throw new Error('Validation failed');
        }
        throw new Error(responseData.message || `Failed to create site (Status: ${response.status})`);
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Add New Guest Posting Site</h1>
            <p className="text-gray-600 mt-2">Complete all required fields to add a new guest posting site</p>
          </div>

          {/* Status Message */}
          {submitStatus.message && (
            <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              <div className="flex items-center">
                {submitStatus.success ? (
                  <BiCheck className="w-5 h-5 mr-2" />
                ) : (
                  <span className="mr-2">⚠️</span>
                )}
                <span>{submitStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
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
                      required
                    />
                    {errors.website_url && (
                      <p className="mt-1 text-sm text-red-600">{errors.website_url}</p>
                    )}
                  </div>

                  {/* Publication Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publication Name
                    </label>
                    <input
                      type="text"
                      name="publication"
                      value={formData.publication}
                      onChange={handleChange}
                      placeholder="Example Publication"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
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
                      required
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

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="100.00"
                      step="0.01"
                      min="0"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                    )}
                  </div>

                  {/* Credit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credit
                    </label>
                    <input
                      type="number"
                      name="credit"
                      value={formData.credit}
                      onChange={handleChange}
                      placeholder="5"
                      min="0"
                      max="100"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.credit ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.credit && (
                      <p className="mt-1 text-sm text-red-600">{errors.credit}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Description here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Posting Rules */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posting Rules
                  </label>
                  <textarea
                    name="p_rules"
                    value={formData.p_rules}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Posting rules..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Metrics Section */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Site Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* DA */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DA (Domain Authority)
                    </label>
                    <input
                      type="number"
                      value={metrics.da}
                      onChange={(e) => handleMetricsChange('da', e.target.value)}
                      placeholder="45"
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* DR */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DR (Domain Rating)
                    </label>
                    <input
                      type="number"
                      value={metrics.dr}
                      onChange={(e) => handleMetricsChange('dr', e.target.value)}
                      placeholder="30"
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Ahrefs Traffic */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ahrefs Traffic
                    </label>
                    <input
                      type="number"
                      value={metrics.ahrefs_traffic}
                      onChange={(e) => handleMetricsChange('ahrefs_traffic', e.target.value)}
                      placeholder="1200"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Ahrefs Keywords */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ahrefs Keywords
                    </label>
                    <input
                      type="number"
                      value={metrics.ahrefs_keywords}
                      onChange={(e) => handleMetricsChange('ahrefs_keywords', e.target.value)}
                      placeholder="300"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* SEMrush Traffic */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEMrush Traffic
                    </label>
                    <input
                      type="number"
                      value={metrics.semrush_traffic}
                      onChange={(e) => handleMetricsChange('semrush_traffic', e.target.value)}
                      placeholder="1000"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* SEMrush Countries */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEMrush Countries
                    </label>
                    <input
                      type="number"
                      value={metrics.semrush_countries}
                      onChange={(e) => handleMetricsChange('semrush_countries', e.target.value)}
                      placeholder="2"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Services Offered</h3>
                
                {/* Order Types */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Order Types *
                  </label>
                  <div className="space-y-3">
                    {orderTypes.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => handleOrderTypeChange(index, e.target.value)}
                            placeholder="e.g., Sponsored Post, Editorial"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors[`order_type_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors[`order_type_${index}`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`order_type_${index}`]}</p>
                          )}
                        </div>
                        {orderTypes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeOrderType(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <BiTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addOrderType}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <BiPlus className="h-5 w-5 mr-2" />
                      Add Order Type
                    </button>
                  </div>
                </div>

                {/* Article Niches */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Article Niches *
                  </label>
                  <div className="space-y-3">
                    {articleNiches.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => handleArticleNicheChange(index, e.target.value)}
                            placeholder="e.g., Tech, Business"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors[`article_niche_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors[`article_niche_${index}`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`article_niche_${index}`]}</p>
                          )}
                        </div>
                        {articleNiches.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArticleNiche(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <BiTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addArticleNiche}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <BiPlus className="h-5 w-5 mr-2" />
                      Add Article Niche
                    </button>
                  </div>
                </div>

                {/* Word Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Word Options *
                  </label>
                  <div className="space-y-3">
                    {wordOptions.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => handleWordOptionChange(index, e.target.value)}
                            placeholder="e.g., 500 words, 1000 words, 1500 words"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors[`word_option_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors[`word_option_${index}`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`word_option_${index}`]}</p>
                          )}
                        </div>
                        {wordOptions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWordOption(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <BiTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addWordOption}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <BiPlus className="h-5 w-5 mr-2" />
                      Add Word Option
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Settings */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Allowed Content Types */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Allowed Content</h4>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sports_allowed"
                        checked={formData.sports_allowed}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Sports Content Allowed</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="pharmacy_allowed"
                        checked={formData.pharmacy_allowed}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Pharmacy Content Allowed</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="crypto_allowed"
                        checked={formData.crypto_allowed}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Crypto Content Allowed</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="foreign_lang_allowed"
                        checked={formData.foreign_lang_allowed}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Foreign Languages Allowed</span>
                    </label>
                  </div>

                  {/* Link Settings */}
                  <div className="space-y-4">
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
                        {linkTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

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
                        {linkValidities.map(validity => (
                          <option key={validity} value={validity}>{validity}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="sponsored"
                          checked={formData.sponsored}
                          onChange={handleChange}
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Sponsored</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="indexed"
                          checked={formData.indexed}
                          onChange={handleChange}
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Indexed</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="do_follow"
                          checked={formData.do_follow}
                          onChange={handleChange}
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Do-Follow</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Uploads */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">File Uploads</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Main Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      {mainImage ? (
                        <div className="space-y-2">
                          <p className="text-sm text-green-600">✓ {mainImage.name}</p>
                          <button
                            type="button"
                            onClick={() => setMainImage(null)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <BiUpload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-1 text-sm text-gray-600">Upload or use placeholder.jpg</p>
                          <input
                            type="file"
                            onChange={handleMainImageChange}
                            accept="image/*"
                            className="hidden"
                            id="mainImage"
                          />
                          <label
                            htmlFor="mainImage"
                            className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700"
                          >
                            Choose File
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Example Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Example Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      {exampleImage ? (
                        <div className="space-y-2">
                          <p className="text-sm text-green-600">✓ {exampleImage.name}</p>
                          <button
                            type="button"
                            onClick={() => setExampleImage(null)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <BiUpload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-1 text-sm text-gray-600">Upload or use sample.jpg</p>
                          <input
                            type="file"
                            onChange={handleExampleImageChange}
                            accept="image/*"
                            className="hidden"
                            id="exampleImage"
                          />
                          <label
                            htmlFor="exampleImage"
                            className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700"
                          >
                            Choose File
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Guidelines PDF */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guidelines PDF
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      {guidelinesPdf ? (
                        <div className="space-y-2">
                          <p className="text-sm text-green-600">✓ {guidelinesPdf.name}</p>
                          <button
                            type="button"
                            onClick={() => setGuidelinesPdf(null)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <BiUpload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-1 text-sm text-gray-600">Upload or use guideline.pdf</p>
                          <input
                            type="file"
                            onChange={handlePdfChange}
                            accept=".pdf"
                            className="hidden"
                            id="guidelinesPdf"
                          />
                          <label
                            htmlFor="guidelinesPdf"
                            className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700"
                          >
                            Choose File
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Images */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Additional Images
                  </label>
                  <div className="space-y-4">
                    {additionalImages.map((image, index) => (
                      <div key={index} className="flex flex-col md:flex-row items-center gap-3 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                            {image.file ? (
                              <div className="space-y-2">
                                <p className="text-sm text-green-600">✓ {image.file.name}</p>
                                <button
                                  type="button"
                                  onClick={() => handleAdditionalImageChange(index, null)}
                                  className="text-sm text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <div>
                                <BiUpload className="mx-auto h-6 w-6 text-gray-400" />
                                <p className="mt-1 text-sm text-gray-600">Upload or use placeholder{index + 1}.jpg</p>
                                <input
                                  type="file"
                                  onChange={(e) => handleAdditionalImageChange(index, e.target.files[0])}
                                  accept="image/*"
                                  className="hidden"
                                  id={`additionalImage-${index}`}
                                />
                                <label
                                  htmlFor={`additionalImage-${index}`}
                                  className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700"
                                >
                                  Choose File
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={image.alt}
                            onChange={(e) => updateImageAlt(index, e.target.value)}
                            placeholder={`Alt text (e.g., Homepage section)`}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        {additionalImages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <BiTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAdditionalImage}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <BiPlus className="h-5 w-5 mr-2" />
                      Add Another Image
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/sites')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-700 text-white rounded-lg transition-colors flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
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