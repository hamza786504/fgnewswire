"use client";
import React, { useEffect, useState } from 'react';
import planData from "./plan";
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { BiCheck } from 'react-icons/bi';
import CallToAction from '../../Componenets/CallToAction'

function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(planData);
  }, []);
  return (
    <>

      <div className="md:max-w-3xl lg:max-w-5xl mx-auto">
        <h1 className="text-center text-2xl md:text-5xl mt-4 font-semibold text-blue-500">
          Choose a plan when you’re ready
        </h1>
        <p className="text-sm md:text-base text-center max-w-4xl text-black mb-6 mx-auto mt-5">
          Choose a plan that fits your business needs and budget. No hidden fees, no surprises—just straightforward pricing for powerful financial management.
        </p>

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
        <CallToAction />
      </div>
    </>
  )
}

export default Plans



