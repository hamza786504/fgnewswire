"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GuestPostingSitePage() {
  const params = useParams();
  const slug = params.slug;

  const [isLoading, setIsLoading] = useState(true);
  const [site, setSite] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: "ste******",
      date: "October 28, 2021",
      review: "Great work! I appreciate that you put the keywords in the URL of each blog post.",
      rating: 5,
    },
    {
      name: "wil*****",
      date: "August 27, 2022",
      review: "Delivery is fast and definitely look like quality content. Awesome.",
      rating: 5,
    },
    {
      name: "taj******",
      date: "October 20, 2022",
      review: "Good",
      rating: 5,
    },
  ]);


  const [newReview, setNewReview] = useState({ name: "", review: "", rating: 5 });

  const parsedImages = site?.images ? JSON.parse(site.images) : [];


  // Parse services from the site data
  const parseServices = () => {
    if (!site?.services) return { order_types: [], article_niches: [], word_options: [] };

    try {
      // If services is a string, parse it
      if (typeof site.services === 'string') {
        return JSON.parse(site.services);
      }
      // If it's already an object, return it
      return site.services;
    } catch (e) {
      console.error('Error parsing services:', e);
      return { order_types: [], article_niches: [], word_options: [] };
    }
  };

  const services = parseServices();

  // Add state for selected services
  const [selectedServices, setSelectedServices] = useState({
    order_type: null,
    article_niche: null,
    word_option: null
  });

  // Add state for total price
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price whenever selections change
  useEffect(() => {
    let calculatedTotal = parseFloat(site?.price || 0);

    // Add selected order type price
    if (selectedServices.order_type) {
      const orderType = services.order_types?.find(ot => ot.name === selectedServices.order_type);
      if (orderType?.price) {
        calculatedTotal += parseFloat(orderType.price);
      }
    }

    // Add selected article niche price
    if (selectedServices.article_niche) {
      const articleNiche = services.article_niches?.find(an => an.name === selectedServices.article_niche);
      if (articleNiche?.price) {
        calculatedTotal += parseFloat(articleNiche.price);
      }
    }

    // Add selected word option price
    if (selectedServices.word_option) {
      const wordOption = services.word_options?.find(wo => wo.name === selectedServices.word_option);
      if (wordOption?.price) {
        calculatedTotal += parseFloat(wordOption.price);
      }
    }

    setTotalPrice(calculatedTotal);
  }, [selectedServices, site, services]);

  // Handler for service changes
  const handleServiceChange = (serviceType, value) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceType]: value
    }));
  };

  // Format price helper
  const formatPrice = (price) => {
    return parseFloat(price || 0).toFixed(2);
  };

  // Get checkout URL with selected services
  const getCheckoutUrl = () => {
    

    return `/dashboard`;
  };



  // Fetch site data on component mount
  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        setIsLoading(true);


        const response = await fetch(`https://api.glassworld06.com/api/guest-posting-sites/${slug}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch site data: ${response.status}`);
        }

        const data = await response.json();
        setSite(data);

        console.log(data);

      } catch (err) {
        console.error('Failed to fetch site:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchSiteData();
    }
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) return;
    setReviews([{ ...newReview, date: new Date().toDateString() }, ...reviews]);
    setNewReview({ name: "", review: "", rating: 5 });
    setShowForm(false);
  };

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => r.rating === star).length
  );

  // Calculate price based on metrics
  const calculatePrice = () => {
    const basePrice = 150.90;
    const da = site?.metrics?.da || 0;

    if (da >= 80) return (basePrice * 2.5).toFixed(2);
    if (da >= 70) return (basePrice * 2).toFixed(2);
    if (da >= 60) return (basePrice * 1.5).toFixed(2);
    if (da >= 50) return basePrice.toFixed(2);
    return (basePrice * 0.8).toFixed(2);
  };

  // Get main image - WITH STORAGE PATH
  const baseStorageUrl = "https://api.glassworld06.com/storage/";
  const mainImage = parsedImages?.[0]?.file
    ? `${baseStorageUrl}${parsedImages[0].file}`
    : site?.image
      ? `${baseStorageUrl}${site.image}`
      : "https://guestpostlinks.net/wp-content/smush-webp/2021/06/DA50-Package-10-Guest-Posts-Included.png.webp";

  // Get additional images for gallery - WITH STORAGE PATH
  const additionalImages = parsedImages?.slice(1)?.map(img => ({
    ...img,
    file: `${baseStorageUrl}${img.file}`  // Add storage path to each image
  })) || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !site) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Site</h1>
        <p className="text-gray-600">{error || 'Unable to load the guest posting site details.'}</p>
        <div className="mt-6 space-x-4">
          <Link
            href="/login"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/guest-posting-sites"
            className="inline-block bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Browse All Sites
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Product Info */}
      <div className="container mx-auto px-4 py-6">
        {/* Product Gallery and Summary */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Main Product Image */}
              <div className="mb-4 relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={mainImage}
                    alt={parsedImages?.[0]?.alt || site?.publication || "Guest Posting Site"}
                    className="w-full h-full object-contain"
                    width={1080}
                    height={1080}
                    loading="eager"
                  />
                </div>
              </div>

              {/* Image Gallery */}
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {additionalImages?.map((img, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={img.file}
                        alt={img.alt || `Site image ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Newsletter Signup - Mobile Only */}
            <div className="mt-6 block lg:hidden bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <div className="text-2xl mb-2">📬</div>
                <h3 className="font-bold text-lg mb-2">DON'T MISS UPDATES FROM US!</h3>
                <p className="text-gray-600 mb-4">
                  Sign up now for our newsletter to receive a list of newly added high DA sites and limited-time offers every week.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="E-mail Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="w-full lg:w-1/2">
            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              <span className='caplitalize'>Publish Guest Post on</span> {site.website_url} {site?.metrics?.da && `(DA${site.metrics.da}+)`}
            </h1>

            {/* Website URL */}
            {site?.website_url && (
              <div className="mb-4">
                <a
                  href={site.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <span className="mr-2">🌐</span>
                  {site.website_url}
                </a>
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 32 32" className="fill-current">
                    <path d="M16 1.333l3.467 11.2h11.2l-9.067 6.933 3.467 11.2-9.067-6.933-9.067 6.933 3.467-11.2-9.067-6.933h11.2z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">4.88 (27 Reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900">${calculatePrice()}</p>
              <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                {site?.services?.order_types?.map((type, index) => (
                  <span key={index} className="flex items-center">
                    <span className="mr-1">📰</span> {type}
                  </span>
                ))}
                <span className="flex items-center">
                  <span className="mr-1">🔗</span> Link Insertion
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-6">
              <ul className="space-y-2">
                {site?.features?.map((feature, index) => (
                  <li key={index} className="flex">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                )) || (
                    <>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span>High Quality Guest Post</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span>Do-Follow Contextual Links</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2">•</span>
                        <span>Real Traffic Website</span>
                      </li>
                    </>
                  )}
              </ul>
            </div>

            {/* Domain Metrics */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <img
                        src="https://guestpostlinks.net/wp-content/themes/gpl-child/images/ico_moz.svg"
                        alt="MOZ"
                        className="h-3 w-8 mr-2"
                      />
                      <span className="text-sm font-medium">DA</span>
                    </div>
                    <div className="text-2xl font-bold">{site?.metrics?.da || 'N/A'}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((site?.metrics?.da || 0) * 2, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <img
                        src="https://guestpostlinks.net/wp-content/themes/gpl-child/images/ico_moz.svg"
                        alt="MOZ"
                        className="h-3 w-8 mr-2"
                      />
                      <span className="text-sm font-medium">DR</span>
                    </div>
                    <div className="text-2xl font-bold">{site?.metrics?.dr || 'N/A'}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${Math.min((site?.metrics?.dr || 0) * 2, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Site Details */}
            {site?.description && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">About This Site:</h3>
                <p className="text-gray-700">{site.description}</p>
              </div>
            )}

            {/* Niches */}
            {site?.niches?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">Accepted Niches:</h3>
                <div className="flex flex-wrap gap-2">
                  {site.niches.map((niche, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {niche}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated Time */}
            <div className="mb-6">
              <p className="font-medium">
                <strong>Estimated publication time (TAT)</strong>: {site?.turnaround_time || '14 days'}
              </p>
            </div>

            {/* Publishing Rules */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold mb-2 flex items-center">
                <span className="mr-2">📌</span> Publishing Rules:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>You can select from available niche options</li>
                <li>Articles must be written in English</li>
                <li>Our editorial team may make changes to maintain quality and SEO standards</li>
                {site?.guidelines?.map((guideline, index) => (
                  <li key={index}>{guideline}</li>
                ))}
              </ul>
            </div>

            {/* Order Form */}
            <form className="space-y-6">
              {/* Order Type - DYNAMIC */}
              <div>
                <label className="block font-medium mb-2">
                  Order Type <span className="text-orange-400">*</span>
                </label>
                <div className="space-y-2">
                  {services.order_types?.length > 0 ? (
                    services.order_types.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`order-type-${index}`}
                          name="order-type"
                          value={option.name}
                          checked={selectedServices.order_type === option.name}
                          onChange={(e) => handleServiceChange('order_type', e.target.value)}
                          className="mr-2"
                          required
                        />
                        <label htmlFor={`order-type-${index}`} className="text-sm">
                          {option.name}
                          {option.price && parseFloat(option.price) > 0 && (
                            <span className="text-green-600 ml-1">(+${formatPrice(option.price)})</span>
                          )}
                        </label>
                      </div>
                    ))
                  ) : (
                    // Fallback to static options if no dynamic ones
                    [
                      "Article Publication (We will publish your article.)",
                      "Article Writing + Publication (We will write and publish the article.)",
                      "Link Insertion (Niche Edits) (1 Backlink,Subject to Approval)"
                    ].map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`order-type-${index}`}
                          name="order-type"
                          value={option}
                          className="mr-2"
                          defaultChecked={index === 0}
                        />
                        <label htmlFor={`order-type-${index}`} className="text-sm">
                          {option}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Article Niche - DYNAMIC */}
              <div>
                <label className="block font-medium mb-2">
                  Your Article Niche (Content Type) <span className="text-orange-400">*</span>
                </label>
                <div className="space-y-2">
                  {services.article_niches?.length > 0 ? (
                    services.article_niches.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`article-niche-${index}`}
                          name="article-niche"
                          value={option.name}
                          checked={selectedServices.article_niche === option.name}
                          onChange={(e) => handleServiceChange('article_niche', e.target.value)}
                          className="mr-2"
                          required
                        />
                        <label htmlFor={`article-niche-${index}`} className="text-sm">
                          {option.name}
                          {option.price && parseFloat(option.price) > 0 && (
                            <span className="text-green-600 ml-1">(+${formatPrice(option.price)})</span>
                          )}
                        </label>
                      </div>
                    ))
                  ) : (
                    // Fallback to static niches if no dynamic ones
                    (site?.niches?.map(niche => ({ label: niche, price: niche.includes('restricted') ? 150 : 0 })) || [
                      { label: "General Niche", price: 0 },
                      { label: "Sports/iGaming, Crypto", price: 150 },
                      { label: "Pharmacy, Restricted Beverages", price: 150 },
                      { label: "Loan and Trading", price: 150 }
                    ]).map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`niche-${index}`}
                          name="article-niche"
                          value={option.label}
                          className="mr-2"
                          defaultChecked={index === 0}
                        />
                        <label htmlFor={`niche-${index}`} className="text-sm">
                          {option.label}
                          {option.price > 0 && (
                            <span className="text-green-600 ml-1">(+${option.price}.00)</span>
                          )}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Writing Service - DYNAMIC (Word Options) */}
              <div>
                <label className="block font-medium mb-2">Article Writing Service</label>
                <div className="space-y-2">
                  {services.word_options?.length > 0 ? (
                    <>
                      {/* "None" option */}
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="word-option-none"
                          name="writing-service"
                          value=""
                          checked={!selectedServices.word_option}
                          onChange={(e) => handleServiceChange('word_option', '')}
                          className="mr-2"
                        />
                        <label htmlFor="word-option-none" className="text-sm">
                          None
                        </label>
                      </div>

                      {/* Dynamic word options */}
                      {services.word_options.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="radio"
                            id={`writing-${index}`}
                            name="writing-service"
                            value={option.name}
                            checked={selectedServices.word_option === option.name}
                            onChange={(e) => handleServiceChange('word_option', e.target.value)}
                            className="mr-2"
                          />
                          <label htmlFor={`writing-${index}`} className="text-sm">
                            {option.name}
                            {option.price && parseFloat(option.price) > 0 && (
                              <span className="text-green-600 ml-1">(+${formatPrice(option.price)})</span>
                            )}
                          </label>
                        </div>
                      ))}
                    </>
                  ) : (
                    // Fallback to static options
                    [
                      { label: "None", price: 0 },
                      { label: "600+ Words Article", price: 100 },
                      { label: "1000+ Words Article", price: 150 },
                      { label: "1500+ Words Article", price: 200 }
                    ].map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`writing-${index}`}
                          name="writing-service"
                          value={option.label}
                          className="mr-2"
                          defaultChecked={index === 0}
                        />
                        <label htmlFor={`writing-${index}`} className="text-sm">
                          {option.label}
                          {option.price > 0 && (
                            <span className="text-green-600 ml-1">(+${option.price}.00)</span>
                          )}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Price Summary - ADD THIS SECTION */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Base Price:</span>
                  <span className="font-bold">${formatPrice(site?.price || 0)}</span>
                </div>

                {selectedServices.order_type && (
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Order Type ({selectedServices.order_type}):</span>
                    <span>+${formatPrice(
                      services.order_types?.find(ot => ot.name === selectedServices.order_type)?.price || 0
                    )}</span>
                  </div>
                )}

                {selectedServices.article_niche && (
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Article Niche ({selectedServices.article_niche}):</span>
                    <span>+${formatPrice(
                      services.article_niches?.find(an => an.name === selectedServices.article_niche)?.price || 0
                    )}</span>
                  </div>
                )}

                {selectedServices.word_option && (
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Writing Service ({selectedServices.word_option}):</span>
                    <span>+${formatPrice(
                      services.word_options?.find(wo => wo.name === selectedServices.word_option)?.price || 0
                    )}</span>
                  </div>
                )}

                <div className="border-t border-blue-200 mt-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-800">Total:</span>
                    <span className="font-bold text-2xl text-blue-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                <p>
                  <u>Note</u>: After checkout, you will be redirected to Requirement Page, where you can upload the <b>Article, Anchor Text, Target URL</b>, or any other details.
                </p>
              </div>

              {/* Add to Cart - UPDATED */}
              <Link
                href={getCheckoutUrl()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors hover:opacity-90"
                onClick={(e) => {
                  // Validate required selections
                  if (!selectedServices.order_type || !selectedServices.article_niche) {
                    e.preventDefault();
                    alert('Please select Order Type and Article Niche before proceeding to checkout.');
                  }
                }}
              >
                <svg width="24" height="24" viewBox="0 0 32 32" className="fill-current mr-2">
                  <path d="M25.248 22.4l3.552-14.4h-18.528l-0.96-4.8h-6.112v3.2h3.488l3.2 16h15.36zM24.704 11.2l-1.968 8h-10.24l-1.6-8h13.808z"></path>
                  <path d="M25.6 26.4c0 1.325-1.075 2.4-2.4 2.4s-2.4-1.075-2.4-2.4c0-1.325 1.075-2.4 2.4-2.4s2.4 1.075 2.4 2.4z"></path>
                  <path d="M14.4 26.4c0 1.325-1.075 2.4-2.4 2.4s-2.4-1.075-2.4-2.4c0-1.325 1.075-2.4 2.4-2.4s2.4 1.075 2.4 2.4z"></path>
                </svg>
                Buy Now - ${totalPrice.toFixed(2)}
              </Link>

              {/* Money Back Guarantee */}
              <div className="flex items-center justify-center p-4 border border-green-200 rounded-lg bg-green-50">
                <img
                  src="https://guestpostlinks.net/wp-content/uploads/money-back-guarantee.svg"
                  alt="Money Protection Guarantee"
                  className="w-12 h-12 mr-3"
                />
                <div>
                  <p className="font-semibold">Money Protection Guarantee</p>
                  <p className="text-sm">Guest Post Published or Your Money Back.</p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Newsletter Signup - Desktop Only */}
        <div className="hidden lg:block mt-12 max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl mb-2">📬</div>
            <h3 className="font-bold text-xl mb-2">DON'T MISS UPDATES FROM US!</h3>
            <p className="text-gray-600 mb-4">
              Sign up now for our newsletter to receive a list of newly added high DA sites and limited-time offers every week.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-mail Address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="w-full px-4 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Left: Ratings Summary */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Ratings</h2>
            <div className="flex items-center space-x-3">
              <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
              <div>
                <div className="flex text-yellow-400 text-xl">
                  {"★".repeat(Math.round(averageRating))}
                  {"☆".repeat(5 - Math.round(averageRating))}
                </div>
                <p className="text-gray-500 text-sm">{reviews.length} Publisher Ratings</p>
              </div>
            </div>

            {/* Progress bars */}
            <div className="mt-4 space-y-1">
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="flex items-center space-x-2">
                  <span className="w-4 text-sm">{star}</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded">
                    <div
                      className="h-2 rounded bg-gradient-to-r from-blue-500 to-purple-700"
                      style={{
                        width: `${(ratingCounts[i] / reviews.length) * 100 || 0
                          }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{ratingCounts[i]}</span>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 hover:opacity-90"
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Right: Reviews List */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {reviews.map((r, i) => (
                <div key={i} className="border-b border-gray-200 pb-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{r.name}</p>
                    <div className="text-yellow-400">
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{r.date}</p>
                  <p className="mt-2 text-gray-700">{r.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded-lg"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                />
                <textarea
                  placeholder="Your Review"
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview({ ...newReview, review: e.target.value })
                  }
                />
                <select
                  className="w-full p-2 border rounded-lg"
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                  }
                >
                  {[5, 4, 3, 2, 1].map((s) => (
                    <option key={s} value={s}>
                      {s} Star{s > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 hover:opacity-90"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2 rounded-lg border"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}