"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ ADD

export default function CreatePrType() {
  const router = useRouter(); // ✅ ADD

  const [data, setData] = useState({ name: "", credit_cost: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Name required";
    if (!data.credit_cost || isNaN(data.credit_cost))
      e.credit_cost = "Valid credit cost required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://api.glassworld06.com/api/pr-types",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();
      if (!res.ok) throw json;

      // ✅ REDIRECT AFTER SUCCESS
      router.push("/admin/pr-types");
    } catch (err) {
      if (err.errors) {
        const be = {};
        Object.keys(err.errors).forEach(
          (k) => (be[k] = err.errors[k][0])
        );
        setErrors(be);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 h-full bg-[#ebecf0] p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl">
        <h2 className="text-lg font-semibold mb-5">Add PR Type</h2>

        <form onSubmit={submit}>
          <div>
            <label>Name *</label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className={`w-full mt-1 border px-3 py-2 rounded ${
                errors.name && "border-red-500"
              }`}
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>

          <div className="mt-4">
            <label>Credit Cost *</label>
            <input
              type="number"
              value={data.credit_cost}
              onChange={(e) =>
                setData({ ...data, credit_cost: e.target.value })
              }
              className={`w-full mt-1 border px-3 py-2 rounded ${
                errors.credit_cost && "border-red-500"
              }`}
            />
            {errors.credit_cost && (
              <p className="text-red-600">{errors.credit_cost}</p>
            )}
          </div>

          <div className="mt-6 text-right">
            <button
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-700 text-white rounded-lg"
            >
              {loading ? "Saving..." : "Add PR Type"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
