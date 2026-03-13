'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TransactionsPage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const guestPostingCredits = transactions
    .filter(
      (tx) =>
        tx.reference?.type === "guest_posting" && Number(tx.amount) > 0
    )
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const packageCredits = transactions
    .filter(
      (tx) =>
        tx.reference?.type === "package" && Number(tx.amount) > 0
    )
    .reduce((sum, tx) => sum + Number(tx.amount), 0);


  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/signin');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetchTransactions(parsedUser.id);
  }, [router]);

  const fetchTransactions = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthenticated');

      const res = await fetch(
        `https://api.glassworld06.com/api/credits/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Failed to load transactions');
      }

      // ✅ Correct handling
      setTransactions(json.data || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#ebecf0] p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* CURRENT CREDITS */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Current Credits
          </h2>
          <p className="text-4xl font-bold text-green-600">
            {user.credit_balance}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-gray-600">Guest Posting Credits</p>
              <p className="text-xl font-bold text-blue-600">
                {guestPostingCredits}
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <p className="text-gray-600">Press Release Credits</p>
              <p className="text-xl font-bold text-purple-600">
                {packageCredits}
              </p>
            </div>

          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Credit Transactions
          </h2>

          {loading && <p>Loading transactions...</p>}

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {!loading && transactions.length === 0 && (
            <p className="text-gray-500">No transactions found.</p>
          )}

          {!loading && transactions.length > 0 && (
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border text-left">Date</th>
                  <th className="p-2 border text-left">Description</th>
                  <th className="p-2 border text-left">Type</th>
                  <th className="p-2 border text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t">

                    <td className="p-2 border">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-2 border">
                      <span className='capitalize'>{tx.description || '-'}</span>
                      <br />
                      <span className='capitalize text-xs text-gray-500'>{tx.type.replace('_', ' ')}</span> {' - '}
                      <span className="text-xs text-gray-500">
                        {tx.reference?.type === "guest_posting"
                          ? tx.reference?.website_url
                          : tx.reference?.name}
                      </span>
                    </td>

                    <td className="p-2 border capitalize text-gray-600">


                      {tx.reference && (
                        <div className="mt-1">
                          {tx.reference.type === 'package'
                            ? 'Press Release'
                            : 'Guest Posting'}
                        </div>
                      )}
                    </td>

                    <td
                      className={`p-2 border text-right font-semibold ${Number(tx.amount) >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                        }`}
                    >
                      {Number(tx.amount) > 0
                        ? `+${tx.amount}`
                        : tx.amount}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </main>
  );
}
