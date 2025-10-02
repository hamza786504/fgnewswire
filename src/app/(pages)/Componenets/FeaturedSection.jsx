"use client";

import { useEffect } from "react";
import Image from "next/image";


export default function FeaturedSection() {


  return (
    <section className="md:max-w-3xl lg:max-w-5xl mx-auto relative py-12 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4 md:px-8">
        {/* Left Text Side */}
        <div
          className="flex-1 wow animate__animated animate__fadeInUp"
          data-wow-duration="1.2s"
          data-wow-delay="0.6s"
        >
          <div className="w-full max-w-md mx-auto rounded-3xl">
            <Image
              src="/imgs/about-home3.png"
              alt="Team Working"
              width={700}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>


        {/* Right Image Side */}
        <div
          className="flex-1 wow animate__animated animate__fadeInLeft"
          data-wow-duration="1.2s"
          data-wow-delay="0.3s"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Lorem ipsum dolor sit.{" "}
            <span className="text-pink-600">Lorem ipsum</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg">

            Lorem ipsum dolor sit amet consectetur <strong>adipisicing</strong>{" "} elit. Autem quo doloremque omnis, nobis corrupti totam reprehenderit maiores et non obcaecati.
          </p>

          {/* Animated Progress Bars */}
          <div className="mt-8 space-y-5">
            {[
              { label: "corrupti totam reprehenderit", value: 90 },
              { label: "maiores et non obcaecati", value: 85 },
              { label: "sit amet consectetur", value: 92 },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-sm text-gray-800 font-medium mb-1">
                  {item.label}
                </div>
                <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                  <div
  className={`h-2 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full animate__animated animate__fadeInRight wow`}
  data-wow-delay={`${0.5 + i * 0.2}s`}
  data-wow-duration="1s"
  style={{ width: `${item.value}%` }}
></div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
