import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

// This is a server-side fetch function
const fetchPackages = async () => {
    try {
        const response = await fetch('https://api.glassworld06.com/api/packages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add cache/revalidation for server components
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) {
            console.error('Failed to fetch packages');
            return [];
        }

        const data = await response.json();
        return data.data || data || [];
    } catch (err) {
        console.error('Error fetching packages:', err);
        return [];
    }
};

// This is a Server Component (no "use client")
async function GuestPostingPackageCard() {
    // Fetch data on the server
    const allPackages = await fetchPackages();
    
    // Filter packages
    const guestPostingPackages = allPackages.filter(p => p.type === "guest_posting");

    if (guestPostingPackages.length === 0) {
        return (
            <div className="col-span-3 text-center py-8">
                <p>No guest posting packages available.</p>
            </div>
        );
    }

    return (
        <>
            {guestPostingPackages.slice(0,3).map((plan, idx) => (
                <div
                    key={plan.id || idx}
                    className={`rounded-lg border shadow-md flex flex-col justify-between ${idx === 1
                        ? "bg-blue-50 border-blue-400 relative"
                        : "bg-white border-orange-400"
                        }`}
                >
                    {/* Popular Tag */}
                    {idx === 1 && (
                        <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                            Popular
                        </div>
                    )}

                    {/* Header */}
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold">{plan.name || plan.title || "Package"}</h3>
                        <h2 className="text-3xl font-bold mt-2">
                            {Array.isArray(plan.price) && plan.price.length > 0
                                ? `$${parseFloat(plan.price[0].price || 0).toFixed(2)}`
                                : '$0.00'}
                        </h2>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {plan.description || "Guest posting package"}
                        </p>
                    </div>

                    {/* Features */}
                    <ul className="px-6 pb-6 space-y-2 text-gray-700 text-sm flex-1">
                        {plan.features && plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start justify-start">
                                <FaCheckCircle className="mt-1 flex-shrink-0 text-green-500" />
                                <span className="ml-2">{feature.text}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Button */}
                    <div className="p-6">
                        <Link
                            href="#"
                            className={`block w-full text-center py-2 rounded font-semibold hover:text-white border transition ${idx === 1
                                ? "text-blue-600 border-blue-600 hover:bg-blue-700"
                                : "text-orange-400 border-orange-400 hover:bg-orange-400"
                                }`}
                        >
                            BUY NOW
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}

export default GuestPostingPackageCard;