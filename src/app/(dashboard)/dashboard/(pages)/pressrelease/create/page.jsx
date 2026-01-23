"use client";
import React, { useState, useEffect } from "react";

export default function PressReleaseCreate() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    body: "",
    featured_image: null,
    pr_type_id: "",
    company_id: "",
    status: "draft",
    published_at: "",
    category_id: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });
  const [companies, setCompanies] = useState([]);
  const [prTypes, setPrTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setSubmitStatus({
            success: false,
            message: "Authentication token not found. Please log in again.",
          });
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

const [companiesRes, prTypesRes, categoriesRes] = await Promise.all([
  fetch("https://api.glassworld06.com/api/companies", { headers }),
  fetch("https://api.glassworld06.com/api/pr-types", { headers }),
  fetch("https://api.glassworld06.com/api/categories", { headers }),
]);

if (!companiesRes.ok) throw new Error("Failed to fetch companies");
if (!prTypesRes.ok) throw new Error("Failed to fetch PR types");
if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

const companiesData = await companiesRes.json();
const prTypesData = await prTypesRes.json();
const categoriesData = await categoriesRes.json();

// Companies
setCompanies(companiesData.data || companiesData || []);

// PR Types
setPrTypes(prTypesData.data || prTypesData || []);

// Categories (NOW DYNAMIC ✅)
setCategories(categoriesData.data || categoriesData || []);

      } catch (error) {
        console.error(error);
        setSubmitStatus({
          success: false,
          message: "Failed to load form data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);


  // Handle text field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          featured_image: "Please upload a valid image (JPG, PNG, WebP)"
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          featured_image: "Image size should be less than 5MB"
        });
        return;
      }

      setFormData({ ...formData, featured_image: file });
      setErrors({ ...errors, featured_image: "" });
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required.";
    if (!formData.body.trim()) newErrors.body = "Content is required.";
    if (!formData.pr_type_id) newErrors.pr_type_id = "PR Type is required.";
    if (!formData.company_id) newErrors.company_id = "Company is required.";


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
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Create FormData object
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("excerpt", formData.excerpt);
      formDataToSend.append("body", formData.body);
      formDataToSend.append("pr_type_id", formData.pr_type_id);
      formDataToSend.append("company_id", formData.company_id);
      formDataToSend.append("status", formData.status);

      if (formData.published_at) {
        // Convert to ISO format for backend
        const publishedDate = new Date(formData.published_at);
        formDataToSend.append("published_at", publishedDate.toISOString());
      }

      if (formData.category_id) {
        formDataToSend.append("category_id", formData.category_id);
      }

      if (formData.featured_image) {
        formDataToSend.append("featured_image", formData.featured_image);
      }

      // Log FormData for debugging
      console.log("Form data being sent:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch("https://api.glassworld06.com/api/press-releases", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Accept": "application/json",
    // Remove "Content-Type" header - it will be set automatically for FormData
  },
  body: formDataToSend, // This should be a FormData object
}); 

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        // Handle validation errors from backend
        if (response.status === 422 && responseData.errors) {
          const backendErrors = {};
          Object.keys(responseData.errors).forEach(key => {
            backendErrors[key] = responseData.errors[key][0];
          });
          setErrors(backendErrors);
          throw new Error("Validation failed. Please check the form.");
        }

        if (response.status === 403) {
          throw new Error(responseData.message || "Insufficient credits to create press release.");
        }

        throw new Error(responseData.message || `Failed to create press release. Status: ${response.status}`);
      }

      setSubmitStatus({
        success: true,
        message: `Press Release created successfully! ${responseData.remaining_credits ? `Remaining credits: ${responseData.remaining_credits}` : ''}`
      });

      // Reset form on success
      setFormData({
        title: "",
        excerpt: "",
        body: "",
        featured_image: null,
        pr_type_id: "",
        company_id: "",
        status: "draft",
        published_at: "",
        category_id: ""
      });

      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus({
        success: false,
        message: err.message || "Error adding press release. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 text-center">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading form data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 md:p-6">
        {submitStatus.message && (
          <div
            className={`mb-4 p-3 rounded-md ${submitStatus.success ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"
              }`}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Create New Press Release</h2>

          {/* Title */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter press release title"
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${errors.title ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Company and PR Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company *</label>
              <select
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${errors.company_id ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              >
                <option value="">Select Company</option>
                {companies.length > 0 ? (
                  companies.map(company => (
                    <option key={company.id} value={company.id}>
                      {company.name || `Company ${company.id}`}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No companies found. Please create a company first.</option>
                )}
              </select>
              {errors.company_id && <p className="text-red-600 text-sm mt-1">{errors.company_id}</p>}
              <p className="text-xs text-gray-500 mt-1">
                {companies.length === 0 && "You need to create a company first before adding a press release."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">PR Type *</label>
              <select
                name="pr_type_id"
                value={formData.pr_type_id}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${errors.pr_type_id ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              >
                <option value="">Select PR Type</option>
                {prTypes.length > 0 ? (
                  prTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name} ({type.credit_cost} credits)
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No PR types available</option>
                )}
              </select>
              {errors.pr_type_id && <p className="text-red-600 text-sm mt-1">{errors.pr_type_id}</p>}
            </div>
          </div>

          {/* Excerpt */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Excerpt *</label>
            <textarea
              name="excerpt"
              rows="2"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Short description or summary"
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${errors.excerpt ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            ></textarea>
            {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>}
          </div>

          {/* Content */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Content *</label>
            <textarea
              name="body"
              rows="6"
              value={formData.body}
              onChange={handleChange}
              placeholder="Full press release content"
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${errors.body ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            ></textarea>
            {errors.body && <p className="text-red-600 text-sm mt-1">{errors.body}</p>}
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Category (Optional)</option>
                {categories.length > 0 ? (
                  categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No categories available</option>
                )}
              </select>
            </div>


          </div>



          {/* Featured Image */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Featured Image</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, WebP (Max 5MB)</p>
            {errors.featured_image && <p className="text-red-600 text-sm mt-1">{errors.featured_image}</p>}
            {formData.featured_image && (
              <div className="mt-2 text-sm text-green-600">
                ✓ {formData.featured_image.name} selected
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-5 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || companies.length === 0}
              className={`px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 text-sm font-medium ${isSubmitting || companies.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-800"
                } transition-colors`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : companies.length === 0 ? (
                "Create Company First"
              ) : (
                "Create Press Release"
              )}
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            * Required fields. Adding a press release will automatically deduct credits based on the selected PR type.
          </div>
        </form>
      </div>
    </main>
  );
}