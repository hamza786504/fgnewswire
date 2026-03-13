'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      router.push('/signin');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {

      const token = localStorage.getItem('token');

      const res = await fetch(
        'https://api.glassworld06.com/api/all_orders',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Failed to load orders');
      }
      console.log(json.data);
      

      setOrders(json.data || []);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#ebecf0] p-6">

      <div className="max-w-6xl mx-auto space-y-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold mb-4">
            My Orders
          </h1>

          {loading && <p>Loading orders...</p>}

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {!loading && orders.length === 0 && (
            <p className="text-gray-500">
              No orders found.
            </p>
          )}

          {!loading && orders.length > 0 && (

            <table className="w-full text-sm border">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border text-left">Order</th>
                  <th className="p-2 border text-left">Type</th>
                  <th className="p-2 border text-left">Credits</th>
                  <th className="p-2 border text-left">Price</th>
                  <th className="p-2 border text-left">Status</th>
                  <th className="p-2 border text-left">Date</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order.id} className="border-t">

                    <td className="p-2 border font-medium">
                      {order.order_number}
                    </td>

                    <td className="p-2 border capitalize">
                      {order.order_type === 'guest_posting'
                        ? 'Guest Posting'
                        : 'Press Release'}
                    </td>

                    <td className="p-2 border">
                      {order.total_credit}
                    </td>

                    <td className="p-2 border">
                      ${order.total_price}
                    </td>

                    <td className="p-2 border">

                      <span
                        className={`px-2 py-1 text-xs rounded 
                        ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td className="p-2 border">
                      {new Date(order.created_at).toLocaleDateString()}
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