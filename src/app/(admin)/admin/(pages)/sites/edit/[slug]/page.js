'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiUpload, FiTrash2, FiPlus } from "react-icons/fi";

export default function EditGuestSite() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [formData, setFormData] = useState({
    website_url: '',
    publication: '',
    niche: '',
    language: '',
    country: '',
    sports_allowed: false,
    sponsored: false,
    indexed: false,
    do_follow: false,
    pharmacy_allowed: false,
    crypto_allowed: false,
    foreign_lang_allowed: false,
    link_type: '',
    link_validity: '',
    price: '',
    credit: '',
    p_rules: '',
    description: '',
    metrics: {
      da: '',
      dr: '',
      ahrefs_traffic: '',
      ahrefs_keywords: '',
      semrush_traffic: '',
      semrush_countries: ''
    },
    // Updated services structure
    services: {
      order_types: [{ name: '', price: '' }],
      article_niches: [{ name: '', price: '' }],
      word_options: [{ name: '', price: '' }]
    }
  });

  const [images, setImages] = useState([]);
  const [guidelinesPdf, setGuidelinesPdf] = useState(null);
  const [exampleImage, setExampleImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  // Fetch site data
  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          alert('Authentication required. Please login again.');
          router.push('admin/signin');
          return;
        }

        const res = await fetch(`https://api.glassworld06.com/api/guest-posting-sites/${slug}`, {
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch site data: ${res.status}`);
        }

        const site = await res.json();
        console.log('API Response:', site);
        setSiteData(site);

        // Parse metrics if it's a string
        let metricsData = {};
        if (site.metrics) {
          if (typeof site.metrics === 'string') {
            try {
              metricsData = JSON.parse(site.metrics);
            } catch (e) {
              console.error('Error parsing metrics:', e);
            }
          } else {
            metricsData = site.metrics;
          }
        }

        // Parse services if it's a string - Updated for new structure
        let servicesData = { 
          order_types: [{ name: '', price: '' }], 
          article_niches: [{ name: '', price: '' }], 
          word_options: [{ name: '', price: '' }] 
        };
        
        if (site.services) {
          if (typeof site.services === 'string') {
            try {
              const parsed = JSON.parse(site.services);
              // Ensure we have the new structure
              servicesData = {
                order_types: Array.isArray(parsed.order_types) 
                  ? parsed.order_types.map(item => ({ 
                      name: item.name || item.value || '', 
                      price: item.price || '' 
                    }))
                  : [{ name: '', price: '' }],
                article_niches: Array.isArray(parsed.article_niches)
                  ? parsed.article_niches.map(item => ({ 
                      name: item.name || item.value || '', 
                      price: item.price || '' 
                    }))
                  : [{ name: '', price: '' }],
                word_options: Array.isArray(parsed.word_options)
                  ? parsed.word_options.map(item => ({ 
                      name: item.name || item.value || '', 
                      price: item.price || '' 
                    }))
                  : [{ name: '', price: '' }]
              };
            } catch (e) {
              console.error('Error parsing services:', e);
            }
          } else {
            // Already an object, ensure it has the new structure
            servicesData = {
              order_types: Array.isArray(site.services.order_types)
                ? site.services.order_types.map(item => ({ 
                    name: item.name || item.value || '', 
                    price: item.price || '' 
                  }))
                : [{ name: '', price: '' }],
              article_niches: Array.isArray(site.services.article_niches)
                ? site.services.article_niches.map(item => ({ 
                    name: item.name || item.value || '', 
                    price: item.price || '' 
                  }))
                : [{ name: '', price: '' }],
              word_options: Array.isArray(site.services.word_options)
                ? site.services.word_options.map(item => ({ 
                    name: item.name || item.value || '', 
                    price: item.price || '' 
                  }))
                : [{ name: '', price: '' }]
            };
          }
        }

        // Initialize form with existing data
        setFormData({
          website_url: site.website_url || '',
          publication: site.publication || '',
          niche: site.niche || '',
          language: site.language || '',
          country: site.country || '',
          sports_allowed: site.sports_allowed || false,
          sponsored: site.sponsored || false,
          indexed: site.indexed || false,
          do_follow: site.do_follow || false,
          pharmacy_allowed: site.pharmacy_allowed || false,
          crypto_allowed: site.crypto_allowed || false,
          foreign_lang_allowed: site.foreign_lang_allowed || false,
          link_type: site.link_type || '',
          link_validity: site.link_validity || '',
          price: site.price || '',
          credit: site.credit || '',
          p_rules: site.p_rules || '',
          description: site.description || '',
          metrics: {
            da: metricsData.da || '',
            dr: metricsData.dr || '',
            ahrefs_traffic: metricsData.ahrefs_traffic || '',
            ahrefs_keywords: metricsData.ahrefs_keywords || '',
            semrush_traffic: metricsData.semrush_traffic || '',
            semrush_countries: metricsData.semrush_countries || ''
          },
          services: servicesData
        });

        // Initialize images
        let imagesArray = [];
        if (site.images) {
          if (typeof site.images === 'string') {
            try {
              imagesArray = JSON.parse(site.images);
            } catch (e) {
              console.error('Error parsing images:', e);
            }
          } else if (Array.isArray(site.images)) {
            imagesArray = site.images;
          }
        }

        if (Array.isArray(imagesArray) && imagesArray.length > 0) {
          setImages(imagesArray.map(img => ({
            ...img,
            preview: img.file ? `https://api.glassworld06.com/storage/${img.file}` : null,
            isNew: false
          })));
        }

        if (site.guidelines_pdf) {
          setGuidelinesPdf({
            name: 'Existing PDF',
            url: `https://api.glassworld06.com/storage/${site.guidelines_pdf}`,
            isNew: false
          });
        }

        if (site.example_image) {
          setExampleImage({
            name: 'Existing Image',
            url: `https://api.glassworld06.com/storage/${site.example_image}`,
            isNew: false
          });
        }

        if (site.image) {
          setMainImage({
            name: 'Main Image',
            url: `https://api.glassworld06.com/storage/${site.image}`,
            isNew: false
          });
        }
      } catch (error) {
        console.error('Error fetching site:', error);
        alert('Failed to load site data');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchSiteData();
    }
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMetricsChange = (metric, value) => {
    setFormData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: value
      }
    }));
  };

  // Updated services handlers for name and price
  const handleServicesChange = (category, index, field, value) => {
    const updatedServices = { ...formData.services };
    if (!Array.isArray(updatedServices[category])) {
      updatedServices[category] = [];
    }
    
    updatedServices[category] = [...updatedServices[category]];
    if (!updatedServices[category][index]) {
      updatedServices[category][index] = { name: '', price: '' };
    }
    
    updatedServices[category][index] = {
      ...updatedServices[category][index],
      [field]: value
    };

    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addServiceItem = (category) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [category]: [...(Array.isArray(prev.services[category]) ? prev.services[category] : []), { name: '', price: '' }]
      }
    }));
  };

  const removeServiceItem = (category, index) => {
    const updatedItems = (formData.services[category] || []).filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [category]: updatedItems
      }
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileObject = {
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      isNew: true
    };

    if (type === 'main') {
      setMainImage(fileObject);
    } else if (type === 'example') {
      setExampleImage(fileObject);
    } else if (type === 'guidelines') {
      setGuidelinesPdf(fileObject);
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      isNew: true
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Authentication required. Please login again.');
        router.push('/login');
        return;
      }

      // Prepare form data for multipart upload
      const formDataToSend = new FormData();

      // Add text fields - convert booleans to proper strings
      Object.keys(formData).forEach(key => {
        if (key === 'metrics' || key === 'services') {
          // Stringify nested objects
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key !== 'images') {
          const value = formData[key];
          
          // Handle boolean fields specifically for Laravel
          const booleanFields = [
            'sports_allowed', 'sponsored', 'indexed', 'do_follow',
            'pharmacy_allowed', 'crypto_allowed', 'foreign_lang_allowed'
          ];
          
          if (booleanFields.includes(key)) {
            // Convert boolean to string '1' for true, '0' for false
            formDataToSend.append(key, value ? '1' : '0');
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      // Add files - handle both new and existing files
      if (mainImage) {
        if (mainImage.isNew && mainImage.file) {
          // New file upload
          formDataToSend.append('image', mainImage.file);
        } else if (mainImage.url && !mainImage.isNew) {
          // Existing file - send as string
          const existingPath = mainImage.url.replace('https://api.glassworld06.com/storage/', '');
          formDataToSend.append('image', existingPath);
        }
      }

      if (exampleImage) {
        if (exampleImage.isNew && exampleImage.file) {
          formDataToSend.append('example_image', exampleImage.file);
        } else if (exampleImage.url && !exampleImage.isNew) {
          const existingPath = exampleImage.url.replace('https://api.glassworld06.com/storage/', '');
          formDataToSend.append('example_image', existingPath);
        }
      }

      if (guidelinesPdf) {
        if (guidelinesPdf.isNew && guidelinesPdf.file) {
          formDataToSend.append('guidelines_pdf', guidelinesPdf.file);
        } else if (guidelinesPdf.url && !guidelinesPdf.isNew) {
          const existingPath = guidelinesPdf.url.replace('https://api.glassworld06.com/storage/', '');
          formDataToSend.append('guidelines_pdf', existingPath);
        }
      }

      // Handle gallery images
      // First, collect existing images
      const existingImages = images.filter(img => !img.isNew);
      if (existingImages.length > 0) {
        const existingImagesData = existingImages.map(img => ({
          file: img.file ? img.file.replace('https://api.glassworld06.com/storage/', '') : img.file,
          alt: img.alt || ''
        }));
        formDataToSend.append('existing_images', JSON.stringify(existingImagesData));
      }

      // Add new gallery images
      const newImages = images.filter(img => img.isNew && img.file);
      newImages.forEach((img, index) => {
        formDataToSend.append(`images[${index}]`, img.file);
        formDataToSend.append(`images_alt[${index}]`, img.alt || `Image ${index + 1}`);
      });

      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ', typeof pair[1], ' - ', pair[1]);
      }

      // For updating API
      const res = await fetch(`https://api.glassworld06.com/api/guest-posting-sites/${slug}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const responseData = await res.json();
      console.log('Update response:', responseData);

      if (!res.ok) {
        const errorMessage = responseData.error || responseData.message || 'Failed to update site';
        if (responseData.errors) {
          const validationErrors = Object.entries(responseData.errors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          throw new Error(`Validation failed:\n${validationErrors}`);
        }
        throw new Error(errorMessage);
      }

      alert('Site updated successfully!');
      router.push('/admin/sites');

    } catch (error) {
      console.error('Update error:', error);
      alert(error.message || 'Failed to update site. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ebecf0] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading site data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="min-h-screen bg-[#ebecf0] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600">Site not found</p>
            <Link href="/admin/sites" className="text-blue-600 hover:underline mt-2 inline-block">
              Back to Sites
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#ebecf0] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/sites"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Sites
          </Link>

          <h1 className="text-2xl font-bold text-gray-800">
            Edit Guest Posting Site
          </h1>
          <p className="text-gray-600 mt-1">
            Update site details and metrics
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Website URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                  />
                </div>

                {/* Publication */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publication Name
                  </label>
                  <input
                    type="text"
                    name="publication"
                    value={formData.publication}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Publication name"
                  />
                </div>

                {/* Niche */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niche *
                  </label>
                  <input
                    type="text"
                    name="niche"
                    value={formData.niche}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Technology, Health, Business, etc."
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language *
                  </label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="English, Spanish, etc."
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="USA, UK, Canada, etc."
                  />
                </div>
              </div>
            </div>

            {/* Metrics Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Website Metrics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* DA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Moz DA
                  </label>
                  <input
                    type="number"
                    value={formData.metrics.da || ''}
                    onChange={(e) => handleMetricsChange('da', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                </div>

                {/* DR */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ahrefs DR
                  </label>
                  <input
                    type="number"
                    value={formData.metrics.dr || ''}
                    onChange={(e) => handleMetricsChange('dr', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                </div>

                {/* Ahrefs Traffic */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ahrefs Traffic
                  </label>
                  <input
                    type="number"
                    value={formData.metrics.ahrefs_traffic || ''}
                    onChange={(e) => handleMetricsChange('ahrefs_traffic', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Estimated traffic"
                  />
                </div>

                {/* Ahrefs Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ahrefs Keywords
                  </label>
                  <input
                    type="number"
                    value={formData.metrics.ahrefs_keywords || ''}
                    onChange={(e) => handleMetricsChange('ahrefs_keywords', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of keywords"
                  />
                </div>

                {/* Semrush Traffic */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semrush Traffic
                  </label>
                  <input
                    type="number"
                    value={formData.metrics.semrush_traffic || ''}
                    onChange={(e) => handleMetricsChange('semrush_traffic', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Estimated traffic"
                  />
                </div>

                {/* Semrush Countries */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semrush Countries
                  </label>
                  <input
                    type="number"
                    value={formData.metrics.semrush_countries || ''}
                    onChange={(e) => handleMetricsChange('semrush_countries', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of countries"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Details Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Pricing & Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="100.00"
                  />
                </div>

                {/* Credit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit
                  </label>
                  <input
                    type="number"
                    name="credit"
                    value={formData.credit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of credits"
                  />
                </div>

                {/* Link Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Type
                  </label>
                  <select
                    name="link_type"
                    value={formData.link_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select link type</option>
                    <option value="Text">Text</option>
                    <option value="Guest Post">Guest Post</option>
                    <option value="Sponsored">Sponsored</option>
                    <option value="Nofollow">Nofollow</option>
                  </select>
                </div>

                {/* Link Validity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Validity
                  </label>
                  <select
                    name="link_validity"
                    value={formData.link_validity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select validity</option>
                    <option value="Permanent">Permanent</option>
                    <option value="6 Months">6 Months</option>
                    <option value="1 Year">1 Year</option>
                    <option value="Lifetime">Lifetime</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Checkboxes Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Features & Permissions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'sports_allowed', label: 'Sports Allowed' },
                  { name: 'sponsored', label: 'Sponsored' },
                  { name: 'indexed', label: 'Indexed' },
                  { name: 'do_follow', label: 'Do-Follow' },
                  { name: 'pharmacy_allowed', label: 'Pharmacy Allowed' },
                  { name: 'crypto_allowed', label: 'Crypto Allowed' },
                  { name: 'foreign_lang_allowed', label: 'Foreign Language Allowed' }
                ].map(({ name, label }) => (
                  <div key={name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={name}
                      name={name}
                      checked={formData[name]}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={name} className="ml-2 text-sm text-gray-700">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section - UPDATED */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Services & Options
              </h2>

              {/* Order Types */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Order Types
                </label>
                <div className="space-y-3">
                  {(Array.isArray(formData.services.order_types) ? formData.services.order_types : []).map((item, index) => (
                    <div key={index} className="space-y-2 p-3 border border-gray-200 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            value={item.name || ''}
                            onChange={(e) => handleServicesChange('order_types', index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Order type name"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={item.price || ''}
                            onChange={(e) => handleServicesChange('order_types', index, 'price', e.target.value)}
                            step="0.01"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Price ($)"
                          />
                        </div>
                      </div>
                      {formData.services.order_types.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeServiceItem('order_types', index)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addServiceItem('order_types')}
                    className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                  >
                    <FiPlus className="mr-2" />
                    Add Order Type
                  </button>
                </div>
              </div>

              {/* Article Niches */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Article Niches
                </label>
                <div className="space-y-3">
                  {(Array.isArray(formData.services.article_niches) ? formData.services.article_niches : []).map((item, index) => (
                    <div key={index} className="space-y-2 p-3 border border-gray-200 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            value={item.name || ''}
                            onChange={(e) => handleServicesChange('article_niches', index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Niche name"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={item.price || ''}
                            onChange={(e) => handleServicesChange('article_niches', index, 'price', e.target.value)}
                            step="0.01"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Price ($)"
                          />
                        </div>
                      </div>
                      {formData.services.article_niches.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeServiceItem('article_niches', index)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addServiceItem('article_niches')}
                    className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                  >
                    <FiPlus className="mr-2" />
                    Add Article Niche
                  </button>
                </div>
              </div>

              {/* Word Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Word Options
                </label>
                <div className="space-y-3">
                  {(Array.isArray(formData.services.word_options) ? formData.services.word_options : []).map((item, index) => (
                    <div key={index} className="space-y-2 p-3 border border-gray-200 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            value={item.name || ''}
                            onChange={(e) => handleServicesChange('word_options', index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Word option"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={item.price || ''}
                            onChange={(e) => handleServicesChange('word_options', index, 'price', e.target.value)}
                            step="0.01"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Price ($)"
                          />
                        </div>
                      </div>
                      {formData.services.word_options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeServiceItem('word_options', index)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addServiceItem('word_options')}
                    className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                  >
                    <FiPlus className="mr-2" />
                    Add Word Option
                  </button>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Content
              </h2>

              <div className="space-y-4">
                {/* Posting Rules */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Posting Rules
                  </label>
                  <textarea
                    name="p_rules"
                    value={formData.p_rules}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter posting rules and requirements..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter detailed description..."
                  />
                </div>
              </div>
            </div>

            {/* Files Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Files & Images
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {mainImage ? (
                      <div>
                        <img
                          src={mainImage.preview || mainImage.url}
                          alt="Main preview"
                          className="h-32 w-auto mx-auto mb-2 object-cover rounded"
                        />
                        <p className="text-sm text-gray-600">{mainImage.name}</p>
                        <button
                          type="button"
                          onClick={() => setMainImage(null)}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                        <span className="mt-2 block text-sm text-gray-600">
                          Click to upload main image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'main')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Example Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Example Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {exampleImage ? (
                      <div>
                        <img
                          src={exampleImage.preview || exampleImage.url}
                          alt="Example preview"
                          className="h-32 w-auto mx-auto mb-2 object-cover rounded"
                        />
                        <p className="text-sm text-gray-600">{exampleImage.name}</p>
                        <button
                          type="button"
                          onClick={() => setExampleImage(null)}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                        <span className="mt-2 block text-sm text-gray-600">
                          Click to upload example image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'example')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Guidelines PDF */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guidelines PDF
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {guidelinesPdf ? (
                      <div>
                        <div className="h-32 flex items-center justify-center bg-gray-100 rounded mb-2">
                          <span className="text-gray-500">PDF File</span>
                        </div>
                        <p className="text-sm text-gray-600">{guidelinesPdf.name}</p>
                        <button
                          type="button"
                          onClick={() => setGuidelinesPdf(null)}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                        <span className="mt-2 block text-sm text-gray-600">
                          Click to upload PDF
                        </span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleImageUpload(e, 'guidelines')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Gallery Images */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gallery Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img.preview || img.file || img.url}
                            alt={img.alt || `Gallery ${index + 1}`}
                            className="h-32 w-full object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <label className="cursor-pointer flex items-center justify-center">
                      <FiUpload className="h-6 w-6 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        Click to upload more images
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t flex justify-end">
            <button
              type="button"
              onClick={() => router.push('/admin/sites')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-4"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Site'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}