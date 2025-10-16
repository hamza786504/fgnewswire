import Image from "next/image";
import React from "react";
import Button from "./Elements/Button";

const steps = [
  {
    id: "1",
    icon: "/imgs/press-icon.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, laboriosam.",
  },
  {
    id: "2",
    icon: "/imgs/position-icon.png",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, laboriosam.",
  },
  {
    id: "3",
    icon: "/imgs/campaign-icon.png",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, laboriosam.",
  },
  {
    id: "4",
    icon: "/imgs/upload-press-release-icon.png",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, laboriosam.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f8faff] py-16 px-4 md:px-10">
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto text-center">
        <h2 className="mb-14 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 wow animate__animated animate__fadeIn">
          How it Works
        </h2>

        <div className="relative">
          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-2 relative z-10">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className="flex flex-col items-center wow animate__animated animate__fadeInUp"
                data-wow-delay={`${index * 0.2}s`}
              >
                {/* Number badge with animation */}
                <div
                  className={`
                    w-full h-10 flex items-center justify-center
                    ${index === 0 ? 'bg-blue-400' :
                      index === 1 ? 'bg-purple-500' :
                        index === 2 ? 'bg-pink-500' :
                          'bg-indigo-500'} 
                    text-white font-bold text-lg shadow-md
                    wow animate__animated animate__bounceIn`}
                  data-wow-delay={`${index * 0.3}s`}
                >
                  {step.id}
                </div>

                {/* Content box with staggered animation */}
                <div
                  className="bg-white w-full p-8 text-center wow animate__animated animate__fadeIn"
                  data-wow-delay={`${index * 0.4}s`}
                >
                  <div className="wow animate__animated animate__zoomIn" data-wow-delay={`${index * 0.5}s`}>
                    <Image
                      src={step.icon}
                      alt="Step icon"
                      height={70}
                      width={70}
                      className="h-[70px] mx-auto mb-10 object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1 wow animate__animated animate__fadeIn" data-wow-delay={`${index * 0.6}s`}>
                    {step.text.substr(0, 17)}
                  </h3>
                  <p className="text-sm text-gray-600 wow animate__animated animate__fadeIn" data-wow-delay={`${index * 0.7}s`}>
                    Step {step.id} details
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={`mt-12 wow !text-center animate__animated animate__fadeInUp`} data-wow-delay="0.8s">
          <Button content="Get Started today" href="/" />
        </div>
      </div>
    </section>
  );
}