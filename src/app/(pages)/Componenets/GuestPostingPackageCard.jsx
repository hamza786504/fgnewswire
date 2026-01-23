"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default function GuestPostingPackageCard({ limit }) {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // Fetch packages (CLIENT SIDE)
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://api.glassworld06.com/api/packages"
        );

        const data = await response.json();
        setPackages(data.data || data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, []);

  const guestPostingPackages = packages.filter(
    (p) => p.type === "guest_posting"
  );

  const visiblePackages = limit
    ? guestPostingPackages.slice(0, limit)
    : guestPostingPackages;

  // BUY NOW HANDLER
  const handleBuyNow = async (planId) => {
    try {
      setLoadingId(planId);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login to continue");
        return;
      }

      const payload = {
        name: user.name,
        email: user.email,
        mobile: user.mobile || "",
        country: user.country || "",
        city: user.city || "",
        address: user.address || "",
        item_id: planId,
        item_type: "package",
      };
      console.log(JSON.stringify(payload));
      

      const response = await fetch(
        "https://api.glassworld06.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // remove if not required
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Order placement failed");
        return;
      }

      // ✅ SUCCESS
      router.push("/dashboard/guest-post");
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  if (visiblePackages.length === 0) {
    return (
      <div className="col-span-3 text-center py-8">
        <p>No guest posting packages available.</p>
      </div>
    );
  }

  return (
    <>
      {visiblePackages.map((plan, idx) => (
        <div
          key={plan.id}
          className={`rounded-lg border shadow-md flex flex-col justify-between ${
            idx === 1
              ? "bg-blue-50 border-blue-400 relative"
              : "bg-white border-orange-400"
          }`}
        >
          {/* Popular Tag */}
          {idx === 1 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg">
              Popular
            </div>
          )}

          {/* Header */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold">
              {plan.name || plan.title || "Package"}
            </h3>
            <h2 className="text-3xl font-bold mt-2">
              {Array.isArray(plan.price) && plan.price.length > 0
                ? `$${parseFloat(plan.price[0].price || 0).toFixed(2)}`
                : "$0.00"}
            </h2>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {plan.description || "Guest posting package"}
            </p>
          </div>

          {/* Features */}
          <ul className="px-6 pb-6 space-y-2 text-gray-700 text-sm flex-1">
            {plan.features?.map((feature, i) => (
              <li key={i} className="flex items-start">
                <FaCheckCircle className="mt-1 text-green-500" />
                <span className="ml-2">{feature.text}</span>
              </li>
            ))}
          </ul>

          {/* Button */}
          <div className="p-6">
            <button
              onClick={() => handleBuyNow(plan.id)}
              disabled={loadingId === plan.id}
              className={`block w-full py-2 rounded font-semibold border transition
                ${
                  idx === 1
                    ? "text-blue-600 border-blue-600 hover:bg-blue-700 hover:text-white"
                    : "text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-white"
                }
                disabled:opacity-50`}
            >
              {loadingId === plan.id ? "Processing..." : "BUY NOW"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
