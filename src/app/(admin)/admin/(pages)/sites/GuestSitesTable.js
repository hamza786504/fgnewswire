'use client';

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

export default function GuestSitesTable({ initialSites }) {
  const [sites, setSites] = useState(initialSites || []);
  const [filteredSites, setFilteredSites] = useState(initialSites || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = sites.filter(site =>
      site.website_url?.toLowerCase().includes(term) ||
      site.niche?.toLowerCase().includes(term) ||
      site.language?.toLowerCase().includes(term) ||
      site.country?.toLowerCase().includes(term)
    );

    setFilteredSites(filtered);
    setCurrentPage(1);
  }, [searchTerm, sites]);

  // Pagination
  const totalPages = Math.ceil(filteredSites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredSites.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // 🗑️ Delete guest posting site
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this site?")) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      const res = await fetch(`https://api.glassworld06.com/api/guest-posting-sites/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      const updated = sites.filter((s) => s.id !== id);
      setSites(updated);
      setFilteredSites(updated);

      alert("Site deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete, try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Manage Guest Posting Sites
          </h1>

          <Link
            href="/admin/sites/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Add New Site
          </Link>
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 w-full md:w-80">
            <BiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search website, niche, language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-none outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs">#</th>
                  <th className="px-6 py-3 text-left text-xs">Website</th>
                  <th className="px-6 py-3 text-left text-xs">Niche</th>
                  <th className="px-6 py-3 text-left text-xs">DA</th>
                  <th className="px-6 py-3 text-left text-xs">DR</th>
                  <th className="px-6 py-3 text-left text-xs">Price</th>
                  <th className="px-6 py-3 text-left text-xs">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((site, index) => (
                  <tr key={site.id}>
                    <td className="px-6 py-4">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <a
                        href={site.website_url}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        {site.website_url}
                      </a>
                    </td>

                    <td className="px-6 py-4">{site.niche}</td>
                    <td className="px-6 py-4">{site.da}</td>
                    <td className="px-6 py-4">{site.dr}</td>
                    <td className="px-6 py-4">${site.price}</td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/sites/edit/${site.id}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(site.id)}
                          disabled={deletingId === site.id}
                          className="bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                        >
                          {deletingId === site.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm"
          >
            Next
          </button>
        </div>

      </div>
    </main>
  );
}
