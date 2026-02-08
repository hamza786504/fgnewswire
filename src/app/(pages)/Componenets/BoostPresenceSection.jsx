// components/BoostPresenceSection.jsx

import Link from "next/link";

export default function BoostPresenceSection() {
  return (
    <section className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-16 px-6">
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-center md:text-start text-2xl md:text-3xl font-bold mb-6 wow animate__animated animate__fadeInLeft"
            data-wow-delay="0s">
            Try FG Newswire - Safe, and Commitment-Free
          </h2>
          <p className="text-center md:text-start text-base md:text-lg leading-relaxed wow animate__animated animate__fadeInLeft"
            data-wow-delay="0.3s">
            Experience the freedom to explore our services without any upfront payment. At FG Newswire, you can start instantly, see real results, and decide when you&apos;re ready.
          </p>
        </div>

        {/* Right Button + Benefits */}
        <div className="flex flex-col items-start md:items-center">
          <Link href={"/dashboard/signin"} className="hover:bg-transparent  bg-[#163316] justify-center uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform wow animate__animated animate__fadeInRight"
            data-wow-delay="0s">
            Get Started
          </Link>
          <div className="justify-center w-full mt-4 text-sm flex flex-col md:flex-row md:items-center text-white space-y-1 md:space-y-0 md:space-x-6  wow animate__animated animate__fadeInRight"
            data-wow-delay="0.3s">
            <div className="justify-center md:justify-start flex items-center space-x-2">
              <span className="text-white">✔</span>
              <span>No credit card required</span>
            </div>
            <div className="justify-center md:justify-start flex items-center space-x-2">
              <span className="text-white">✔</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
