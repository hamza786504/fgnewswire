import ServicesBanner from '../../Componenets/Services/ServicesBanner';
import React from 'react'

function BlockchainPressRelease() {
  return (
    <>
      <ServicesBanner
        image={"/imgs/services/blockhain.png"}
        heading={"Blockchain Press Release Service"}
        description={"Amplify your blockchain project’s presence with FG Newswire. We specialize in sharing key updates, technology innovations, partnerships, or product launches with the right audience."}
      />

    <div className="pb-6 space-y-7 px-5 md:px-0 mt-16 md:max-w-3xl lg:max-w-5xl mx-auto">
  <h2 className="text-xl md:text-3xl font-bold text-center text-blue-500">
    Why Choose Our Blockchain Press Release Service?
  </h2>
  <p className="text-sm md:text-base">
    Our service is built for blockchain startups, tech innovators, and enterprises seeking professional media exposure. We focus on delivering press releases that highlight your technological edge, strategic milestones, and industry relevance to investors, partners, and enthusiasts.
  </p>
  <p className="text-sm md:text-base">
    By handling writing, editing, and distribution, FG Newswire ensures your blockchain announcements appear on respected platforms, helping you build trust and attract attention from the right audience.
  </p>

  <h2 className="text-xl md:text-3xl font-bold text-center text-blue-500">
    How Our Blockchain Press Release Works
  </h2>
  <p className="text-sm md:text-base">
    FG Newswire simplifies blockchain PR by combining strategy with execution. We research your project, identify the key points of interest, and create a press release that clearly communicates your news to a professional audience.
  </p>
  <p className="text-sm md:text-base">
    We also include relevant images, infographics, or diagrams to enhance readability, optimize content for search engines, and manage submission to top media outlets. Post-publication, we provide detailed reports so you can measure reach and impact.
  </p>

  <h2 className="text-xl md:text-3xl font-bold text-center text-blue-500">
    Key Features of Our Blockchain Press Release Service
  </h2>
  <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
    <li>
      <strong>Tailored Messaging:</strong> Highlight your project’s unique technology and milestones.
    </li>
    <li>
      <strong>Headline Strategy:</strong> Headlines crafted to engage investors, media, and tech readers.
    </li>
    <li>
      <strong>Visual Enhancement:</strong> Add graphics, charts, or visuals to make your release compelling.
    </li>
    <li>
      <strong>Global Distribution:</strong> Reach blockchain enthusiasts, investors, and tech professionals worldwide.
    </li>
  </ul>
</div>

    </>
  )
}

export default BlockchainPressRelease;