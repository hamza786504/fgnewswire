"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PressReleaseCreate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    order_item_id: "",
    title: "",
    excerpt: "",
    body: "",
    company_id: "",
    categories: [],
    featured_image: null,
    meta_title: "",
    meta_description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Fetch categories and available orders on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch categories
        const catRes = await fetch("https://api.glassworld06.com/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const catResult = await catRes.json();
        if (catResult.status === "success") {
          setAvailableCategories(catResult.data || []);
        }

        // Fetch orders with press release items
        const ordersRes = await fetch("https://api.glassworld06.com/api/all_orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersResult = await ordersRes.json();
        
        if (ordersResult.status === "success") {
          console.log(ordersResult.data);
          // Filter orders that have press_release items
          // const pressReleaseOrders = [];
          // ordersResult.data.forEach(order => {
          //   order.items?.forEach(item => {
          //     if (item.item_type === "press_release" && item.remaining_credits > 0) {
          //       pressReleaseOrders.push({
          //         order_item_id: item.id,
          //         package_name: item.item?.name || "Press Release Package",
          //         order_number: order.order_number,
          //         remaining_credits: item.remaining_credits,
          //         created_at: order.created_at,
          //         item_details: item
          //       });
          //     }
          //   });
          // });
          setAvailableOrders(ordersResult.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // If order_item_id changes, find the selected package
    if (name === "order_item_id") {
      const selected = availableOrders.find(order => order.order_item_id === parseInt(value));
      setSelectedPackage(selected);
    }
  };

  const handleCategoryChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(parseInt(options[i].value));
      }
    }
    setFormData({ ...formData, categories: selectedValues });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, featured_image: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.order_item_id) newErrors.order_item_id = "Please select a purchased press release package.";
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.body.trim()) newErrors.body = "Body content is required.";
    if (formData.excerpt && formData.excerpt.length > 500) newErrors.excerpt = "Excerpt must be less than 500 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      // Required fields
      formDataToSend.append("order_item_id", formData.order_item_id);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("body", formData.body);
      
      // Optional fields
      if (formData.excerpt) formDataToSend.append("excerpt", formData.excerpt);
      if (formData.company_id) formDataToSend.append("company_id", formData.company_id);
      if (formData.meta_title) formDataToSend.append("meta_title", formData.meta_title);
      if (formData.meta_description) formDataToSend.append("meta_description", formData.meta_description);
      if (formData.featured_image) formDataToSend.append("featured_image", formData.featured_image);
      
      // Append categories as array
      formData.categories.forEach(catId => {
        formDataToSend.append("categories[]", catId);
      });

      console.log(formDataToSend);
// Log each entry individually
for (let pair of formDataToSend.entries()) {
  console.log(pair[0], pair[1]);
}

      const response = await fetch("https://api.glassworld06.com/api/press-releases", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errors) {
          const backendErrors = {};
          Object.keys(responseData.errors).forEach(key => {
            backendErrors[key] = responseData.errors[key][0];
          });
          setErrors(backendErrors);
          throw new Error("Validation failed from backend");
        }
        throw new Error(responseData.message || "Failed to create press release");
      }

      setSubmitStatus({ 
        success: true, 
        message: responseData.message || "Press release created successfully!" 
      });
      setTimeout(() => router.push("/dashboard/pressrelease"), 1500);

    } catch (err) {
      console.error(err);
      setSubmitStatus({
        success: false,
        message: err.message || "Error creating press release. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 md:p-6">
        {submitStatus.message && (
          <div
            className={`mb-4 p-3 rounded-md ${
              submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Create New Press Release</h2>

          {/* Order Item Selection - Most Important */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Select Purchased Package *</label>
            {loadingOrders ? (
              <div className="mt-2 text-gray-500">Loading your purchases...</div>
            ) : availableOrders.length === 0 ? (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 text-sm">
                  You don't have any press release packages with available credits.
                </p>
                <p className="text-yellow-600 text-xs mt-1">
                  Please purchase a press release package first.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/packages")}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Browse Packages →
                </button>
              </div>
            ) : (
              <>
                <select
                  name="order_item_id"
                  value={formData.order_item_id}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                    errors.order_item_id ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option>Select a package...</option>
                    {availableOrders
  ?.filter((order) => order.item?.item_type === "press_release")
  .map((order) => (
    <option key={order.id} value={order.id}>
      {order.item.name}
    </option>
  ))}
                </select>
                {errors.order_item_id && <p className="text-red-600 text-sm mt-1">{errors.order_item_id}</p>}
                
                {/* Show selected package details */}
                {selectedPackage && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      <strong>Selected Package:</strong> {selectedPackage.package_name}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Order #{selectedPackage.order_number} | Remaining Credits: {selectedPackage.remaining_credits}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter press release title"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Excerpt */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Excerpt (Short Summary)</label>
            <textarea
              name="excerpt"
              rows="2"
              value={formData.excerpt}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.excerpt ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Brief summary of the press release (max 500 characters)..."
              maxLength="500"
            />
            <div className="flex justify-between mt-1">
              {errors.excerpt && <p className="text-red-600 text-sm">{errors.excerpt}</p>}
              <p className="text-xs text-gray-500 ml-auto">
                {formData.excerpt.length}/500 characters
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Body Content *</label>
            <textarea
              name="body"
              rows="10"
              value={formData.body}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 font-mono text-sm ${
                errors.body ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Full press release content (HTML supported)..."
            />
            {errors.body && <p className="text-red-600 text-sm mt-1">{errors.body}</p>}
            <p className="text-xs text-gray-500 mt-1">
              You can use HTML tags for formatting: &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt;, etc.
            </p>
          </div>

          {/* Company ID (Optional) */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Company ID (Optional)</label>
            <input
              name="company_id"
              type="number"
              value={formData.company_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter company ID if applicable"
            />
            <p className="text-xs text-gray-500 mt-1">If you have a registered company, enter its ID</p>
          </div>

          {/* Categories */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Categories</label>
            <select
              multiple
              value={formData.categories.map(id => id.toString())}
              onChange={handleCategoryChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 h-32"
            >
              {availableCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple categories</p>
          </div>

          {/* Featured Image */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, WEBP</p>
          </div>

          {/* SEO Fields */}
          <div className="border-t border-gray-200 pt-5 mt-5">
            <h3 className="text-md font-medium text-gray-900 mb-4">SEO Settings (Optional)</h3>
            
            {/* Meta Title */}
            <div className="mb-5">
              <label className="block text-sm font-medium">Meta Title</label>
              <input
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="SEO title (60 characters recommended)"
                maxLength="60"
              />
            </div>

            {/* Meta Description */}
            <div className="mb-5">
              <label className="block text-sm font-medium">Meta Description</label>
              <textarea
                name="meta_description"
                rows="2"
                value={formData.meta_description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="SEO description (160 characters recommended)"
                maxLength="160"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard/pressrelease")}
              className="px-5 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || availableOrders.length === 0}
              className={`px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 ${
                isSubmitting || availableOrders.length === 0
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:from-blue-600 hover:to-purple-800 transition-all"
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Press Release"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}