'use client';

import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Button from '@/app/(pages)/Componenets/Elements/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function PressReleasesTable({ initialPressReleases }) {
  const [pressReleases, setPressReleases] = useState(initialPressReleases || []);
  const [filteredPressReleases, setFilteredPressReleases] = useState(initialPressReleases || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Search Filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = pressReleases.filter(pr =>
      pr.title?.toLowerCase().includes(term) ||
      pr.excerpt?.toLowerCase().includes(term) ||
      pr.slug?.toLowerCase().includes(term) ||
      pr.status?.toLowerCase().includes(term)
    );
    setFilteredPressReleases(filtered);
    setCurrentPage(1);
  }, [searchTerm, pressReleases]);

  // Pagination
  const totalPages = Math.ceil(filteredPressReleases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPressReleases.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Delete press release
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this press release?")) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      const res = await fetch(`https://api.glassworld06.com/api/press-releases/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) throw new Error("Failed to delete press release");

      const updated = pressReleases.filter((pr) => pr.id !== id);
      setPressReleases(updated);
      setFilteredPressReleases(updated);

      alert("Press release deleted successfully!");
    } catch (e) {
      console.error("Delete error:", e);
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.png';
    return imagePath.startsWith('http') ? imagePath : `https://api.glassworld06.com${imagePath}`;
  };

  return (
    <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manage Press Releases</h1>
          <Button href="/dashboard/pressrelease/create" content="Add Press Release" />
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-1 w-full md:w-64">
            <BiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search press releases..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Excerpt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((pr, index) => (
                    <tr key={pr.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              src={getImageUrl(pr.featured_image)}
                              alt={pr.title}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-md object-cover"
                              unoptimized // For external URLs
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {pr.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {pr.excerpt || 'No excerpt'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          pr.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : pr.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {pr.status || 'draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/pressrelease/edit/${pr.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(pr.id)}
                            disabled={deletingId === pr.id}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                          >
                            {deletingId === pr.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-sm text-gray-500">
                      {searchTerm ? 'No press releases found matching your search.' : 'No press releases available.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === page 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </main>
  );
}