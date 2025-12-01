// components/ClientSlider.jsx
"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PlanCard from "./PlanCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClientSlider({ packages }) {
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
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, slidesToScroll: 1, arrows: true },
      },
    ],
  };

  return (
    <>
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
        {packages?.map((plan, idx) => (
          <PlanCard key={plan.id || idx} plan={plan} idx={idx} />
        ))}
      </Slider>
    </>
  );
}