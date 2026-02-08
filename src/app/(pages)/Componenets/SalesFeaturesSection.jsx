"use client";

const features = [
  {
    title: "Reach Your Audience",
    icon: <BsFillPersonBadgeFill className="text-white text-xl" />,
    color: "bg-[#6b5bff]",
    points: [
      "Share your news across trusted sites",
      "Connect with real readers",
      "Grow your online visibility",
    ],
  },
  {
    title: "Build Brand Trust",
    icon: <BsPersonLinesFill className="text-white text-xl" />,
    color: "bg-[#2971f5]",
    points: [
      "Get featured on reputable platforms",
      "Show your authority",
      "Earn audience confidence",
    ],
  },
  {
    title: "Boost SEO Performance",
    icon: <BsGraphUp className="text-white text-xl" />,
    color: "bg-[#00b341]",
    points: [
      "Gain high-quality backlinks",
      "Improve search rankings",
      "Drive more organic traffic",
    ],
  },
  {
    title: "Fast & Easy Process",
    icon: <MdOutlineTaskAlt className="text-white text-xl" />,
    color: "bg-[#ff5e3a]",
    points: [
      "Choose your package",
      "Send your details",
      "See your story go live quickly",
    ],
  },
  {
    title: "Affordable Packages",
    icon: <MdOutlineEmail className="text-white text-xl" />,
    color: "bg-[#00e09d]",
    points: [
      "Plans for every business size",
      "No hidden charges",
      "Pay only for real results",
    ],
  },
  {
    title: "Real Results, Every Time",
    icon: <MdSms className="text-white text-xl" />,
    color: "bg-[#ff8f2f]",
    points: [
      "Increase reach and traffic",
      "Strengthen brand image",
      "Make your news stand out",
    ],
  },
];

import { FaCheckCircle } from "react-icons/fa";
import { BsFillPersonBadgeFill, BsPersonLinesFill, BsGraphUp } from "react-icons/bs";
import { MdOutlineTaskAlt, MdOutlineEmail, MdSms } from "react-icons/md";
import Button from "./Elements/Button";
import Link from "next/link";

export default function SalesFeaturesSection() {


  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 wow animate__animated animate__fadeInUp">
          <h2 className="text-3xl sm:text-4xl capitalize font-bold text-gray-900">
            Your News Deserves the <span className="text-[#2563eb]">Spotlight</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything You Need to Get Your News Seen and Heard
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const animation =
              index % 3 === 0
                ? "animate__fadeInLeft"
                : index % 3 === 1
                ? "animate__fadeInUp"
                : "animate__fadeInRight";

            return (
              <div
                key={index}
                className={`group bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md
                  wow animate__animated ${animation}`}
                data-wow-delay={`${index * 0.15}s`}
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-5`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <ul className="space-y-3">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link href="dashboard/signin" className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent hover:opacity-80 transition-colors">
                    Explore feature →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center wow animate__animated animate__fadeInUp" data-wow-delay="0.6s">
          <Button content="Know More" href="/dashboard/signin" />
        </div>

      </div>
    </section>
  );
}
