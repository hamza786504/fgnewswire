'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AddCreditPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const userId = searchParams.get('id');

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!userId) {
            setError('User ID is missing.');
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!amount || Number(amount) <= 0) {
            setError('Please enter a valid credit amount.');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await fetch(
                'https://api.glassworld06.com/api/credits/add',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        user_id: Number(userId),
                        amount: Number(amount),
                        description: description || 'Manual credit added by admin',
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add credits');
            }

            setSuccess(`Credits added successfully. New balance: ${data.balance}`);
            setAmount('');
            setDescription('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-6 bg-[#ebecf0] min-h-screen">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

                <h1 className="text-2xl font-bold mb-6">
                    Add Credits to User
                </h1>

                {error && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Credit Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter credit amount"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description (optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Bonus credits, adjustment, refund, etc."
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? 'Submitting...' : 'Add Credits'}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </main>
    );
}
