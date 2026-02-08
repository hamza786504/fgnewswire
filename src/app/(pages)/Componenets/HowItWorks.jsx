import Image from "next/image";
import React from "react";
import Button from "./Elements/Button";

const steps = [
  {
    id: "1",
    icon: "/imgs/press-icon.jpg",
    text: "Choose Your Service",
  },
  {
    id: "2",
    icon: "/imgs/position-icon.png",
    text: "Share Your Details",
  },
  {
    id: "3",
    icon: "/imgs/campaign-icon.png",
    text: "We Create & Publish",
  },
  {
    id: "4",
    icon: "/imgs/upload-press-release-icon.png",
    text: "Get Results",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f8faff] py-16 px-4 md:px-10">
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto text-center">

        <h2 className="mb-14 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 wow animate__animated animate__fadeIn">
          Our Process
        </h2>

        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className="flex flex-col items-center wow animate__animated animate__fadeInUp"
              data-wow-delay={`${index * 0.2}s`}
            >
              <div className="bg-blue-500 text-white w-full h-10 flex items-center justify-center font-bold wow animate__animated animate__fadeInUp"
                   data-wow-delay={`${index * 0.3}s`}>
                {step.id}
              </div>

              <div className="bg-white w-full p-8 wow animate__animated animate__fadeIn"
                   data-wow-delay={`${index * 0.4}s`}>

                <Image
                  src={step.icon}
                  alt="Step icon"
                  height={70}
                  width={70}
                  className="mx-auto mb-6"
                />

                <h3 className="font-medium text-gray-800">
                  {step.text}
                </h3>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 wow animate__animated animate__fadeInUp" data-wow-delay="0.8s">
          <Button content="Sign Up" href="/dashboard/signin" />
        </div>

      </div>
    </section>
  );
}