'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/signin');
    }
  }, [router]);

  if (!user) return null;

  return (
      <div className="my-10 max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Details</h1>

        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-600">Name:</label>
            <p className="text-gray-800">{user.name}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">Email:</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">Account Created:</label>
            <p className="text-gray-800">{new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
  );
}
