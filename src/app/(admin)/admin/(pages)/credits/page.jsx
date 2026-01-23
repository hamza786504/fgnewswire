'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/(pages)/Componenets/Elements/Button';

export default function CreditsUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'https://api.glassworld06.com/api/users',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const json = await response.json();

      // API returns users inside `data`
      setUsers(json.data.filter(d => d.role !== "admin"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 bg-[#ebecf0] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Users Credit Management
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Credits</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-gray-300 border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>

                  <td
                    className={`text-center px-4 py-2 font-semibold ${
                      Number(user.credit_balance) >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {user.credit_balance}
                  </td>

                  <td className="text-center px-4 py-2">
                    <Button content={"Add Credit"} href={`/admin/credits/add?id=${user.id}`}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </main>
  );
}
