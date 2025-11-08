'use client';

import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Button from '@/app/(pages)/Componenets/Elements/Button';
import Link from 'next/link';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api.glassworld06.com/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();

        console.log(data);
        setUsers(data.data.filter(d => d.role !== "admin") || []);
        setFilteredUsers(data.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.role?.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ✅ Delete user by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem('token');

      const response = await fetch(`https://api.glassworld06.com/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete user');

      setUsers((prev) => prev.filter((u) => u.id !== id));
      setFilteredUsers((prev) => prev.filter((u) => u.id !== id));
      alert('User deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete user. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manage Users</h1>
          <Button href="/admin/users/create" content="Add User" />
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-1 w-full md:w-64">
            <BiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search users..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500 text-sm">
                      Loading users...
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
                      No Users Found
                    </td>
                  </tr>
                )}

                {!loading && !error && currentItems.map((user, index) => (
                  <tr key={user.id || index}>
                    <td className="px-6 py-4 text-sm text-gray-700">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 capitalize">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 capitalize">{user.role}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/users/edit/${user.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={deletingId === user.id}
                          className={`px-3 py-1 rounded-md text-xs text-white ${
                            deletingId === user.id
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {deletingId === user.id ? 'Deleting...' : 'Delete'}
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
            className={`px-3 py-1 text-sm rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:underline'
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
                className={`px-3 py-1 text-sm rounded-md ${
                  page === currentPage
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
            className={`px-3 py-1 text-sm rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:underline'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
