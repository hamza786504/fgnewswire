"use client";
import React, { useEffect, useState } from 'react';
import planData from "./plan";
import { FaCheckCircle, FaStar, FaTimesCircle } from 'react-icons/fa';
import Image from 'next/image';
import { BiCheck } from 'react-icons/bi';
import Link from 'next/link';


function ResellersPlan() {
  const [plans, setPlans] = useState([]);
  const [filter, setFilter] = useState(["10pr", "20pr", "30pr", "40pr", "50pr", "100pr"]);
  const [selectedFilter, setSelectedFilter] = useState("10pr");

  useEffect(() => {
    // setPlans(planData.filter((p) => p.pr + "pr".toUpperCase() === selectedFilter.toUpperCase()));
    setPlans(planData);
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

        {/* <div className="py-10 flex justify-center items-center p-1">
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
        </div> */}

        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {plans.map((plan, idx) => (
                        <div key={idx} className="px-2">
                          <div className="border px-2 max-w-[350px] mx-auto border-gray-300 bg-white hover:bg-black flex flex-col group h-full">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-300 text-center">
                              <h3 className="text-xl group-hover:text-white font-semibold">{plan.title}</h3>
                              <div className="mt-0">
                                <h2 className="text-4xl group-hover:text-white font-semibold">{plan.price}</h2>
                                <h4 className="text-gray-500 group-hover:text-white text-sm">{plan.hint}</h4>
                              </div>
                            </div>
          
                            {/* Body */}
                            <div className="p-4 flex-1 flex flex-col">
                              <p className="text-sm text-gray-600 group-hover:text-white mb-4">{plan.description}</p>
                              <ul className="space-y-2 overflow-y-scroll overflow-hidden max-h-40 pr-2">
                                {plan.features.map((f, i) => (
                                  <li key={i} className="flex items-center text-sm group-hover:text-white text-gray-700">
                                    {f.included ? (
                                      <FaCheckCircle className="text-green-500 mr-2" />
                                    ) : (
                                      <FaTimesCircle className="text-red-500 mr-2" />
                                    )}
                                    <span>{f.text}</span>
                                    {f.icon && (
                                      <Image
                                        src={"/imgs/yahoo.png"}
                                        alt={f.text}
                                        width={50}
                                        height={50}
                                        className="ml-2 inline-block"
                                      />
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
          
                            {/* Footer */}
                            <div className="p-6 border-t border-gray-300">
                              <p className="group-hover:text-white text-sm mb-2">
                                For Demo PR Report:{" "}
                                <a
                                  href={plan.demo}
                                  target="_blank"
                                  className="text-blue-600 underline"
                                >
                                  Click here
                                </a>
                              </p>
                              <select className="w-full group-hover:text-white border group-hover:border-white rounded p-2 mb-4">
                                {plan.options.map((opt, j) => (
                                  <option key={j} className="group-hover:text-white text-black">{opt}</option>
                                ))}
                              </select>
                              <Link
                                href="#"
                                className="block text-center w-full bg-gradient-to-r from-blue-500 to-purple-700 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                              >
                                Buy Now
                              </Link>
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
