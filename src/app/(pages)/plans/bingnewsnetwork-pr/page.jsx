"use client";
import React , {useState} from 'react'
import CallToAction from '../../Componenets/CallToAction'
import { FaStar } from 'react-icons/fa6';
import { BiCheck } from 'react-icons/bi';
import Image from 'next/image';


function BingnewsnetworkPr() {
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
      BigNewsNetwork Press Release – Guidelines
    </h1>
    <p className="text-sm md:text-base">
      <strong>Expand your company’s reach</strong> with FG Newswire’s <strong>BigNewsNetwork Press Release Service</strong>. We help businesses share news, updates, or announcements across one of the largest online news networks, reaching audiences worldwide.
    </p>
    <p className="text-sm md:text-base font-bold my-3">
      Here’s how FG Newswire ensures your BigNewsNetwork press release performs effectively:
    </p>
    <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
      <li className="text-sm md:text-base">Ensure press releases are polished, accurate, and error-free.</li>
      <li className="text-sm md:text-base">Confirm all company and announcement details.</li>
      <li className="text-sm md:text-base">Align content with editorial and legal standards.</li>
      <li className="text-sm md:text-base">Boost press release visibility on search engines and news platforms.</li>
      <li className="text-sm md:text-base">FG Newswire handles submission from draft to publication.</li>
      <li className="text-sm md:text-base">Access live links, metrics, and engagement data.</li>
      <li className="text-sm md:text-base">Showcase the relevance and impact of your news.</li>
      <li className="text-sm md:text-base">Tailor tone, style, and messaging to your brand voice.</li>
      <li className="text-sm md:text-base">Engage readers, clients, and industry professionals effectively.</li>
      <li className="text-sm md:text-base">Extend coverage to other networks connected to BigNewsNetwork.</li>
    </ul>
    <button
      type="button"
      className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
      data-wow-iteration="3"
    >
      Submit PR
    </button>
  </div>

  <aside className="relative w-full md:w-4/12">
    <div
      className={`wow animate__animated animate__fadeInUp`}
      data-wow-delay="0.2s"
    >
      <div className="bg-[#e0e7f5] border rounded-xl border-[#e0e7f5] p-2">
        <div className="h-full bg-white rounded-lg p-6">
          <Image
            src={plan.image}
            alt=""
            width={100}
            height={100}
            className="h-40 w-64"
          />
          <div className="flex items-center justify-start space-x-3 mt-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-b from-blue-700 to-blue-400 text-white flex items-center justify-center">
              <FaStar />
            </div>
            <p className="text-black font-semibold capitalize">{plan.name}</p>
          </div>
          <p className="my-4 text-2xl font-normal text-black">
            {plan.price}{" "}
            <sup className="text-gray-400 text-base italic">USD</sup>
          </p>
          <p className="text-xs flex items-center md:text-sm h-[60px] text-center text-[#909090]">
            {plan.info}
          </p>
          <ul className="my-3 max-h-[200px] overflow-y-auto no-scrollbar space-y-1.5">
            {plan.details.map((d, id) => (
              <li key={id} className="italic text-xs md:text-sm">
                <span className="mr-3 inline-flex bg-blue-700 items-center justify-center text-white rounded-full h-4 w-4 border-none">
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
</section>

       <CallToAction />
     </>
   )
}

export default BingnewsnetworkPr
