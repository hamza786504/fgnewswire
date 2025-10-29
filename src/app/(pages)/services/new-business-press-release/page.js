import React from 'react'
import ServicesBanner from '../../Componenets/Services/ServicesBanner';

function NewBusinessPressRelease() {
  return (
    <>
      <ServicesBanner
        image={"/imgs/services/new business.png"}
        heading={"New Business Press Release Service"}
        description={"Announce your new venture with FG Newswire’s New Business Press Release Service. We help startups and companies share their launch news, mission, and offerings."}
      />

      <div className="pb-6 space-y-7 px-5 md:px-0 mt-16 md:max-w-3xl lg:max-w-5xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold text-center text-blue-500">
          Why Choose Our New Business Press Release Service?
        </h2>
        <p className="text-sm md:text-base">
          Our service is designed for startups and new businesses that want to make a strong market entry.
          We craft press releases that clearly communicate your business goals and unique value proposition.
        </p>
        <p className="text-sm md:text-base">
          FG Newswire handles content creation, optimization, and distribution to top media platforms,
          ensuring your new business announcement reaches the right audience and generates maximum exposure.
        </p>

        <h3 className="mt-3 text-xl md:text-2xl font-bold text-start text-blue-500">
          How Our New Business Press Release Works
        </h3>
        <p className="text-sm md:text-base">
          We begin by understanding your business, mission, and target audience. Then, we create a press release
          that highlights your company’s vision, services, and the benefits it brings to customers or the industry.
        </p>
        <p className="text-sm md:text-base">
          Our team also incorporates visuals such as logos, office images, or product/service photos, optimizes
          the content for SEO, and submits it to relevant media outlets. After publication, you receive detailed
          reports to track engagement, reach, and media coverage.
        </p>

        <h3 className="mt-3 text-xl md:text-2xl font-bold text-start text-blue-500">
          Key Features of Our New Business Press Release Service
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>
            <strong>Tailored Messaging:</strong> Clearly communicate your business mission and offerings.
          </li>
          <li>
            <strong>Engaging Headlines:</strong> Craft headlines that capture attention and interest.
          </li>
          <li>
            <strong>Visual Enhancements:</strong> Include logos, office photos, or product/service visuals.
          </li>
          <li>
            <strong>Targeted Distribution:</strong> Reach media, investors, and potential clients effectively.
          </li>
        </ul>
      </div>

    </>
  )
}

export default NewBusinessPressRelease;
