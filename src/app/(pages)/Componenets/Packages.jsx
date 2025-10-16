"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const plans = [
  {
    title: "Basic",
    price: "$20.00",
    hint: "1 press release",
    description: "Guaranteed News Distribution with Media Coverage",
    features: [
      { text: "Google Inclusion", icon: "/packages/google.png", included: true },
      { text: "150 Guaranteed Placements", included: true },
      { text: "Google News Inclusion", icon: "/packages/googlenews.png", included: false },
      { text: "Yahoo Inclusion", icon: "/packages/yahoo.png", included: true },
      { text: "Bing Inclusion", icon: "/packages/bing.png", included: true },
      { text: "Financial Feeds", included: true },
      { text: "Online Newspaper", included: true },
      { text: "Market Watch", icon: "/packages/marketwatch.png", included: false },
      { text: "Digital Journal", icon: "/packages/digitaljournal.png", included: false },
      { text: "Fox Media Outlets", icon: "/packages/fox.png", included: false },
      { text: "NBC Media Outlets", icon: "/packages/nbc.jpg", included: false },
      { text: "CBS Media Outlets", icon: "/packages/cbs.jpg", included: false },
      { text: "Anchor Text Links within PR-10", included: true },
      { text: "800 word count limit", included: true },
      { text: "Images-5", included: true },
    ],
    demo: "https://dashboard.kingnewswire.com/report/new-free-online-heic-to-jpg-converter-simplifies-iphone-photo-sharing",
    options: [
      "1 press release for $20.00",
      "5 press releases for $90.00",
      "10 press releases for $130.00",
      "20 press releases for $180.00",
      "100 press releases for $750.00",
    ],
  },
  {
    title: "Standard",
    price: "$30.00",
    hint: "1 press release",
    description: "Guaranteed News Distribution with Media Coverage",
    features: [
      { text: "350 Guaranteed Placements", included: true },
      { text: "Google News Inclusion", icon: "/packages/googlenews.png", included: true },
      { text: "Google Inclusion", icon: "/packages/google.png", included: true },
      { text: "Yahoo Inclusion", icon: "/packages/yahoo.png", included: true },
      { text: "Bing Inclusion", icon: "/packages/bing.png", included: true },
      { text: "Financial Feeds", included: true },
      { text: "Online Newspaper", included: true },
    ],
    demo: "#",
    options: ["1 press release for $30.00"],
  },
  {
    title: "Premium",
    price: "$70.00",
    hint: "1 press release",
    description: "Guaranteed News Distribution with Media Coverage",
    features: [
      { text: "450 Guaranteed Placements", included: true },
      { text: "Digital Journal", icon: "/packages/digitaljournal.png", included: true },
      { text: "Street Insider", icon: "/packages/streetinsider.png", included: true },
      { text: "Fox Media Outlets", icon: "/packages/fox.png", included: true },
      { text: "TV Station Media Sites", included: true },
      { text: "Google Inclusion", icon: "/packages/google.png", included: true },
    ],
    demo: "#",
    options: ["1 press release for $70.00"],
  },
];

const PricingSection = () => {
  const sliderRef = useRef(null);

  const scrollPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const scrollNext = () => {
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // Mobile
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true },
      },
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true },
      },
      {
        breakpoint: 1280, // Desktop
        settings: { slidesToShow: 3, slidesToScroll: 1, arrows: true },
      },
    ],
  };

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-10">
          Choose a plan when you’re ready
        </h1>

        <div className="relative px-6">
          {/* Mobile arrows */}
          <button
            onClick={scrollPrev}
            className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 bg-white border shadow w-10 h-10 rounded-full flex items-center justify-center z-10"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <button
            onClick={scrollNext}
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-white border shadow w-10 h-10 rounded-full flex items-center justify-center z-10"
          >
            <FaArrowRight className="text-gray-700" />
          </button>

          <Slider ref={sliderRef} {...settings}>
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
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
