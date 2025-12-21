"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import Button from "@/app/(pages)/Componenets/Elements/Button";

export default function PrTypesTable({ initialPrTypes }) {
  const [items, setItems] = useState(initialPrTypes || []);
  const [filtered, setFiltered] = useState(initialPrTypes || []);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const itemsPerPage = 20;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const term = search.toLowerCase();
    const data = items.filter(
      (i) =>
        i.name?.toLowerCase().includes(term) ||
        String(i.credit_cost).includes(term)
    );
    setFiltered(data);
    setPage(1);
  }, [search, items]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const deleteItem = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://api.glassworld06.com/api/pr-types/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setItems(items.filter((i) => i.id !== id));
      alert("PR Type deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage PR Types</h1>
          <Button href="/admin/pr-types/create" content="Add PR Type" />
        </div>

        <div className="flex justify-end mb-4">
          <div className="flex items-center bg-white border rounded-md px-2 py-1 w-64">
            <BiSearch className="text-gray-400 mr-2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs">#</th>
                <th className="px-6 py-3 text-left text-xs">Name</th>
                <th className="px-6 py-3 text-left text-xs">Credit Cost</th>
                <th className="px-6 py-3 text-left text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, i) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">{startIndex + i + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.credit_cost}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      href={`/admin/pr-types/edit/${item.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteItem(item.id)}
                      disabled={deletingId === item.id}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
