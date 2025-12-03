'use client';

import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Button from '@/app/(pages)/Componenets/Elements/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PackagesTable({ initialPackages }) {
  const [packages, setPackages] = useState(initialPackages || []);
  const [filteredPackages, setFilteredPackages] = useState(initialPackages || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Search Filter
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

  // Pagination
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPackages.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Delete package
  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      setDeletingId(slug);
      const token = localStorage.getItem("token");

      const res = await fetch(`https://api.glassworld06.com/api/packages/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      const updated = packages.filter((p) => p.slug !== slug);
      setPackages(updated);
      setFilteredPackages(updated);

      alert("Package deleted!");
    } catch (e) {
      console.error(e);
      alert("Delete failed. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manage Packages</h1>
          <Button href="/manager/create" content="Add Package" />
        </div>

        {/* Search */}
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

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs">#</th>
                  <th className="px-6 py-3 text-left text-xs">Name</th>
                  <th className="px-6 py-3 text-left text-xs">Type</th>
                  <th className="px-6 py-3 text-left text-xs">Description</th>
                  <th className="px-6 py-3 text-left text-xs">Action</th>
                </tr>
              </thead>
              <tbody>

                {currentItems.map((pkg, index) => (
                  <tr key={pkg.slug}>
                    <td className="px-6 py-4">{startIndex + index + 1}</td>
                    <td className="px-6 py-4">{pkg.name}</td>
                    <td className="px-6 py-4">{pkg.type}</td>
                    <td className="px-6 py-4">{pkg.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/manager/edit/${pkg.slug}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(pkg.slug)}
                          disabled={deletingId === pkg.slug}
                          className="bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                        >
                          {deletingId === pkg.slug ? "Deleting..." : "Delete"}
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
            className="px-3 py-1 text-sm"
          >
            Next
          </button>
        </div>

      </div>
    </main>
  );
}
