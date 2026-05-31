'use client';

import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Button from '@/app/(pages)/Componenets/Elements/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PressReleaseTable({ initialPressReleases }) {
  const [pressReleases, setPressReleases] = useState(initialPressReleases || []);
  const [filteredPressReleases, setFilteredPressReleases] = useState(initialPressReleases || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPressRelease, setSelectedPressRelease] = useState(null);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Search Filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = pressReleases.filter(pr =>
      pr.title?.toLowerCase().includes(term) ||
      pr.excerpt?.toLowerCase().includes(term) ||
      pr.status?.toLowerCase().includes(term) ||
      pr.user?.name?.toLowerCase().includes(term)
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

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      approved: "bg-green-100 text-green-800",
      draft: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800"
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };


  const formatDate = (dateString) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


    // ✅ Delete handler
  const handleDeleteClick = (pressRelease) => {
    setSelectedPressRelease(pressRelease);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedPressRelease) return;

    setDeletingId(selectedPressRelease.slug);
    setError('');

    try {
       const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");
      const response = await fetch(`https://api.glassworld06.com/api/press-releases/${selectedPressRelease.slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted press release from the state
        setPressReleases(prevReleases => 
          prevReleases.filter(pr => pr.id !== selectedPressRelease.id)
        );
        setShowDeleteModal(false);
        setSelectedPressRelease(null);
      } else {
        setError(data.message || 'Failed to delete press release');
      }
    } catch (error) {
      console.error('Error deleting press release:', error);
      setError('An error occurred while deleting the press release');
    } finally {
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedPressRelease(null);
    setError('');
  };

  return (
    <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manage Press Releases</h1>
          <Button href="/dashboard/pressrelease/create" content="Add Press Release" />
        </div>

        {/* Search */}
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

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((pr, index) => (
                  <tr key={pr.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={pr.title}>
                        {pr.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{pr.user?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`capitalize px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(pr.status)}`}>
                        {pr.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(pr.created_at)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(pr.published_at)}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/pressrelease/edit/${pr.slug}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700"
                        >
                          Edit
                        </Link>


                      </div>
                    </td>
                  </tr>
                ))}

                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No press releases found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

      </div>

        {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPressRelease && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "{selectedPressRelease.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId === selectedPressRelease.slug}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId === selectedPressRelease.slug ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}