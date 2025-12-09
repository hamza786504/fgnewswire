"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanyCreate() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    contact_person_name: "",
    address_1: "",
    address_2: "",
    phone_number: "",
    email: "",
    country: "Pakistan",
    state: "",
    city: "",
    website: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  // Handle text field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate URL format
  const isValidUrl = (url) => {
    if (!url) return true; // Website is optional
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Validate phone number (basic international format)
  const isValidPhone = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.name.trim()) newErrors.name = "Company name is required.";
    if (!formData.contact_person_name.trim()) newErrors.contact_person_name = "Contact person name is required.";
    if (!formData.address_1.trim()) newErrors.address_1 = "Address line 1 is required.";
    if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    
    // Format validation
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    if (formData.phone_number && !isValidPhone(formData.phone_number.replace(/\s+/g, ''))) {
      newErrors.phone_number = "Please enter a valid phone number (e.g., +923001234567).";
    }
    
    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = "Please enter a valid URL (e.g., https://www.example.com).";
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
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Prepare data for submission
      const submissionData = {
        name: formData.name,
        contact_person_name: formData.contact_person_name,
        address_1: formData.address_1,
        address_2: formData.address_2 || "",
        phone_number: formData.phone_number,
        email: formData.email,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        website: formData.website || ""
      };

      // Log submission data for debugging
      console.log("Submitting company data:", submissionData);

      const response = await fetch("https://api.glassworld06.com/api/companies", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const responseData = await response.json();
      
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
        
        throw new Error(responseData.message || `Failed to create company. Status: ${response.status}`);
      }

      setSubmitStatus({ 
        success: true, 
        message: responseData.message || "Company created successfully!" 
      });

      // Redirect to companies list page after 1.5 seconds
      setTimeout(() => {
        router.push("/admin/company");
      }, 1500);

    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus({ 
        success: false, 
        message: err.message || "Error creating company. Please try again." 
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
              submitStatus.success 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {submitStatus.message}
            {submitStatus.success && (
              <div className="text-sm mt-1 text-green-700">
                Redirecting to companies list...
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Create New Company</h2>

          {/* Company Name */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Company Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter company name"
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Contact Person Name */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Contact Person Name *</label>
            <input
              name="contact_person_name"
              value={formData.contact_person_name}
              onChange={handleChange}
              placeholder="Enter contact person name"
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                errors.contact_person_name ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.contact_person_name && <p className="text-red-600 text-sm mt-1">{errors.contact_person_name}</p>}
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
              <input
                name="address_1"
                value={formData.address_1}
                onChange={handleChange}
                placeholder="Street address, P.O. box, etc."
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.address_1 ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.address_1 && <p className="text-red-600 text-sm mt-1">{errors.address_1}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
              <input
                name="address_2"
                value={formData.address_2}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+923001234567"
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.phone_number ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.phone_number && <p className="text-red-600 text-sm mt-1">{errors.phone_number}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="info@company.com"
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              >
                <option value="Pakistan">Pakistan</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
                <option value="UAE">UAE</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Other">Other</option>
              </select>
              {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">State/Province</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State or province"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>

          {/* Website */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://www.example.com"
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                errors.website ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.website && <p className="text-red-600 text-sm mt-1">{errors.website}</p>}
            <p className="text-xs text-gray-500 mt-1">Optional - include https://</p>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/admin/company")}
              className="px-5 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 text-sm font-medium ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-800"
              } transition-colors`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Company"
              )}
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            * Required fields
          </div>
        </form>
      </div>
    </main>
  );
}