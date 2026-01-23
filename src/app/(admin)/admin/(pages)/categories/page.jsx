"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const res = await fetch("https://api.glassworld06.com/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setCategories(data.data);

    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://api.glassworld06.com/api/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex-1 h-full bg-[#ebecf0] p-4">
      <div className="bg-white p-6 rounded-xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Link
            href="/admin/categories/create"
            className="px-4 py-2 from-blue-600 to-purple-700 bg-gradient-to-r text-white rounded-md text-sm"
          >
            + Add Category
          </Link>
        </div>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border-gray-200 border">Name</th>
              <th className="p-2 border-gray-200 border">Slug</th>
              <th className="p-2 border-gray-200 border w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map(cat => (
              <tr key={cat.id}>
                <td className="p-2 border-gray-200 border">{cat.name}</td>
                <td className="p-2 border-gray-200 border text-gray-500">{cat.slug}</td>
                <td className="p-2 border-gray-200 border text-center space-x-3">
                  <Link
                    href={`/admin/categories/edit/${cat.id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
