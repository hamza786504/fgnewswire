"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";





function PlanCard({ plan, idx }) {
    const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
    const selectedPrice = plan.price[selectedPriceIndex];
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    // Check if plan.price is an array or a string
    const isPriceArray = Array.isArray(plan.price);

    // Get the minimum price to display in header
    const getMinPrice = () => {
        if (!isPriceArray) return plan.price;

        if (plan.price.length === 0) return "$0.00";

        // Find minimum price from the array
        const minPriceObj = plan.price.reduce((min, current) => {
            const minPrice = parseFloat(min.price) || 0;
            const currentPrice = parseFloat(current.price) || 0;
            return currentPrice < minPrice ? current : min;
        }, plan.price[0]);

        return `$${parseFloat(minPriceObj.price).toFixed(2)}`;
    };

    // Format price option for select
    const formatPriceOption = (priceObj) => {
        const quantity = priceObj.quantity || 1;
        const price = parseFloat(priceObj.price) || 0;
        const total = price;

        return `${quantity} press release${quantity > 1 ? 's' : ''} for $${total.toFixed(2)}`;
    };



  const handleBuyNow = async () => {
    try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please login to continue");
            return;
        }

        const selectedPrice = plan.price[selectedPriceIndex];

        const payload = {
            name: user.name,
            email: user.email,
            mobile: user.mobile || "",
            country: user.country || "",
            city: user.city || "",
            address: user.address || "",

            // ✅ IMPORTANT PART
            quantity: selectedPrice?.quantity || 1,
            price: selectedPrice?.price || 0,
            order_type: "press_release",
            item_id: plan.id,
            item_type: "package",
            price_index: selectedPriceIndex,
        };

        const response = await fetch(
            "https://api.glassworld06.com/api/orders",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
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

        router.push("/dashboard/orders");
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="px-2 wow animate__animated animate__fadeInUp" data-wow-delay={`${idx * 0.3}s`}>
            <div className="border max-w-[350px] mx-auto border-gray-300 bg-white hover:bg-black flex flex-col group h-full">
                {/* Header */}
                <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-purple-700 border-gray-300 text-center">
                    <h3 className="text-xl text-white font-semibold">{plan.name || plan.title}</h3>
                    <div className="mt-0">
                        <h2 className="text-4xl text-white font-semibold">{getMinPrice()}</h2>
                        <h4 className="text-white text-sm">
                            1 press release
                        </h4>
                    </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                    <p className="text-sm text-gray-600 group-hover:text-white mb-4">
                        {plan.description || "Guaranteed News Distribution with Media Coverage"}
                    </p>

                    {plan.features && plan.features.length > 0 ? (
                        <ul className="space-y-2 overflow-y-auto max-h-40 pr-2">
                            {plan.features.map((f, i) => (
                                <li key={i} className="flex items-center text-sm group-hover:text-white text-gray-700">
                                    {f.included ? (
                                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                    ) : (
                                        <FaTimesCircle className="text-red-500 mr-2 flex-shrink-0" />
                                    )}
                                    <span className="flex-1">{f.text}</span>
                                    {f.image && f.image !== "null" && (
                                        <div className="ml-2 flex-shrink-0">
                                            <Image
                                                src={f.image.startsWith('http') ? f.image : `https://api.glassworld06.com/storage/${f.image}`}
                                                alt={f.text}
                                                width={50}
                                                height={20}
                                                className="inline-block object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 group-hover:text-white">No features listed</p>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-300">
                    <p className="group-hover:text-white text-sm mb-2">
                        For Demo PR Report:{" "}
                        <Link
                            href={plan.demo_report_url || plan.demo || "#"}
                            target="_blank"
                            className="text-blue-600 underline group-hover:text-blue-400"
                        >
                            Click here
                        </Link>
                    </p>

                    {/* Price Options Dropdown */}
                    {isPriceArray && plan.price.length > 0 && (
                        <select
                            value={selectedPriceIndex}
                            onChange={(e) => setSelectedPriceIndex(Number(e.target.value))}
                            className="w-full group-hover:text-white border group-hover:border-white rounded p-2 mb-4 bg-white group-hover:bg-black text-black group-hover:text-white">
                            {plan.price.map((p, j) => (
                                <option key={j} value={j} className="group-hover:text-white text-black">
                                    {formatPriceOption(p)}
                                </option>
                            ))}
                        </select>
                    )}

                    <button
                        onClick={handleBuyNow}
                        disabled={loading}
                        className="block w-full bg-gradient-to-r from-blue-500 to-purple-700 text-white py-2 rounded font-semibold disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Buy Now"}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default PlanCard;