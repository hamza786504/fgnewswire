"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CompanyEdit() {
  const router = useRouter();
  const { slug } = useParams();

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
    website: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  /* =========================
     Fetch company by slug
  ========================== */
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const res = await fetch(
          `https://api.glassworld06.com/api/companies/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        
        console.log(data);
        
        

        if (!res.ok) {
          throw new Error(data.message || "Failed to load company");
        }

        setFormData({
          name: data.data.name || "",
          contact_person_name: data.data.contact_person_name || "",
          address_1: data.data.address_1 || "",
          address_2: data.data.address_2 || "",
          phone_number: data.data.phone_number || "",
          email: data.data.email || "",
          country: data.data.country || "Pakistan",
          state: data.data.state || "",
          city: data.data.city || "",
          website: data.data.website || "",
        });
      } catch (err) {
        console.error(err);
        alert("Unable to load company details");
        router.push("/dashboard/company");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [slug, router]);

  /* =========================
     Handlers
  ========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.contact_person_name.trim())
      newErrors.contact_person_name = "Contact person is required";
    if (!formData.address_1.trim()) newErrors.address_1 = "Address is required";
    if (!formData.phone_number.trim()) newErrors.phone_number = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     Update company
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://api.glassworld06.com/api/companies/${slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.errors) {
          const backendErrors = {};
          Object.keys(data.errors).forEach((key) => {
            backendErrors[key] = data.errors[key][0];
          });
          setErrors(backendErrors);
          throw new Error("Validation failed");
        }
        throw new Error(data.message || "Update failed");
      }

      setSubmitStatus({
        success: true,
        message: "Company updated successfully",
      });

      setTimeout(() => {
        router.push("/dashboard/company");
      }, 1500);
    } catch (err) {
      setSubmitStatus({
        success: false,
        message: err.message || "Update error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading company details...
      </div>
    );
  }

  /* =========================
     UI (same as create)
  ========================== */
  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6">
        {submitStatus.message && (
          <div
            className={`mb-4 p-3 rounded ${
              submitStatus.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-5">
            Edit Company
          </h2>

          
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
                  Updating...
                </span>
              ) : (
                "Update Company"
              )}
            </button>
          </div>

         
        </form>
      </div>
    </main>
  );
}
