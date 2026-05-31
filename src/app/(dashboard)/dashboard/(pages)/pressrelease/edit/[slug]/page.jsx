"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPressRelease() {
  const { slug } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });
  const [availableCategories, setAvailableCategories] = useState([]);
  const [existingImage, setExistingImage] = useState(null);

  // Fetch press release and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          setSubmitStatus({ success: false, message: "Authentication required. Please log in." });
          setLoading(false);
          return;
        }
        
        // Fetch press release details by slug with Bearer token
        const pressRes = await fetch(`https://api.glassworld06.com/api/press-releases/${slug}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (pressRes.status === 401) {
          setSubmitStatus({ success: false, message: "Session expired. Please log in again." });
          setLoading(false);
          return;
        }
        
        if (!pressRes.ok) {
          throw new Error("Failed to fetch press release");
        }
        
        const pressResult = await pressRes.json();
        const pressData = pressResult.data || pressResult;
        
        // Fetch categories with Bearer token
        const catRes = await fetch("https://api.glassworld06.com/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const catResult = await catRes.json();
        
        if (catResult.status === "success") {
          setAvailableCategories(catResult.data || []);
        }

        // Set form data (excluding status)
        setFormData({
          title: pressData.title || "",
          excerpt: pressData.excerpt || "",
          body: pressData.body || "",
          company_id: pressData.company_id || "",
          categories: pressData.categories?.map(cat => cat.id) || [],
          meta_title: pressData.meta_title || "",
          meta_description: pressData.meta_description || "",
        });
        
        setExistingImage(pressData.featured_image || null);

        console.log(pressData.featured_image);
        

      } catch (err) {
        console.error(err);
        setSubmitStatus({ success: false, message: "Failed to load press release details." });
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.body.trim()) newErrors.body = "Body content is required.";
    if (formData.excerpt && formData.excerpt.length > 500) {
      newErrors.excerpt = "Excerpt must be less than 500 characters.";
    }
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
      
      if (!token) {
        throw new Error("Authentication required");
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append("_method", "PUT");

      // Send only the editable fields (NO status field)
      formDataToSend.append("title", formData.title);
      formDataToSend.append("body", formData.body);
      
      if (formData.excerpt) formDataToSend.append("excerpt", formData.excerpt);
      if (formData.company_id) formDataToSend.append("company_id", formData.company_id);
      if (formData.meta_title) formDataToSend.append("meta_title", formData.meta_title);
      if (formData.meta_description) formDataToSend.append("meta_description", formData.meta_description);
      
      // Handle featured image
      if (formData.featured_image && formData.featured_image !== "remove") {
        formDataToSend.append("featured_image", formData.featured_image);
      } else if (formData.featured_image === "remove") {
        formDataToSend.append("featured_image", "");
      }
      
      // Append categories as array
      formData.categories.forEach(catId => {
        formDataToSend.append("categories[]", catId);
      });

      const response = await fetch(`https://api.glassworld06.com/api/press-releases/${slug}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const responseData = await response.json();

      if (response.status === 401) {
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        if (responseData.errors) {
          const backendErrors = {};
          Object.keys(responseData.errors).forEach(key => {
            backendErrors[key] = responseData.errors[key][0];
          });
          setErrors(backendErrors);
          throw new Error("Validation failed from backend");
        }
        throw new Error(responseData.message || "Failed to update press release");
      }

      setSubmitStatus({ 
        success: true, 
        message: responseData.message || "Press release updated successfully!" 
      });
      setTimeout(() => router.push("/admin/pressrelease"), 1500);

    } catch (err) {
      console.error(err);
      setSubmitStatus({
        success: false,
        message: err.message || "Error updating press release. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 md:p-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading press release details...</span>
          </div>
        </div>
      </main>
    );
  }

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
            {submitStatus.success === false && submitStatus.message.includes("Session expired") && (
              <div className="mt-2">
                <button
                  onClick={() => router.push("/login")}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Go to Login →
                </button>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Edit Press Release</h2>
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
                {formData.excerpt?.length || 0}/500 characters
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Body Content *</label>
            <textarea
              name="body"
              rows="12"
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

          {/* Company ID */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Company ID</label>
            <input
              name="company_id"
              type="number"
              value={formData.company_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter company ID if applicable"
            />
            <p className="text-xs text-gray-500 mt-1">Associated company ID for this press release</p>
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
            <p className="text-xs text-gray-500 mt-1">
              Hold Ctrl/Cmd to select multiple categories
            </p>
            {formData.categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.categories.map(catId => {
                  const category = availableCategories.find(c => c.id === catId);
                  return category ? (
                    <span key={catId} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {category.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Featured Image</label>
            
            {/* Show existing image */}
            {existingImage && (!formData.featured_image || formData.featured_image !== "remove") && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                <img
                  src={existingImage.startsWith("http") 
                    ? existingImage 
                    : `https://api.glassworld06.com/storage/${existingImage}`}
                  alt="Current featured"
                  className="w-40 h-40 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setExistingImage(null);
                    setFormData({ ...formData, featured_image: "remove" });
                  }}
                  className="mt-1 text-xs text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
            )}
            
            {/* Upload new image */}
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
              <p className="text-xs text-gray-500 mt-1">
                {formData.meta_title?.length || 0}/60 characters
              </p>
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
              <p className="text-xs text-gray-500 mt-1">
                {formData.meta_description?.length || 0}/160 characters
              </p>
            </div>
          </div>

          {/* Read-only Information */}
          <div className="border-t border-gray-200 pt-5 mt-5">
            <h3 className="text-md font-medium text-gray-900 mb-3">Information</h3>
            <div className="bg-gray-50 rounded-md p-3 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Slug:</span> {slug}
              </p>
              <p className="text-sm">
                <span className="font-medium">Created by:</span> User will be auto-assigned
              </p>
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
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-800 transition-all"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Press Release"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}