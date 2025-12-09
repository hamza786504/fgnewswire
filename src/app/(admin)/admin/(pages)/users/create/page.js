"use client";
import React, { useState } from "react";

export default function UserCreate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validate Form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.role) newErrors.role = "Select a user role.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://api.glassworld06.com/api/users/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        throw new Error(data?.errors ? Object.values(data.errors).flat().join(", ") : "Failed to create user");
      }

      setSubmitStatus({ success: true, message: "User added successfully!" });
      setFormData({ name: "", email: "", password: "", role: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      setSubmitStatus({ success: false, message: err.message || "Error creating user." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-4 md:p-6">
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
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Add New User</h2>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="user@example.com"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>

          {/* Role */}
          <div className="mb-5">
            <label className="block text-sm font-medium">Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="author">Author</option>
            </select>
            {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
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
              {isSubmitting ? "Submitting..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
