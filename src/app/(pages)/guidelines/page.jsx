import React from 'react'
import CallToAction from '../Componenets/CallToAction'

function Guidelines() {
  return (
    <>
      <div className="px-2 py-12 md:max-w-3xl lg:max-w-4xl mx-auto">
        <h1 className="text-blue-500 text-2xl sm:text-3xl md:text-4xl font-semibold capitalize leading-tight text-center mb-6">
          Editorial Guidelines
        </h1>

        <p className="text-sm md:text-base">
          At FG Newswire, our mission is to help businesses share their news with maximum visibility and impact. From corporate announcements to healthcare updates, tech innovations, and more, we deliver press releases that are professional, credible, and tailored to reach the right audience. To maintain quality and trust, all submissions must follow these editorial guidelines.
        </p>

        <h2 className="text-2xl text-blue-500 sm:text-3xl md:text-4xl font-semibold capitalize leading-tight text-start mt-8 mb-6">
          Headlines & Summaries
        </h2>
        <ul className="ps-2 md:ps-4 list-disc list-inside space-y-2">
          <li className="text-sm md:text-base">Headlines should be short, precise, and engaging, ideally 8–17 words.</li>
          <li className="text-sm md:text-base">For Business Insider + Yahoo Finance, keep headlines under 110 characters.</li>
          <li className="text-sm md:text-base">Use active verbs and clear phrases to attract attention.</li>
          <li className="text-sm md:text-base">Avoid symbols like &, %, @, $, #, TM, or other special characters.</li>
          <li className="text-sm md:text-base">Headlines must accurately reflect the press release content.</li>
          <li className="text-sm md:text-base">Summaries should be concise and informative, maximum 40 words.</li>
          <li className="text-sm md:text-base">Focus on the core message of the press release in a few short, clear phrases.</li>
        </ul>

        <h2 className="text-2xl my-4 font-bold text-blue-500">Content & Format Requirements</h2>
        <ul className="ps-2 md:ps-4 list-disc list-inside space-y-2">
          <li className="text-sm md:text-base">Press releases must be newsworthy corporate announcements; avoid promotional or sales-driven language.</li>
          <li className="text-sm md:text-base">Maintain a professional, objective tone; avoid first-person or second-person language (“I,” “we,” “you”).</li>
          <li className="text-sm md:text-base">Optimal length: 300–1500 words.</li>
          <li className="text-sm md:text-base">Exclude scripts, tables, or special formatting; maintain clean, professional layout.</li>
          <li className="text-sm md:text-base">Avoid diacritical marks (ā, ē, ī, etc.) to prevent display issues.</li>
          <li className="text-sm md:text-base">Include authentic quotes only, clearly attributed to the source.</li>
          <li className="text-sm md:text-base">Use visuals (images, infographics, or videos) strategically; availability depends on your package.</li>
          <li className="text-sm md:text-base">Use hyperlinks carefully: max one link per 200 words, always include full “http” or “https” URL.</li>
          <li className="text-sm md:text-base">Always provide contact information for inquiries.</li>
          <li className="text-sm md:text-base">Complete the Company Details Form (not in the press release body): full contact name, company name, email, city, state, country.</li>
        </ul>

        <h2 className="text-2xl font-bold my-4 text-blue-500">Acceptable Content</h2>
        <ul className="ps-2 md:ps-4 list-disc list-inside space-y-2">
          <li className="text-sm md:text-base">Corporate news, product launches, partnerships, expansions, research, and innovation.</li>
          <li className="text-sm md:text-base">Press releases should inform and educate, not sell or promote.</li>
          <li className="text-sm md:text-base">Avoid spam-triggering terms, copied content, or personal opinions.</li>
          <li className="text-sm md:text-base">Yahoo Finance does not accept cryptocurrency, blockchain, or NFT content; alternative outlets may be provided.</li>
          <li className="text-sm md:text-base">Must not promote: gambling, alcohol, drugs, nicotine, adult content, unregulated supplements, or unsafe products.</li>
          <li className="text-sm md:text-base">Content must respect legal, political, and ethical standards; no defamation, political bias, radical religious/political views, or illegal activities.</li>
        </ul>

        <h2 className="text-2xl font-bold my-4 text-blue-500">Prohibited Content</h2>
        <ul className="ps-2 md:ps-4 list-disc list-inside space-y-2">
          <li className="text-sm md:text-base">Promotional or sales-heavy content (e.g., “SALE,” “FREE,” “LIMITED TIME”).</li>
          <li className="text-sm md:text-base">Sexual or adult content, illegal activities, or hazardous material.</li>
          <li className="text-sm md:text-base">Blog-style, open letters, opinion-only articles.</li>
          <li className="text-sm md:text-base">Copyright-infringing material, including unlicensed NFTs or tokens.</li>
          <li className="text-sm md:text-base">Music industry-focused releases, personality-driven announcements, or celebrity gossip.</li>
          <li className="text-sm md:text-base">Fraudulent submissions or content intended to defame, mislead, or harm.</li>
        </ul>

        <h2 className="text-2xl font-bold my-4 text-blue-500">Review & Publication Process</h2>
        <ul className="ps-2 md:ps-4 list-disc list-inside space-y-2">
          <li className="text-sm md:text-base">All submissions are reviewed by the FG Newswire editorial team.</li>
          <li className="text-sm md:text-base">Approval, rejection, or removal of content is at our discretion.</li>
          <li className="text-sm md:text-base">Each news outlet has its own guidelines; publication cannot be guaranteed on all platforms.</li>
          <li className="text-sm md:text-base">Press releases, once published, are typically final; removal or edits may require an additional fee.</li>
          <li className="text-sm md:text-base">Typical review and publication timeline: up to 72 hours (24 hours editorial review + 24–48 hours for distribution).</li>
        </ul>

        <h2 className="text-2xl font-bold my-4 text-blue-500">Disclaimer & Commitment</h2>
        <p className="text-sm md:text-base">
          FG Newswire is dedicated to delivering credible press releases. By following these guidelines, your press release will meet industry standards, attract media attention, and maximize reach across multiple platforms.
        </p>
      </div>

      <CallToAction />
    </>
  )
}

export default Guidelines
