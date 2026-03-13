"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaBox, FaDollarSign, FaCog } from "react-icons/fa";

export default function CreateOrder() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    // User selection
    user_id: "",
    user_type: "existing", // "existing" or "new"
    
    // New user fields
    name: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    address: "",
    
    // Order details
    item_type: "package", // "package" or "guest_posting"
    item_id: "",
    quantity: 1,
    price_index: 0,
    
    // Admin overrides
    use_custom_values: false,
    custom_price: "",
    custom_credit: "",
    
    // Services
    services: {},
  });

  // Dropdown options
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [guestPostingSites, setGuestPostingSites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  // ✅ Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch users (non-admin only)
        const usersRes = await fetch("https://api.glassworld06.com/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersData = await usersRes.json();
        setUsers(usersData.data?.filter(u => u.role !== "admin") || []);
        
        // Fetch packages - using your packages endpoint
        const packagesRes = await fetch("https://api.glassworld06.com/api/packages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const packagesData = await packagesRes.json();
        console.log("Fetched packages:", packagesData);
        setPackages(packagesData || []);
        
        // Fetch guest posting sites
        const sitesRes = await fetch("https://api.glassworld06.com/api/guest-posting-sites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sitesData = await sitesRes.json();
        setGuestPostingSites(sitesData.data || []);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setSubmitStatus({ 
          success: false, 
          message: "Failed to load required data. Please refresh the page." 
        });
      } finally {
        setFetchingData(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // ✅ Update selected item when item_id or item_type changes
  useEffect(() => {
    if (formData.item_type === "package") {
      const item = packages.find(p => p.id === parseInt(formData.item_id) || p.slug === formData.item_id);
      setSelectedItem(item);
      
      // Reset price index when package changes
      if (item && item.price && Array.isArray(item.price)) {
        setFormData(prev => ({ ...prev, price_index: 0 }));
      }
    } else if (formData.item_type === "guest_posting") {
      const item = guestPostingSites.find(s => s.id === parseInt(formData.item_id));
      setSelectedItem(item);
    }
  }, [formData.item_id, formData.item_type, packages, guestPostingSites]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // ✅ Handle user type change
  const handleUserTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      user_type: type,
      user_id: "", // Clear selected user when switching to new user
    }));
  };

  // ✅ Handle service selection
  const handleServiceChange = (serviceKey, value) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [serviceKey]: value,
      },
    }));
  };

  // ✅ Validate form
  const validateForm = () => {
    const newErrors = {};

    // User validation
    if (formData.user_type === "existing") {
      if (!formData.user_id) newErrors.user_id = "Please select a user";
    } else {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    // Order validation
    if (!formData.item_id) {
      newErrors.item_id = `Please select a ${formData.item_type.replace('_', ' ')}`;
    }
    
    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }

    // Custom values validation
    if (formData.use_custom_values) {
      if (!formData.custom_price || parseFloat(formData.custom_price) < 0) {
        newErrors.custom_price = "Please enter a valid price";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Format price display for package options
  const formatPackagePrice = (pkg, index) => {
    if (!pkg || !pkg.price || !Array.isArray(pkg.price)) return null;
    
    const priceValue = pkg.price[index];
    if (priceValue === undefined) return null;
    
    // Assuming price array represents tiered pricing
    // You might want to customize this based on your actual price structure
    const quantity = index + 1; // This is just an example - adjust based on your actual logic
    return `${quantity} press release${quantity > 1 ? 's' : ''} for $${parseFloat(priceValue).toFixed(2)}`;
  };

  // ✅ Get package price details
  const getPackagePriceDetails = (pkg) => {
    if (!pkg || !pkg.price || !Array.isArray(pkg.price)) return null;
    
    return {
      minPrice: Math.min(...pkg.price.map(p => parseFloat(p))),
      maxPrice: Math.max(...pkg.price.map(p => parseFloat(p))),
      count: pkg.price.length
    };
  };

  // ✅ Build payload
  const buildPayload = () => {
    let itemId = formData.item_id;
    
    // If it's a package and we have the slug, try to get the ID
    if (formData.item_type === "package" && selectedItem) {
      itemId = selectedItem.id; // Use the actual ID from the package data
    }
    
    const payload = {
      item_id: parseInt(itemId),
      item_type: formData.item_type,
      quantity: parseInt(formData.quantity),
      price_index: parseInt(formData.price_index),
      services: formData.services,
    };

    // Add user info
    if (formData.user_type === "existing" && formData.user_id) {
      payload.user_id = parseInt(formData.user_id);
    } else {
      payload.name = formData.name;
      payload.email = formData.email;
      if (formData.mobile) payload.mobile = formData.mobile;
      if (formData.country) payload.country = formData.country;
      if (formData.city) payload.city = formData.city;
      if (formData.address) payload.address = formData.address;
    }

    // Add custom values if enabled
    if (formData.use_custom_values) {
      payload.use_custom_values = true;
      if (formData.custom_price) payload.custom_price = parseFloat(formData.custom_price);
      if (formData.custom_credit) payload.custom_credit = parseInt(formData.custom_credit);
    }

    return payload;
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const token = localStorage.getItem("token");
      const payload = buildPayload();

      console.log("Submitting order:", payload);

      const response = await fetch("https://api.glassworld06.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      setSubmitStatus({ 
        success: true, 
        message: `Order #${data.order_id} created successfully!` 
      });

      // Redirect to orders list after short delay
      setTimeout(() => router.push("/admin/orders"), 1500);

    } catch (err) {
      console.error("Order creation error:", err);
      setSubmitStatus({ 
        success: false, 
        message: err.message || "Error creating order. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 text-center">
          <div className="text-gray-600">Loading required data...</div>
        </div>
      </main>
    );
  }

  const packagePriceDetails = selectedItem ? getPackagePriceDetails(selectedItem) : null;

  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-4 md:p-6">
          {/* Status Message */}
          {submitStatus.message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Order</h2>

            {/* User Selection Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <FaUser className="mr-2 text-blue-600" /> Customer Information
              </h3>
              
              {/* User Type Toggle */}
              <div className="flex gap-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="user_type"
                    value="existing"
                    checked={formData.user_type === "existing"}
                    onChange={() => handleUserTypeChange("existing")}
                    className="mr-2"
                  />
                  <span className="text-sm">Select Existing User</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="user_type"
                    value="new"
                    checked={formData.user_type === "new"}
                    onChange={() => handleUserTypeChange("new")}
                    className="mr-2"
                  />
                  <span className="text-sm">Create New User</span>
                </label>
              </div>

              {/* Existing User Dropdown */}
              {formData.user_type === "existing" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Select User *</label>
                  <select
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-3 py-2 ${
                      errors.user_id ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Choose a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                  {errors.user_id && <p className="text-red-600 text-sm mt-1">{errors.user_id}</p>}
                </div>
              )}

              {/* New User Fields */}
              {formData.user_type === "new" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-md border px-3 py-2 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-md border px-3 py-2 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="user@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder="+1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder="USA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder="New York"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder="Street address"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Details Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <FaBox className="mr-2 text-blue-600" /> Order Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Item Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">Order Type *</label>
                  <select
                    name="item_type"
                    value={formData.item_type}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="package">Package</option>
                    <option value="guest_posting">Guest Posting</option>
                  </select>
                </div>

                {/* Item Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select {formData.item_type === "package" ? "Package" : "Site"} *
                  </label>
                  <select
                    name="item_id"
                    value={formData.item_id}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-3 py-2 ${
                      errors.item_id ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Choose...</option>
                    {formData.item_type === "package" 
                      ? packages.map((pkg) => {
                          const priceDetails = getPackagePriceDetails(pkg);
                          return (
                            <option key={pkg.id || pkg.slug} value={pkg.id || pkg.slug}>
                              {pkg.name} - {pkg.credit ? ` ${pkg.credit} credits` : ''}
                            </option>
                          );
                        })
                      : guestPostingSites.map((site) => (
                          <option key={site.id} value={site.id}>
                            {site.name} - ${parseFloat(site.price || 0).toFixed(2)}
                          </option>
                        ))
                    }
                  </select>
                  {errors.item_id && <p className="text-red-600 text-sm mt-1">{errors.item_id}</p>}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    className={`w-full rounded-md border px-3 py-2 ${
                      errors.quantity ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>}
                </div>

                {/* Price Index (for packages with multiple price tiers) */}
                {formData.item_type === "package" && selectedItem?.price && selectedItem.price.length > 1 && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Price Tier</label>
                    <select
                      name="price_index"
                      value={formData.price_index}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      {selectedItem.price.map((price, index) => (
                        <option key={index} value={index}>
                          Tier {index + 1}: ${parseFloat(price).toFixed(2)}
                          {selectedItem.credit ? ` (${selectedItem.credit * (index + 1)} credits)` : ''}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedItem.price.length} price tiers available
                    </p>
                  </div>
                )}

                {/* Show package info */}
                {formData.item_type === "package" && selectedItem && (
                  <div className="md:col-span-2 mt-2 p-3 bg-blue-50 rounded-md">
                    <h4 className="text-sm font-medium text-blue-800 mb-1">Package Details</h4>
                    <p className="text-xs text-blue-600 mb-1">{selectedItem.description}</p>
                    {selectedItem.features && selectedItem.features.length > 0 && (
                      <div className="text-xs text-blue-600">
                        <span className="font-medium">Features:</span>{' '}
                        {selectedItem.features.filter(f => f.included).map(f => f.text).join(', ')}
                      </div>
                    )}
                    {selectedItem.demo_report_url && (
                      <a 
                        href={selectedItem.demo_report_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-700 underline mt-1 inline-block"
                      >
                        View Demo Report
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Admin Overrides Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <FaDollarSign className="mr-2 text-blue-600" /> Admin Overrides
              </h3>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="use_custom_values"
                    checked={formData.use_custom_values}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">Use Custom Price/Credits</span>
                </label>
              </div>

              {formData.use_custom_values && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Custom Price *</label>
                    <input
                      type="number"
                      name="custom_price"
                      value={formData.custom_price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className={`w-full rounded-md border px-3 py-2 ${
                        errors.custom_price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.custom_price && <p className="text-red-600 text-sm mt-1">{errors.custom_price}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Custom Credits</label>
                    <input
                      type="number"
                      name="custom_credit"
                      value={formData.custom_credit}
                      onChange={handleChange}
                      min="0"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Services Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <FaCog className="mr-2 text-blue-600" /> Additional Services
              </h3>

              <div>
                <label className="block text-sm font-medium mb-1">Word Option</label>
                <select
                  onChange={(e) => handleServiceChange("word_option", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select word count</option>
                  <option value="500+ Words Article">500+ Words Article</option>
                  <option value="1000+ Words Article">1000+ Words Article</option>
                  <option value="1500+ Words Article">1500+ Words Article</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-800"
                }`}
              >
                {loading ? "Creating Order..." : "Create Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}