'use client';

import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Button from '@/app/(pages)/Componenets/Elements/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PackagesTable() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // ✅ Fetch all packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api.glassworld06.com/api/packages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch packages');

        const data = await response.json();

        setPackages(data || []);
        setFilteredPackages(data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load packages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // ✅ Handle search
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = packages.filter(pkg =>
      pkg.name?.toLowerCase().includes(term) ||
      pkg.type?.toLowerCase().includes(term) ||
      pkg.description?.toLowerCase().includes(term)
    );
    setFilteredPackages(filtered);
    setCurrentPage(1);
  }, [searchTerm, packages]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPackages.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ✅ Delete Package by Slug
  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (!confirmDelete) return;

    try {
      setDeletingId(slug);
      const token = localStorage.getItem("token");

      const response = await fetch(`https://api.glassworld06.com/api/packages/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete package");

      // ✅ Remove deleted package from local state
      setPackages((prev) => prev.filter((p) => p.slug !== slug));
      setFilteredPackages((prev) => prev.filter((p) => p.slug !== slug));

      alert("Package deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete package. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };


  return (
    <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manage Packages</h1>
          <Button href="/admin/package/create" content="Add Package" />
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-1 w-full md:w-64">
            <BiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search packages..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500 text-sm">
                      Loading packages...
                    </td>
                  </tr>
                )}
                {!loading && error && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-red-600 text-sm">{error}</td>
                  </tr>
                )}
                {!loading && !error && currentItems.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-blue-600 text-sm font-bold">
                      No Packages Found
                    </td>
                  </tr>
                )}

                {!loading && !error && currentItems.map((pkg, index) => (
                  <tr key={pkg.id || index}>
                    <td className="px-6 py-4 text-sm text-gray-700">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 capitalize">{pkg.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 capitalize">{pkg.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pkg.description}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link href={`/admin/package/edit/${pkg.slug}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(pkg.slug)}
                          disabled={deletingId === pkg.slug}
                          className={`px-3 py-1 rounded-md text-xs text-white ${deletingId === pkg.id
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                          {deletingId === pkg.id ? 'Deleting...' : 'Delete'}
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
            className={`px-3 py-1 text-sm rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'
              }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
            .map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 text-sm rounded-md ${page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-100'
                  }`}
              >
                {page}
              </button>
            ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
