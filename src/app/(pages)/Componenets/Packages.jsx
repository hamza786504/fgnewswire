"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaCheck, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import planData from "../resellers-plan/plan.js";
import { FaStar } from "react-icons/fa6";
import { BiCheck } from "react-icons/bi";
import Image from "next/image.js";
import Link from "next/link.js";




const PricingSection = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        setPlans(planData);
    }, [])

    const sliderRef = useRef(null);

    const scrollPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const scrollNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
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
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 1024, // Tablet
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 1280, // Desktop
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: true
                }
            },
        ],
    };

    return (
        <section className="bg-gray-100 py-16 px-4">
            <div className="md:max-w-4xl lg:max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">Pricing</h2>

                <div className="relative px-10"> {/* Added padding for arrow visibility */}
                    {/* Corrected arrow buttons with proper onClick handlers */}
                    <button
                        onClick={() => { scrollPrev() }} // Left arrow should go previous
                        className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 bg-white border shadow-md w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-gray-100 transition"
                    >
                        <FaArrowLeft className="text-gray-700" />
                    </button>
                    <button
                        onClick={() => { scrollNext() }} // Right arrow should go next
                        className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-white border shadow-md w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-gray-100 transition"
                    >
                        <FaArrowRight className="text-gray-700" />
                    </button>

                    <Slider ref={sliderRef} {...settings}>
                        {plans.map((plan, idx) => (
                            <div className="px-2">
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
                                            <ul className='my-3 h-[200px] overflow-y-auto no-scrollbar space-y-1.5'>
                                                {plan.details.map((d, id) => (
                                                    <li key={id} className='italic text-xs md:text-sm'>
                                                        <span className='mr-3 inline-flex bg-blue-700 items-center justify-center text-white rounded-full h-4 w-4 border-none'>
                                                            <BiCheck />
                                                        </span>
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Link href="resellers-plan" className="flex justify-center w-full mt-4 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                                More Info
                                            </Link>
                                        </div>
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
