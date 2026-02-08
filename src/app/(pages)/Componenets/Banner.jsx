import React from 'react';
import { FaLongArrowAltRight, FaCheckCircle } from "react-icons/fa";


function Banner() {
  return (
    <section
      className="relative w-full h-full flex items-center min-h-screen bg-bottom bg-no-repeat transition-all duration-300 ease-in-out"
      style={{ backgroundImage: "url('/imgs/banner-bg-2b.png')" }}
    >


      <div className="py-8 px-3 md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between banner-container">

        {/* LEFT SECTION */}
        <div className="relative w-full md:w-1/2 text-center md:text-start">
          {/* rocket icon */}
          <div className="absolute bottom-[0px] md:-left-[40px] md:transform -translate-x-1/4 md:-translate-x-1/2 -top-5 md:top-24 w-16">
            <img src="/imgs/rocket-n.png" className='w-full' alt="" 
             style={{
              animation: "pulseScale 2s ease-in-out infinite",
            }}/>
          </div>
          <div
            className="wow animate__animated animate__fadeInLeft"
            data-wow-delay="0s"
          >
            <div className="mb-4 flex ms-10 sm:ms-0 items-center justify-center md:justify-start">
              {/* <div className="px-3 py-[4px] text-white font-medium rounded-full bg-gradient-to-r from-[#a238bb] to-[#e64671] bg-cover mr-[15px] text-[13px]"># 1</div> */}
              <div className="text-sm">Reach More People with FG Newswire</div>
            </div>
          </div>

          <h1
            className="wow animate__animated animate__fadeInLeft inline-block text-xl sm:text-3xl md:text-5xl text-center md:text-start font-bold leading-tight my-1"
            data-wow-delay="0.2s"
          >
            Grow your visibility and connect with a <span className="text-blue-500">wider audience</span>
          </h1>

          <p
            className="wow animate__animated animate__fadeInLeft text-base md:text-lg text-[#242423] my-2"
            data-wow-delay="0.4s"
          >
            FG Newswire helps businesses and brands share their stories on trusted websites and news platforms. We make it easy to publish your updates, announcements, and press releases, helping you build credibility and attract attention online.
          </p>

          <div
            className="wow animate__animated animate__fadeInLeft flex flex-col space-y-3 md:space-y-0 md:flex-row justify-center md:justify-start items-center md:space-x-2 mt-5"
            data-wow-delay="0.6s"
          >
            <a
              href="/"
              className="flex items-center md:px-4 hover:bg-transparent bg-[#163316] uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-2 rounded-full text-xs sm:text-sm lg:text-base font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform gap-2"
            >
              Get Started
              <FaLongArrowAltRight className="ms-0" />
            </a>

            <a
              href="/contact"
              className="px-3 md:px-4 py-[6px] rounded-3xl text-xs sm:text-sm lg:text-base font-normal border-2 text-center text-[#242423] bg-transparent border-[#242423] hover:bg-black hover:border-black hover:text-white transition-all ease-in-out uppercase inline-flex items-center gap-2"
            >
              Request Demo
              <FaLongArrowAltRight className="ms-0" />
            </a>
          </div>

          <div
            className="wow animate__animated animate__fadeInLeft border-t border-[#bdb8be] my-6 pt-6 w-full"
            data-wow-delay="0.8s"
          >
            <div className="text-xs sm:text-base flex items-center justify-center md:justify-start">
              <FaCheckCircle size={20} className="mr-3 text-pink-600" />
              Our strong network reaches <span className='text-xl mx-1 font-bold'>500K+</span> readers worldwide.
            </div>
          </div>
        </div>

        {/* RIGHT SECTION IMAGE */}
        <div
          className="relative w-full md:w-1/2 text-center wow animate__animated animate__flipInY"
          data-wow-delay="1s"
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            transition: "transform 1s ease-in-out",
          }}
        >
          <div
            className="absolute -bottom-[68px] sm:left-[120px] md:left-auto md:right-[230px] lg:right-[330px] z-[11] w-[120px] sm:w-[140px]"
            style={{
              animation: "pulseScale 2s ease-in-out infinite",
            }}
          >
            <img src="/imgs/graph.png" alt="" />
          </div>
          <div className="absolute  z-[11] w-[200px] top-[120px] sm:top-[30px] left-auto right-[1%] sm:right-[70px] md:left-auto md:right-[0px] md:translate-x-[50px] lg:translate-0 lg:right-[30px]"
            style={{
              animation: "pulseScale 2s ease-in-out infinite",
            }}>
            <img src="/imgs/element-2.png" alt="" />
          </div>
          <div className="absolute -bottom-[20px] right-[3%] left-auto sm:right-[70px] md:left-auto md:right-[0px] md:translate-x-[50px] lg:translate-0 lg:right-[30px] z-[21] w-[130px] sm:w-[170px]" style={{
            animation: "pulseScale 2s ease-in-out infinite",
          }}>
            <img src="/imgs/technoo.png" alt="" />
          </div>


          <img
            src="/imgs/man.png"
            alt=""
            className="w-11/12 max-w-sm mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default Banner;
