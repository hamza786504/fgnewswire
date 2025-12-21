'use client';

import { useEffect, useState, useRef } from 'react';

export default function CreditsPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [credits, setCredits] = useState([]);
  const [loadingCredits, setLoadingCredits] = useState(false);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dropdownRef = useRef(null);

  /* =============================
     Fetch Users (once)
  ============================== */
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('https://api.glassworld06.com/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setUsers(json.data.filter(u => u.role !== 'admin'));
    };

    fetchUsers();
  }, []);

  /* =============================
     Close dropdown on outside click
  ============================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* =============================
     Filter Users by Email
  ============================== */
  const filteredUsers =
    query.length >= 3
      ? users.filter((u) =>
          u.email.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  /* =============================
     Select User
  ============================== */
  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setQuery(user.email);
    setShowDropdown(false);
    fetchCredits(user.id);
  };

  /* =============================
     Fetch Credits by User ID
     GET /credits/{user_id}
  ============================== */
  const fetchCredits = async (userId) => {
    setLoadingCredits(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `https://api.glassworld06.com/api/credits/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      setCredits(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCredits(false);
    }
  };

  /* =============================
     Add Credits
  ============================== */
  const handleAddCredit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedUser) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        'https://api.glassworld06.com/api/credits/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: selectedUser.id,
            amount: Number(amount),
            description,
          }),
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setAmount('');
      setDescription('');
      fetchCredits(selectedUser.id);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-1 bg-[#ebecf0] min-h-full p-4">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold text-gray-800">
          User Credits Management
        </h1>

        {/* =============================
            Custom Search Select Box
        ============================== */}
        <div className="bg-white p-4 rounded-md relative" ref={dropdownRef}>
          <label className="block text-sm font-medium mb-1">
            Search User by Email
          </label>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(e.target.value.length >= 3);
            }}
            placeholder="Type at least 3 characters..."
            className="bg-white w-full rounded-md border px-3 py-2"
          />

          {showDropdown && filteredUsers.length > 0 && (
            <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                >
                  <p className="font-medium text-gray-800">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {showDropdown && filteredUsers.length === 0 && (
            <div className="absolute z-20 mt-1 w-full bg-white border rounded-md px-4 py-2 text-sm text-gray-500">
              No users found
            </div>
          )}
        </div>

        {/* =============================
            Add Credit Form
        ============================== */}
        {selectedUser && (
          <form
            onSubmit={handleAddCredit}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-semibold mb-3">
              Add Credit — {selectedUser.email}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-md border px-3 py-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-md border px-3 py-2"
              />
            </div>

            <div className="mt-4 text-right">
              <button
                disabled={submitting}
                className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Processing...' : 'Add Credit'}
              </button>
            </div>
          </form>
        )}

        {/* =============================
            Credit History Table
        ============================== */}
        {selectedUser && (
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Credit History</h2>

            {loadingCredits ? (
              <p className="text-gray-500">Loading...</p>
            ) : credits.length === 0 ? (
              <p className="text-gray-500">No credit records found.</p>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Admin</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {credits.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className={`px-4 py-2 font-semibold ${
                        c.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {c.amount}
                      </td>
                      <td className="px-4 py-2 capitalize">
                        {c.type.replace('_', ' ')}
                      </td>
                      <td className="px-4 py-2">{c.description || '-'}</td>
                      <td className="px-4 py-2">{c.admin?.name || '-'}</td>
                      <td className="px-4 py-2">
                        {new Date(c.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Add Credit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
