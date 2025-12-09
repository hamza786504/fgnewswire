'use client';
import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const caseStudies = [
  {
    title: 'Automotive Services',
    challenge: 'Increase contact forms and store locator conversions on the website.',
    approach: [
      'SEO product page optimization',
      'Targeted PPC search campaigns',
      'SEO thought leadership content',
      'Website navigation UX improvements',
    ],
    result: '53%',
    resultText: 'INCREASE IN OVERALL CONVERSIONS',
    link: '#',
  },
  {
    title: 'Ecommerce – Tools and Hardware',
    challenge: 'Increase qualified leads and revenue through the website.',
    approach: [
      'PPC investment reallocation strategy',
      'SEO with local focus for parts stores',
      'Data-driven decision making through RevenueCloudFX',
    ],
    result: '150%',
    resultText: 'INCREASE IN DIGITAL ROI',
    link: '#',
  },
  {
    title: 'Ecommerce – Tools and Hardware',
    challenge: 'Increase qualified leads and revenue through the website.',
    approach: [
      'PPC investment reallocation strategy',
      'SEO with local focus for parts stores',
      'Data-driven decision making through RevenueCloudFX',
    ],
    result: '150%',
    resultText: 'INCREASE IN DIGITAL ROI',
    link: '#',
  },
  {
    title: 'Ecommerce – Tools and Hardware',
    challenge: 'Increase qualified leads and revenue through the website.',
    approach: [
      'PPC investment reallocation strategy',
      'SEO with local focus for parts stores',
      'Data-driven decision making through RevenueCloudFX',
    ],
    result: '150%',
    resultText: 'INCREASE IN DIGITAL ROI',
    link: '#',
  },
  {
    title: 'Ecommerce – Tools and Hardware',
    challenge: 'Increase qualified leads and revenue through the website.',
    approach: [
      'PPC investment reallocation strategy',
      'SEO with local focus for parts stores',
      'Data-driven decision making through RevenueCloudFX',
    ],
    result: '150%',
    resultText: 'INCREASE IN DIGITAL ROI',
    link: '#',
  },
  {
    title: 'Ecommerce – Tools and Hardware',
    challenge: 'Increase qualified leads and revenue through the website.',
    approach: [
      'PPC investment reallocation strategy',
      'SEO with local focus for parts stores',
      'Data-driven decision making through RevenueCloudFX',
    ],
    result: '150%',
    resultText: 'INCREASE IN DIGITAL ROI',
    link: '#',
  },
  {
    title: 'Ecommerce – Tools and Hardware',
    challenge: 'Increase qualified leads and revenue through the website.',
    approach: [
      'PPC investment reallocation strategy',
      'SEO with local focus for parts stores',
      'Data-driven decision making through RevenueCloudFX',
    ],
    result: '150%',
    resultText: 'INCREASE IN DIGITAL ROI',
    link: '#',
  },
];

export default function CaseStudiesSection() {
  const carouselRef = useRef();

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Choose From <span className="text-blue-600">Flexible Plans</span> Made For Every Need
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Whether you&apos;re a startup or a growing brand, we&apos;ve got you covered.
        </p>
      </div>

      <div className="relative mt-10">
        {/* Carousel */}
        <div className="md:max-w-3xl lg:max-w-5xl mx-auto flex overflow-x-auto scroll-smooth no-scrollbar" ref={carouselRef}>
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className="min-w-full md:min-w-[50%] px-2"
            >
              <div className="max-w-[400px] mx-auto bg-white border rounded-xl shadow-md p-6 h-full flex flex-col justify-between">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-700 text-white text-sm font-medium px-3 py-1 rounded mb-4 w-fit">
                  {item.title}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">CHALLENGE</h3>
                  <p className="text-gray-700 text-sm md:text-base mb-4">{item.challenge}</p>
                  <h3 className="font-bold text-gray-900 mb-1">APPROACH</h3>
                  <ul className="list-none space-y-1 text-sm md:text-base text-gray-700">
                    {item.approach.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <p className="text-green-600 font-extrabold text-xl md:text-2xl">{item.result}</p>
                  <p className="text-gray-700 font-bold text-sm md:text-base mb-2">
                    {item.resultText}
                  </p>
                  <a
                    href={item.link}
                    className="bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent text-sm font-semibold hover:underline inline-flex items-center"
                  >
                    View Case Study →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border shadow-md w-10 h-10 rounded-full flex items-center justify-center z-10"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border shadow-md w-10 h-10 rounded-full flex items-center justify-center z-10"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
