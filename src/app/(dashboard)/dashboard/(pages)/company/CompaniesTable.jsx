'use client';

import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Button from '@/app/(pages)/Componenets/Elements/Button';
import Link from 'next/link';

export default function CompaniesTable({ initialCompanies }) {
  const [companies, setCompanies] = useState(initialCompanies || []);
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!initialCompanies?.length);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch companies on mount if initialCompanies is empty
  useEffect(() => {
    const fetchCompanies = async () => {
      if (initialCompanies?.length > 0) return;
      
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await fetch("https://api.glassworld06.com/api/companies", {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Session expired. Please login again.");
          } else {
            throw new Error(`Failed to fetch companies: ${res.status}`);
          }
          return;
        }

        const response = await res.json();
        console.log('API Response:', response); // Debug log
        
        // Check if response has the correct structure
        if (response.status === "success" && Array.isArray(response.data)) {
          setCompanies(response.data);
          setFilteredCompanies(response.data);
        } else if (Array.isArray(response.data)) {
          setCompanies(response.data);
          setFilteredCompanies(response.data);
        } else if (Array.isArray(response)) {
          setCompanies(response);
          setFilteredCompanies(response);
        } else {
          setError("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [initialCompanies]);

  // ✅ Search Filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = companies.filter(company =>
      company.name?.toLowerCase().includes(term) ||
      company.contact_person_name?.toLowerCase().includes(term) ||
      company.email?.toLowerCase().includes(term) ||
      company.country?.toLowerCase().includes(term) ||
      company.city?.toLowerCase().includes(term) ||
      company.phone_number?.toLowerCase().includes(term)
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchTerm, companies]);

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Delete company
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No authentication token found. Please login again.");
        return;
      }

      const res = await fetch(`https://api.glassworld06.com/api/companies/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) throw new Error("Failed to delete company");

      const updated = companies.filter((company) => company.id !== id);
      setCompanies(updated);
      setFilteredCompanies(updated);

      alert("Company deleted successfully!");
    } catch (e) {
      console.error("Delete error:", e);
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Format phone number for display
  const formatPhoneNumber = (phone) => {
    if (!phone) return 'N/A';
    return phone;
  };

  // Truncate text for table display
  const truncateText = (text, maxLength = 30) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manage Companies</h1>
          <Button href="/dashboard/company/create" content="Add Company" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-4 text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading companies...</p>
          </div>
        )}

        {/* Search Bar - Only show when not loading and no error */}
        {!loading && !error && (
          <>
            <div className="mb-4 flex items-center justify-end">
              <div className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-1 w-full md:w-64">
                <BiSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search companies..."
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
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact Person
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.length > 0 ? (
                      currentItems.map((company, index) => (
                        <tr key={company.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {startIndex + index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {truncateText(company.name, 25)}
                            </div>
                            {company.website && (
                              <div className="text-xs text-blue-600">
                                <a 
                                  href={company.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {truncateText(company.website.replace(/^https?:\/\//, ''), 20)}
                                </a>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {truncateText(company.contact_person_name, 20)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {truncateText(company.email, 25)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatPhoneNumber(company.phone_number)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {company.city && company.country 
                                ? `${company.city}, ${company.country}`
                                : company.city || company.country || 'N/A'
                              }
                            </div>
                            {company.state && (
                              <div className="text-xs text-gray-500">
                                {company.state}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <Link
                                href={`/dashboard/company/edit/${company.id}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(company.id)}
                                disabled={deletingId === company.id}
                                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                              >
                                {deletingId === company.id ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-sm text-gray-500">
                          {searchTerm ? 'No companies found matching your search.' : 'No companies available.'}
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

            {/* Statistics */}
            <div className="mt-6 text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCompanies.length)} of {filteredCompanies.length} companies
              {searchTerm && (
                <span className="ml-2">
                  (filtered from {companies.length} total companies)
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}