'use client';

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

export default function GuestSitesTable({ initialData }) {
  // Initialize with API response structure
  const [sitesData, setSitesData] = useState({
    data: initialData?.data || [],
    total_sites: initialData?.total_sites || 0,
    total_pages: initialData?.total_pages || 1,
    current_page: initialData?.current_page || 1,
    prev_page: initialData?.prev_page || null,
    next_page: initialData?.next_page || null
  });

  const [filteredSites, setFilteredSites] = useState(initialData?.data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // For API pagination
  const [currentPage, setCurrentPage] = useState(initialData?.current_page || 1);
  const [isLoading, setIsLoading] = useState(false);

  // 🔍 Search filter (client-side)
  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = sitesData.data.filter(site =>
      site.website_url?.toLowerCase().includes(term) ||
      site.publication?.toLowerCase().includes(term) ||
      site.niche?.toLowerCase().includes(term) ||
      site.language?.toLowerCase().includes(term) ||
      site.country?.toLowerCase().includes(term)
    );

    setFilteredSites(filtered);
  }, [searchTerm, sitesData.data]);

  // Fetch data for pagination
  const fetchPage = async (page) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.glassworld06.com/api/guest-posting-sites?page=${page}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setSitesData({
        data: data.data || [],
        total_sites: data.total_sites || 0,
        total_pages: data.total_pages || 1,
        current_page: data.current_page || 1,
        prev_page: data.prev_page || null,
        next_page: data.next_page || null
      });
      setCurrentPage(page);
      setFilteredSites(data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  // 🗑️ Delete guest posting site
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this site?")) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      const res = await fetch(`https://api.glassworld06.com/api/guest-posting-sites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      // Remove from local state
      const updatedData = sitesData.data.filter((s) => s.id !== id);
      setSitesData(prev => ({
        ...prev,
        data: updatedData,
        total_sites: prev.total_sites - 1
      }));

      setFilteredSites(prev => prev.filter((s) => s.id !== id));

      alert("Site deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete, try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Format price to 2 decimal places
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= sitesData.total_pages) {
      fetchPage(page);
    }
  };

  // Calculate total pages for display
  const totalPages = sitesData.total_pages;

  // Add this helper function at the top of your component
  const parseMetrics = (metricsString) => {
    try {
      return JSON.parse(metricsString);
    } catch (error) {
      return {}; // Return empty object if parsing fails
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
            className="bg-linear-to-r from-blue-500 to-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            Add New Site
          </Link>
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 w-full md:w-80">
            <BiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search website, publication, niche, language, country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-none outline-none text-sm text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading sites...</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website / Publication</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niche</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DR</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSites.length > 0 ? (
                    filteredSites.map((site, index) => (
                      <tr key={site.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {((currentPage - 1) * 10) + index + 1}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <a
                              href={site.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {site.website_url}
                            </a>
                            {site.publication && (
                              <span className="text-sm text-gray-500 mt-1">
                                {site.publication}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {site.niche}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {site.language}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {site.country}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {parseMetrics(site.metrics).da || "N/A"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {parseMetrics(site.metrics).dr || "N/A"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          ${formatPrice(site.price)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <Link
                              href={`/admin/sites/edit/${site.slug}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs transition-colors"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(site.id)}
                              disabled={deletingId === site.id}
                              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-1.5 rounded-md text-xs transition-colors"
                            >
                              {deletingId === site.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                        {searchTerm ? "No sites found matching your search." : "No guest posting sites available."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={isLoading}
                className={`px-3 py-1 rounded-md text-sm ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}


      </div>
    </main>
  );
}