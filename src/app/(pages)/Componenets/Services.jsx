import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const services = [
  "Nft press release",
  "Blockchain press release",
  "Business expansion press release",
  "Partnership announcement press release",
  "Product launches press release",
  "New service launches press release",
  "Brand identity press release",
  "Events press release",
  "New executive leadership press release",
  "Crisis management press release",
  "Awards & industry recognition press release",
  "Marketing strategy",
  "Personal branding press release",
  "App launches press release",
  "New business press release",
  "Business press release for a new product",
  "Product update or enhancement press release",
  "New manufacturing facility press release",
  "Company anniversary press release",
  "New research & development initiatives press release",
];

const ServicesSection = () => {
  return (
    <section className="w-full px-4 py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 underline">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
          {services.map((service, index) => {
            const href = `${service.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <Link
                href={`/services/${href}`}
                key={index}
                className="group flex items-start space-x-2 border-b pb-1 hover:text-blue-500"
              >
                <FaChevronRight className="mt-1 text-sm text-black flex-shrink-0 group-hover:text-blue-500" />
                <p className="text-[12px] md:text-sm text-gray-800 group-hover:text-blue-500">
                  {service}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
