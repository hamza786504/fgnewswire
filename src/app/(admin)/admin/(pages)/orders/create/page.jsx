"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaBox, FaDollarSign, FaCog } from "react-icons/fa";

export default function CreateOrder() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    user_type: "existing", // "existing" | "new"
    user_id: "",
    name: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    address: "",

    item_type: "package", // "package" | "guest_posting"
    item_id: "",
    quantity: 1,
    price_index: 0,

    use_custom_values: false,
    custom_price: "",
    custom_credit: "",

    services: {},
  });

  // Data
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [guestPostingSites, setGuestPostingSites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  // Fetch users, packages, guest posting sites
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        // Users (filter out admins)
        const usersRes = await fetch("https://api.glassworld06.com/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        const usersData = await usersRes.json();
        setUsers(usersData.data?.filter((u) => u.role !== "admin") || []);

        // Packages
        const packagesRes = await fetch("https://api.glassworld06.com/api/packages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!packagesRes.ok) throw new Error("Failed to fetch packages");
        const packagesData = await packagesRes.json();
        setPackages(Array.isArray(packagesData) ? packagesData : packagesData.data || []);

        // Guest Posting Sites
        const sitesRes = await fetch("https://api.glassworld06.com/api/guest-posting-sites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!sitesRes.ok) throw new Error("Failed to fetch guest posting sites");
        const sitesData = await sitesRes.json();
        setGuestPostingSites(sitesData.data || []);

      } catch (err) {
        console.error("Fetch error:", err);
        setSubmitStatus({
          success: false,
          message: "Failed to load data. Please try again later.",
        });
      } finally {
        setFetchingData(false);
      }
    };

    fetchInitialData();
  }, []);

  // Update selected item when item_id or type changes
  useEffect(() => {
    if (!formData.item_id) {
      setSelectedItem(null);
      return;
    }

    const id = parseInt(formData.item_id, 10);

    if (formData.item_type === "package") {
      const pkg = packages.find((p) => p.id === id);
      setSelectedItem(pkg || null);

      // Reset price_index if package changed and has tiers
      if (pkg?.price && Array.isArray(pkg.price) && pkg.price.length > 1) {
        setFormData((prev) => ({ ...prev, price_index: 0 }));
      } else {
        setFormData((prev) => ({ ...prev, price_index: 0 }));
      }
    } else if (formData.item_type === "guest_posting") {
      const site = guestPostingSites.find((s) => s.id === id);
      setSelectedItem(site || null);
    }
  }, [formData.item_id, formData.item_type, packages, guestPostingSites]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleUserTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      user_type: type,
      user_id: "",
      name: "",
      email: "",
    }));
  };

  const handleServiceChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [key]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // User
    if (formData.user_type === "existing") {
      if (!formData.user_id) newErrors.user_id = "Please select a user";
    } else {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    // Item
    if (!formData.item_id) {
      newErrors.item_id = `Please select a ${formData.item_type.replace("_", " ")}`;
    }

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }

    // Custom values
    if (formData.use_custom_values) {
      if (!formData.custom_price || Number(formData.custom_price) <= 0) {
        newErrors.custom_price = "Enter a valid price > 0";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const payload = {
      item_id: parseInt(formData.item_id, 10),
      item_type: formData.item_type,
      quantity: parseInt(formData.quantity, 10),
      services: Object.keys(formData.services).length > 0 ? formData.services : undefined,
    };

    // Price index only for packages (and only if meaningful)
    if (formData.item_type === "package" && formData.price_index !== 0) {
      payload.price_index = parseInt(formData.price_index, 10);
    }

    // User data
    if (formData.user_type === "existing" && formData.user_id) {
      payload.user_id = parseInt(formData.user_id, 10);
    } else {
      payload.name = formData.name.trim();
      payload.email = formData.email.trim();
      if (formData.mobile?.trim()) payload.mobile = formData.mobile.trim();
      if (formData.country?.trim()) payload.country = formData.country.trim();
      if (formData.city?.trim()) payload.city = formData.city.trim();
      if (formData.address?.trim()) payload.address = formData.address.trim();
    }

    // Admin custom override
    if (formData.use_custom_values) {
      payload.use_custom_values = true;
      if (formData.custom_price) payload.custom_price = parseFloat(formData.custom_price);
      if (formData.custom_credit) payload.custom_credit = parseInt(formData.custom_credit, 10);
    }

    // Clean undefined fields
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) delete payload[key];
    });

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const payload = buildPayload();
      console.log("Sending payload:", payload);

      const res = await fetch("https://api.glassworld06.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      setSubmitStatus({
        success: true,
        message: `Order #${data.order_id || "new"} created successfully!`,
      });

      setTimeout(() => router.push("/admin/orders"), 1800);
    } catch (err) {
      console.error("Order creation failed:", err);
      setSubmitStatus({
        success: false,
        message: err.message || "Could not create order. Please check your input.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading form data...</div>
      </div>
    );
  }

  const showPriceTierSelector =
    formData.item_type === "package" &&
    selectedItem?.price &&
    Array.isArray(selectedItem.price) &&
    selectedItem.price.length > 1;

  return (
    <main className="flex-1 bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

          {submitStatus.message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.success
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Create New Order</h2>

            {/* ─── CUSTOMER INFORMATION ──────────────────────────────────────── */}
            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
                <FaUser className="text-blue-600" /> Customer
              </h3>

              <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="user_type"
                    checked={formData.user_type === "existing"}
                    onChange={() => handleUserTypeChange("existing")}
                    className="w-4 h-4"
                  />
                  <span>Existing User</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="user_type"
                    checked={formData.user_type === "new"}
                    onChange={() => handleUserTypeChange("new")}
                    className="w-4 h-4"
                  />
                  <span>New Customer</span>
                </label>
              </div>

              {formData.user_type === "existing" ? (
                <div>
                  <label className="block text-sm font-medium mb-2">Select User *</label>
                  <select
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2.5 ${
                      errors.user_id ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">— Select user —</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.email}
                      </option>
                    ))}
                  </select>
                  {errors.user_id && <p className="text-red-600 text-sm mt-1">{errors.user_id}</p>}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-2.5 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-2.5 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Mobile</label>
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      placeholder="+1 555 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Country</label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">City</label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1.5">Address</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* ─── ORDER DETAILS ─────────────────────────────────────────────── */}
            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
                <FaBox className="text-blue-600" /> Order Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Order Type *</label>
                  <select
                    name="item_type"
                    value={formData.item_type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  >
                    <option value="package">Package</option>
                    <option value="guest_posting">Guest Posting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Select {formData.item_type === "package" ? "Package" : "Site"} *
                  </label>
                  <select
                    name="item_id"
                    value={formData.item_id}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2.5 ${
                      errors.item_id ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">— Choose —</option>

                    {formData.item_type === "package"
                      ? packages.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name}
                            {pkg.credit ? ` (${pkg.credit} credit${pkg.credit > 1 ? "s" : ""})` : ""}
                          </option>
                        ))
                      : guestPostingSites.map((site) => (
                          <option key={site.id} value={site.id}>
                            {site.publication} — ${parseFloat(site.price || 0).toFixed(2)}
                          </option>
                        ))}
                  </select>
                  {errors.item_id && <p className="text-red-600 text-sm mt-1">{errors.item_id}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    className={`w-full border rounded-lg px-4 py-2.5 ${
                      errors.quantity ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>}
                </div>

                {showPriceTierSelector && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Price Tier</label>
                    <select
                      name="price_index"
                      value={formData.price_index}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    >
                      {selectedItem.price.map((price, idx) => (
                        <option key={idx} value={idx}>
                          Tier {idx + 1} — ${parseFloat(price).toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {formData.item_type === "package" && selectedItem && (
                <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Package: {selectedItem.name}</h4>
                  {selectedItem.description && (
                    <p className="text-sm text-gray-700 mb-2">{selectedItem.description}</p>
                  )}
                </div>
              )}
            </section>

            {/* ─── ADMIN OVERRIDES ───────────────────────────────────────────── */}
            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
                <FaDollarSign className="text-blue-600" /> Admin Overrides
              </h3>

              <label className="flex items-center gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  name="use_custom_values"
                  checked={formData.use_custom_values}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="font-medium">Use custom price & credits (admin only)</span>
              </label>

              {formData.use_custom_values && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Custom Price *</label>
                    <input
                      type="number"
                      name="custom_price"
                      value={formData.custom_price}
                      onChange={handleChange}
                      step="0.01"
                      min="0.01"
                      className={`w-full border rounded-lg px-4 py-2.5 ${
                        errors.custom_price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="150.00"
                    />
                    {errors.custom_price && (
                      <p className="text-red-600 text-sm mt-1">{errors.custom_price}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Custom Credits</label>
                    <input
                      type="number"
                      name="custom_credit"
                      value={formData.custom_credit}
                      onChange={handleChange}
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      placeholder="30"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* ─── ADDITIONAL SERVICES ───────────────────────────────────────── */}
            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
                <FaCog className="text-blue-600" /> Additional Services
              </h3>

              <div>
                <label className="block text-sm font-medium mb-1.5">Word Option</label>
                <select
                  value={formData.services.word_option || ""}
                  onChange={(e) => handleServiceChange("word_option", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                >
                  <option value="">None / Default</option>
                  <option value="500+ Words Article">500+ Words Article</option>
                  <option value="1000+ Words Article">1000+ Words Article</option>
                  <option value="1500+ Words Article">1500+ Words Article</option>
                </select>
              </div>
            </section>

            {/* ─── ACTIONS ───────────────────────────────────────────────────── */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-2.5 text-white font-medium rounded-lg transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                {loading ? "Creating..." : "Create Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}