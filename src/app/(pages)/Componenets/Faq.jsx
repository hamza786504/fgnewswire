"use client";

import React, { useState } from "react";



const Faq = ({faqData}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFaq = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div
            className="relative w-full bg-white px-0 pt-10 pb-8 mt-8 ring-1 ring-gray-900/5 sm:rounded-lg sm:px-10">
            <div className="mx-auto px-3 sm:px-5">
                <div className="flex flex-col items-center">
                    <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
                    <p className="mt-3 text-lg text-neutral-500 md:text-xl">Frequenty asked questions
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mx-auto mt-8 divide-y divide-neutral-200">
                    {faqData.map((faq,idx) => {
                        return (
                            <div key={idx} className="py-5 wow animate__animated animate__fadeInUp" data-wow-delay={`${idx * 0.3}s`}>
                                <details className="group">
                                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                        <span> {faq.question}</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="group-open:animate-fadeIn mt-3 text-neutral-600">{faq.answer}
                                    </p>
                                </details>
                            </div>
                        )
                    })}


                </div>
            </div>
        </div>
    );
};

export default Faq;
