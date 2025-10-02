"use client";
import React, { useEffect, useState } from 'react';
import planData from "./plan";
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { BiCheck } from 'react-icons/bi';


function ResellersPlan() {
  const [plans, setPlans] = useState([]);
  const [filter, setFilter] = useState(["10pr", "20pr", "30pr", "40pr", "50pr", "100pr"]);
  const [selectedFilter, setSelectedFilter] = useState("10pr");

  useEffect(() => {
    setPlans(planData.filter((p) => p.pr + "pr".toUpperCase() === selectedFilter.toUpperCase()));
  }, [selectedFilter]);

  return (
    <section className='py-16 m-1 p-2 md:m-3 min-h-screen rounded-3xl bg-no-repeat'
      style={{
        backgroundImage: "url(https://cdn.prod.website-files.com/66e3cafc52638c58d5c746f1/66e7afd9c7a18dc168eb399f_Subtract.webp), url(https://cdn.prod.website-files.com/66e3cafc52638c58d5c746f1/66e7afd9f2c0f73944a569cd_gradient-bottom.webp), url(https://cdn.prod.website-files.com/66e3cafc52638c58d5c746f1/66e7afd977d7d990d1f43a84_gradient-top.webp), url(https://cdn.prod.website-files.com/66e3cafc52638c58d5c746f1/66e788fe3d7856003f3a3df9_home_grid.svg), linear-gradient(180deg, #004cd3, #a8d0f3 76%, #a8d0f3)",
        backgroundSize: "contain, cover, cover, contain, auto"
      }}
    >
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto">
        <h1 className="text-center text-2xl md:text-5xl mt-4 font-semibold text-white">
          Choose a plan when you&apos;re ready
        </h1>
        <p className="text-sm md:text-base text-center max-w-4xl text-white mx-auto mt-5">
          Choose a plan that fits your business needs and budget. No hidden fees, no surprises—just straightforward pricing for powerful financial management.
        </p>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`wow animate__animated animate__fadeInUp`}
              data-wow-delay={`${idx * 0.2}s`}
            >
              <div className="bg-[#e0e7f5] border rounded-xl border-[#e0e7f5] p-2">
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
    </section>
  );
}

export default ResellersPlan;
