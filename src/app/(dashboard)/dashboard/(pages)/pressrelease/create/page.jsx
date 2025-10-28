'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { BiCheck } from 'react-icons/bi';
import packagesData from "./plan";
const PressReleasePackages = () => {
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        setPackages(packagesData);
    }, [])

    const handleQuantityChange = (packageId, value) => {
        setSelectedQuantities({
            ...selectedQuantities,
            [packageId]: value
        });
    };



    return (
        <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
            <div className="max-w-7xl mx-auto">
                <div className="overflow-y-scoll container mx-auto px-0 pb-8">
                    <h1 className="text-2xl font-bold text-start mb-8">Press Release Packages</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {packages?.map((pkg, idx) => (
                            <div
                                key={idx}
                                className="wow animate__animated animate__fadeInUp"
                                data-wow-delay={`${idx * 0.2}s`}
                            >
                                <div className="rounded-xl">
                                    <div className="h-full bg-white rounded-lg p-6">
                                        <div className="flex items-center justify-start space-x-3 mt-2">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-b from-blue-700 to-blue-400 text-white flex items-center justify-center">
                                                <FaStar />
                                            </div>
                                            <p className="text-black font-semibold capitalize">
                                                {pkg.name}
                                            </p>
                                        </div>
                                        <p className="text-xs flex items-start justify-start md:text-sm my-5 h-[90px] text-start text-[#909090]">
                                            {pkg.info}
                                        </p>
                                        <p className="mb-4 text-2xl font-normal text-black">
                                            {pkg.price} <sup className='text-gray-400 text-base italic'>USD</sup>
                                        </p>

                                        <ul className='my-3 max-h-[200px] overflow-y-auto no-scrollbar space-y-1.5'>
                                            {pkg.details.map((d, id) => (
                                                <li key={id} className='italic text-xs md:text-sm'>
                                                    <span className='mr-3 inline-flex bg-blue-700 items-center justify-center text-white rounded-full h-4 w-4 border-none'>
                                                        <BiCheck />
                                                    </span>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                        {/* Quantity Selector */}
                                        <div className="mb-4">
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                value={selectedQuantities[pkg.id] || 1}
                                                onChange={(e) => handleQuantityChange(pkg.id, parseInt(e.target.value))}
                                            >
                                                {pkg.quantityOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.text} - ${option.price}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Payment Buttons */}
                                        <div className="space-y-2">
                                            <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium transition-colors">
                                                Pay With PayPal
                                            </button>
                                            <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white font-medium transition-colors">
                                                Pay With Crypto
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PressReleasePackages;