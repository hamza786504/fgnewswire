"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPackage() {
  const { slug } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    features: [{ text: "", image: null, included: true }], // 🔥 Added included
    demo_report_url: "",
    price: [{ quantity: "", price: "" }],
    credit: "" // 🔥 Added credit field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  // ✅ Fetch package details
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://api.glassworld06.com/api/packages/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        console.log("Fetched package:", json);

        const data = json.data || json; // 👈 handle both cases

        setFormData({
          name: data.name || "",
          type: data.type || "",
          description: data.description || "",
          demo_report_url: data.demo_report_url || "",
          credit: data.credit || "", // 🔥 Load credit
          features: Array.isArray(data.features) && data.features.length
            ? data.features.map((f) => ({
              text: f.text || "",
              image: null, // for new upload
              included: f.included ?? true, // 🔥 Load included, default to true
              existingImage: f.image || null, // 👈 store existing image URL
            }))
            : [{ text: "", image: null, included: true, existingImage: null }],
          price: Array.isArray(data.price) && data.price.length
            ? data.price.map((p) => ({
              quantity: p.quantity?.toString() || "",
              price: p.price?.toString() || "",
            }))
            : [{ quantity: "", price: "" }],
        });

      } catch (err) {
        console.error(err);
        setSubmitStatus({ success: false, message: "Failed to load package details." });
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPackage();
  }, [slug]);

  // ✅ Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (index, field, value) => {
    const updated = [...formData.price];
    updated[index][field] = value;
    setFormData({ ...formData, price: updated });
  };

  const handleFeatureChange = (index, field, value) => {
    const updated = [...formData.features];
    updated[index][field] = value;
    setFormData({ ...formData, features: updated });
  };

  // 🔥 Handle included checkbox change
  const handleIncludedChange = (index) => {
    const updated = [...formData.features];
    updated[index].included = !updated[index].included;
    setFormData({ ...formData, features: updated });
  };

  const addPrice = () =>
    setFormData({
      ...formData,
      price: [...formData.price, { quantity: "", price: "" }],
    });

  const removePrice = (index) =>
    setFormData({
      ...formData,
      price: formData.price.filter((_, i) => i !== index),
    });

  const addFeature = () =>
    setFormData({
      ...formData,
      features: [...formData.features, { text: "", image: null, included: true }], // 🔥 Added included
    });

  const removeFeature = (index) =>
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });

  const isValidUrl = (url) => {
    const pattern = /^(https?:\/\/)([\w.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return pattern.test(url);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Package name is required.";
    if (!formData.type.trim()) newErrors.type = "Package type is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (formData.demo_report_url && !isValidUrl(formData.demo_report_url))
      newErrors.demo_report_url = "Please enter a valid URL.";
    
    if (!formData.credit || isNaN(formData.credit)) {
      newErrors.credit = "Valid credit are required.";
    }

    formData.features.forEach((f, i) => {
      if (!f.text.trim()) newErrors[`feature_text_${i}`] = "Feature text required.";
    });

    formData.price.forEach((p, i) => {
      if (!p.quantity || isNaN(p.quantity))
        newErrors[`price_quantity_${i}`] = "Valid quantity required.";
      if (!p.price || isNaN(p.price))
        newErrors[`price_price_${i}`] = "Valid price required.";
    });

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

      formDataToSend.append("name", formData.name);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("demo_report_url", formData.demo_report_url);
      formDataToSend.append("credit", formData.credit); // 🔥 Add credit
      formDataToSend.append("_method", "PUT");

      formData.price.forEach((p, i) => {
        formDataToSend.append(`price[${i}][quantity]`, p.quantity);
        formDataToSend.append(`price[${i}][price]`, p.price);
      });

      formData.features.forEach((f, i) => {
        formDataToSend.append(`features[${i}][text]`, f.text);
        // 🔥 Convert boolean to "1" for true, "0" for false
        formDataToSend.append(`features[${i}][included]`, f.included ? "1" : "0");

        // ✅ Only send one of these, not both
        if (f.image) {
          formDataToSend.append(`features[${i}][image]`, f.image); // new upload
        } else if (f.existingImage && !f.image) {
          formDataToSend.append(`features[${i}][existingImage]`, f.existingImage); // keep old image
        }
      });

      console.log("Submitting FormData for edit...");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      // ✅ Use POST with _method=PUT for Laravel
      const response = await fetch(`https://api.glassworld06.com/api/packages/${slug}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const responseData = await response.json(); // 🔥 Get response data
      
      if (!response.ok) {
        // Show validation errors from backend
        if (responseData.errors) {
          const backendErrors = {};
          Object.keys(responseData.errors).forEach(key => {
            backendErrors[key] = responseData.errors[key][0];
          });
          setErrors(backendErrors);
          throw new Error("Validation failed from backend");
        }
        throw new Error(responseData.message || "Failed to update package");
      }

      setSubmitStatus({ success: true, message: "Package updated successfully!" });
      setTimeout(() => router.push("/admin/package"), 1000);
    } catch (err) {
      console.error(err);
      setSubmitStatus({ 
        success: false, 
        message: err.message || "Error updating package. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 md:p-6">
          <p>Loading package details...</p>
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
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Edit Package</h2>

          {/* Name + Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium">Package Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Package Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                  errors.type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Type</option>
                <option value="press_release">Press Release</option>
                <option value="guest_posting">Guest Posting</option>
              </select>
              {errors.type && <p className="text-red-600 text-sm">{errors.type}</p>}
            </div>
          </div>

          {/* Credit */}
          <div className="mt-5">
            <label className="block text-sm font-medium">Credit *</label>
            <input
              name="credit"
              type="number"
              value={formData.credit}
              onChange={handleChange}
              placeholder="Enter credit"
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.credit ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.credit && <p className="text-red-600 text-sm">{errors.credit}</p>}
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="block text-sm font-medium">Description *</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
          </div>

          {/* Price */}
          <div className="mt-5">
            <label className="block text-sm font-medium">Pricing *</label>
            {formData.price.map((item, index) => (
              <div key={index} className="flex gap-2 mt-2 items-center">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handlePriceChange(index, "quantity", e.target.value)}
                  className={`w-1/2 rounded-md border px-3 py-2 ${
                    errors[`price_quantity_${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={item.price}
                  onChange={(e) => handlePriceChange(index, "price", e.target.value)}
                  className={`w-1/2 rounded-md border px-3 py-2 ${
                    errors[`price_price_${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formData.price.length > 1 && (
                  <button type="button" onClick={() => removePrice(index)} className="text-red-500 font-bold">
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addPrice} className="mt-2 text-sm text-blue-600 hover:underline">
              + Add Quantity/Price
            </button>
          </div>

          {/* Features */}
          <div className="mt-5">
            <label className="block text-sm font-medium">Features *</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-3 mt-3">
                {/* Feature Text */}
                <input
                  type="text"
                  placeholder="Feature text"
                  value={feature.text}
                  onChange={(e) => handleFeatureChange(index, "text", e.target.value)}
                  className={`flex-1 rounded-md border px-3 py-2 ${
                    errors[`feature_text_${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {/* Image Upload + Preview */}
                <div className="flex items-center gap-3">
                  {/* 👇 Show existing image if available */}
                  {feature.existingImage && !feature.image && (
                    <img
                      src={
                        feature.existingImage.startsWith("http")
                          ? feature.existingImage
                          : `https://api.glassworld06.com/storage/${feature.existingImage}`
                      }
                      alt="Feature"
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  )}

                  {/* 👇 Allow uploading new image */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFeatureChange(index, "image", e.target.files[0])}
                    className="text-sm"
                  />
                </div>

                {/* 🔥 Included Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`included-${index}`}
                    checked={feature.included}
                    onChange={() => handleIncludedChange(index)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor={`included-${index}`} className="text-sm text-gray-700">
                    Included
                  </label>
                </div>

                {/* Remove Feature */}
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {/* Add New Feature Button */}
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              + Add Feature
            </button>
          </div>

          {/* Demo Report URL */}
          <div className="mt-5">
            <label className="block text-sm font-medium">Demo Report URL</label>
            <input
              name="demo_report_url"
              value={formData.demo_report_url}
              onChange={handleChange}
              placeholder="https://example.com/demo-report"
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.demo_report_url ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.demo_report_url && <p className="text-red-600 text-sm">{errors.demo_report_url}</p>}
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Package"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}