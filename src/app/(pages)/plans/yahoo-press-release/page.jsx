"use client";
import React, { useState } from 'react';
import CallToAction from '../../Componenets/CallToAction';
import { FaStar } from 'react-icons/fa6';
import { BiCheck } from 'react-icons/bi';
import Image from 'next/image';

function YahooPressRelease() {
  const [plan, setPlan] = useState({
    "pr": 100,
    "image": "/imgs/resellers-plan/yahoo business insider.png",
    "name": "Basic Package",
    "info": "200+ Sites",
    "price": "$500.00",
    "details": [
      "200 News Sites",
      "Google Index",
      "Financial News Sites",
      "Local News sites",
      "500 words",
      "5 Images",
      "5 hyperlinks",
    ]
  });

  return (
    <>
      <section className="px-3 md:max-w-3xl gap-3 lg:max-w-5xl mx-auto flex flex-col md:flex-row items-start py-6 justify-between">
        <div className="w-full md:w-auto flex-1">
          <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
            Yahoo Press Release – Guidelines
          </h1>
          <p className='text-sm md:text-base'><strong>Yahoo Press Release Distribution</strong> is an effective approach to boost your brand in the required market.  Yahoo News and Yahoo Finance are among the best media sources for distributing your press releases and reaching a large portion of the client base. However, there are some restrictions on publishing a Yahoo press release.</p>
          <p className='text-sm md:text-base font-bold my-3'>The following are some of the guidelines that you should consider prior to Yahoo press release distribution:</p>
          <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
            <li className='text-sm md:text-base'>An attractive headline must include a reference to the announcement made in the press release.</li>
            <li className='text-sm md:text-base'>For distribution, the press release must contain important information.</li>
            <li className='text-sm md:text-base'>The PR shall not be of poor quality since it will be rejected without reluctance.</li>
            <li className='text-sm md:text-base'>The press release must include all of the brand’s authentic contact details.</li>
            <li className='text-sm md:text-base'>ForCorrect use of keywords to improve search engine optimization.</li>
            <li className='text-sm md:text-base'>Personal information/bios, as well as personal viewpoints, shall not be included in the press release. It should also not contain any plot lines that promote hate, violence, racism or any other harmful behavior to a company or a person.</li>
            <li className='text-sm md:text-base'>There should be no narrative that tries to discredit a company’s or individual’s product or services.</li>
            <li className='text-sm md:text-base'>Sexually explicit storylines are not encouraged on Yahoo. It also does not tolerate any form of profanity.</li>
            <li className='text-sm md:text-base'>The purpose of yahoo press releases is to make announcements; therefore, it’s essential to mention announcement-related information in the first paragraph of the PR.</li>
            <li className='text-sm md:text-base'>Press Release should always be in the third person voice.</li>
          </ul>
          <button type="button" className='my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse' data-wow-iteration="3">Submit PR</button>
        </div>
        <aside className="relative w-full md:w-4/12">
          <div
            className={`wow animate__animated animate__fadeInUp`}
            data-wow-delay="0.2s"
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
        </aside>
      </section >
      <CallToAction />
    </>
  )
}

export default YahooPressRelease;
