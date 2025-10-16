'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { BiCheck } from 'react-icons/bi';
import packagesData from "./plan";
const ResellerPackage = () => {


    const [plans, setPlans] = useState([]);
    const [filter, setFilter] = useState(["10pr", "20pr", "30pr", "40pr", "50pr", "100pr"]);
    const [selectedFilter, setSelectedFilter] = useState("10pr");

    useEffect(() => {
        setPlans(packagesData);
    }, [])


    useEffect(() => {
        setPlans(packagesData.filter((p) => p.pr + "pr".toUpperCase() === selectedFilter.toUpperCase()));
    }, [selectedFilter]);




    return (
        <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
            <div className="max-w-7xl mx-auto">
                <div className="py-10 flex justify-center items-center p-1">
                    <div className="flex items-center justify-center rounded-lg p-2 px-1 md:px-1.5 sm:space-x-1 ring ring-white bg-blue-700">
                        {filter.map((fil, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedFilter(fil.toUpperCase())}
                                className={`outline-0 py-1 px-1 md:py-2.5 md:px-5 text-xs md:text-base uppercase rounded-md cursor-pointer ${selectedFilter.toUpperCase() === fil.toUpperCase() ? "font-semibold text-black bg-white" : "text-white"
                                    }`}
                            >
                                {fil}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`wow animate__animated animate__fadeInUp`}
                            data-wow-delay={`${idx * 0.2}s`}
                        >
                            <div className="bg-[#e0e7f5] rounded-xl">
                                <div className="h-full bg-white rounded-lg p-6">
                                    <Image src={plan.image} alt="" width={100} height={100} className='h-40 w-64' />
                                    <div className="flex items-center justify-start space-x-3 mt-2">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-b from-blue-700 to-blue-400 text-white flex items-center justify-center">
                                            <FaStar />
                                        </div>
                                        <p className="text-black font-semibold capitalize">
                                            {plan.name}
                                        </p>
                                    </div>
                                    <p className="my-4 text-2xl font-normal text-black">
                                        {plan.price} <sup className='text-gray-400 text-base italic'>USD</sup>
                                    </p>
                                    <p className="text-xs flex items-center md:text-sm h-[60px] text-center text-[#909090]">
                                        {plan.info}
                                    </p>
                                    <ul className='my-3 max-h-[200px] overflow-y-auto no-scrollbar space-y-1.5'>
                                        {plan.details.map((d, id) => (
                                            <li key={id} className='italic text-xs md:text-sm'>
                                                <span className='mr-3 inline-flex bg-blue-700 items-center justify-center text-white rounded-full h-4 w-4 border-none'>
                                                    <BiCheck />
                                                </span>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full mt-4 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ResellerPackage;