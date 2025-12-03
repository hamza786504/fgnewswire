"use client";
import React, { useState } from "react";

export default function PackageCreate() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    features: [{ text: "", image: null, included: true }], // 🔥 Added included with default true
    demo_report_url: "",
    price: [{ quantity: "", price: "" }],
    credit: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  // Handle text field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle price change
  const handlePriceChange = (index, field, value) => {
    const updated = [...formData.price];
    updated[index][field] = value;
    setFormData({ ...formData, price: updated });
  };

  const addPrice = () => {
    setFormData({ ...formData, price: [...formData.price, { quantity: "", price: "" }] });
  };

  const removePrice = (index) => {
    const updated = formData.price.filter((_, i) => i !== index);
    setFormData({ ...formData, price: updated });
  };

  // Handle feature (text + image + included)
  const handleFeatureChange = (index, field, value) => {
    const updated = [...formData.features];
    updated[index][field] = value;
    setFormData({ ...formData, features: updated });
  };

  // Handle included checkbox change
  const handleIncludedChange = (index) => {
    const updated = [...formData.features];
    updated[index].included = !updated[index].included;
    setFormData({ ...formData, features: updated });
  };

  const addFeature = () => {
    setFormData({ 
      ...formData, 
      features: [...formData.features, { text: "", image: null, included: true }] 
    });
  };

  const removeFeature = (index) => {
    const updated = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updated });
  };

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

    formData.features.forEach((f, i) => {
      if (!f.text.trim()) newErrors[`feature_text_${i}`] = "Feature text required.";
    });

    if (!formData.credit || isNaN(formData.credit)) {
      newErrors.credit = "Valid credit are required.";
    }

    formData.price.forEach((item, i) => {
      if (!item.quantity || isNaN(item.quantity))
        newErrors[`price_quantity_${i}`] = "Valid quantity required.";
      if (!item.price || isNaN(item.price))
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

    // ✅ Create a FormData object
    const formDataToSend = new FormData();

    // Add basic fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("demo_report_url", formData.demo_report_url);
    formDataToSend.append("credit", formData.credit);

    // Add price array
    formData.price.forEach((p, i) => {
      formDataToSend.append(`price[${i}][quantity]`, p.quantity);
      formDataToSend.append(`price[${i}][price]`, p.price);
    });

    // Add features with text + image + included
    formData.features.forEach((f, i) => {
      formDataToSend.append(`features[${i}][text]`, f.text);
      // 🔥 Convert boolean to "1" for true, "0" for false (or string "true"/"false")
      formDataToSend.append(`features[${i}][included]`, f.included ? "1" : "0");
      if (f.image) {
        formDataToSend.append(`features[${i}][image]`, f.image);
      }
    });

    console.log("Submitting FormData...");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await fetch("https://api.glassworld06.com/api/packages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    const responseData = await response.json(); // 🔥 Get response to see detailed error
    
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
      throw new Error(responseData.message || "Failed to submit package");
    }

    setSubmitStatus({ success: true, message: "Package added successfully!" });

    // // Reset form
    // setFormData({
    //   name: "",
    //   type: "",
    //   description: "",
    //   features: [{ text: "", image: null, included: true }],
    //   demo_report_url: "",
    //   price: [{ quantity: "", price: "" }],
    //   credit: ""
    // });

  } catch (err) {
    console.error(err);
    setSubmitStatus({ 
      success: false, 
      message: err.message || "Error submitting form. Please try again." 
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
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Add New Package</h2>

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

          {/* Price (Quantity-Price pairs) */}
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

          {/* Features (Text + Image + Included) */}
          <div className="mt-5">
            <label className="block text-sm font-medium">Features *</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-3 mt-2">
                <input
                  type="text"
                  placeholder="Feature text"
                  value={feature.text}
                  onChange={(e) => handleFeatureChange(index, "text", e.target.value)}
                  className={`flex-1 rounded-md border px-3 py-2 ${
                    errors[`feature_text_${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFeatureChange(index, "image", e.target.files[0])}
                  className="flex-1 text-sm"
                />
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
                {formData.features.length > 1 && (
                  <button type="button" onClick={() => removeFeature(index)} className="text-red-500 font-bold">
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addFeature} className="mt-2 text-sm text-blue-600 hover:underline">
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
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-800"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Add Package"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}