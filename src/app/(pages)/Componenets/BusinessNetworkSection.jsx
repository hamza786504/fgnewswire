import Image from 'next/image';
import React from 'react';

export default function BusinessNetworkSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#d40c81] px-4 py-16 overflow-hidden">
      {/* Background abstract image */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-auto -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none z-0">
        <Image
          src="/imgs/header_brush.png"
          alt="abstract"
          width={600}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* Main content with WOW animations */}
      <div className="relative z-10 max-w-4xl text-center text-white">
        <h1 className="wow animate__animated animate__fadeInDown text-3xl sm:text-4xl md:text-5xl font-bold mb-4" data-wow-delay="0.2s">
          Lorem, ipsum dolor
        </h1>
        <p className="wow animate__animated animate__fadeInUp text-lg sm:text-xl md:text-2xl font-medium mb-6" data-wow-delay="0.4s">
          Lorem ipsum dolor sit amet
        </p>
        <p className="wow animate__animated animate__fadeInUp text-base sm:text-lg md:text-xl mb-8" data-wow-delay="0.6s">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br className="hidden md:inline" /> Et exercitationem totam ipsa impedit quis ullam eaque fuga quasi eos? Odio.
        </p>
        <button className="wow animate__animated animate__zoomIn bg-white text-black font-semibold px-6 py-3 rounded-full capitalize shadow-md hover:bg-gray-200 transition" data-wow-delay="0.8s">
           impedit quis
        </button>
      </div>
    </section>
  );
}
