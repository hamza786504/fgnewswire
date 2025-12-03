// app/plans/[slug]/page.js
import React from "react";
import PlanCard from "../../Componenets/PlanCard";

// Static HTML content based on slug
const staticContent = {
    "ap-news-press-release": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    AP News Press Release – Distribution Service
                </h1>
                <p className="text-sm md:text-base">
                    With <strong>FG Newswire</strong>, submitting a press release to <strong>AP News (Associated Press)</strong> is simple, fast, and professional. We handle everything from writing and optimizing your press release to submission and reporting, so your news reaches the right audience effectively and credibly.
                </p>

                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">We create or refine your press release to meet AP News standards.</li>
                    <li className="text-sm md:text-base">Craft clear, concise, and attention-grabbing headlines for maximum impact.</li>
                    <li className="text-sm md:text-base">Ensure your press release is distributed to the right sections and audience.</li>
                    <li className="text-sm md:text-base">Include relevant images, charts, or infographics to enhance your story.</li>
                    <li className="text-sm md:text-base">Double-check all dates, figures, and company information for accuracy.</li>
                    <li className="text-sm md:text-base">We ensure your press release meets AP News editorial and legal guidelines.</li>
                    <li className="text-sm md:text-base">Optimize content to increase discoverability and online reach.</li>
                    <li className="text-sm md:text-base">FG Newswire handles the submission and follow-up process for you.</li>
                    <li className="text-sm md:text-base">Reach journalists, investors, and a wide professional audience effectively.</li>
                    <li className="text-sm md:text-base">Receive live links, metrics, and detailed reports on your press release results.</li>
                </ul>

                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "benzinga-pr": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    Benzinga Press Release – Guidelines
                </h1>
                <p className='text-sm md:text-base'>
                    Our <strong>Benzinga plan</strong> is designed to help businesses and startups get their news published on a leading financial news platform, reaching investors, traders, and business professionals. With FG Newswire, submitting your press release is simple, effective, and impactful.
                </p>
                <p className='text-sm md:text-base font-bold my-3'>
                    Follow these key steps to ensure your press release meets Benzinga’s publication standards:
                </p>
                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className='text-sm md:text-base'>We help write or optimize your press release according to Benzinga’s standards.</li>
                    <li className='text-sm md:text-base'>Craft clear, concise, and engaging headlines to attract readers.</li>
                    <li className='text-sm md:text-base'>Ensure your press release reaches the right section and audience on Benzinga.</li>
                    <li className='text-sm md:text-base'>Attach images, charts, and infographics to enhance your news.</li>
                    <li className='text-sm md:text-base'>Double-check all financial figures, dates, and company information.</li>
                    <li className='text-sm md:text-base'>Ensure your content meets Benzinga’s rules and policies.</li>
                    <li className='text-sm md:text-base'>Optimize your press release for search engines to increase visibility.</li>
                    <li className='text-sm md:text-base'>FG Newswire handles the submission and follow-up process.</li>
                    <li className='text-sm md:text-base'>Reach investors, traders, and financial professionals effectively.</li>
                    <li className='text-sm md:text-base'>Receive live links, metrics, and detailed reports on your press release results.</li>
                </ul>
                <button
                    type="button"
                    className='my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse'
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "bingnewsnetwork-pr": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    BigNewsNetwork Press Release – Guidelines
                </h1>
                <p className="text-sm md:text-base">
                    <strong>Expand your company’s reach</strong> with FG Newswire’s <strong>BigNewsNetwork Press Release Service</strong>. We help businesses share news, updates, or announcements across one of the largest online news networks, reaching audiences worldwide.
                </p>
                <p className="text-sm md:text-base font-bold my-3">
                    Here’s how FG Newswire ensures your BigNewsNetwork press release performs effectively:
                </p>
                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">Ensure press releases are polished, accurate, and error-free.</li>
                    <li className="text-sm md:text-base">Confirm all company and announcement details.</li>
                    <li className="text-sm md:text-base">Align content with editorial and legal standards.</li>
                    <li className="text-sm md:text-base">Boost press release visibility on search engines and news platforms.</li>
                    <li className="text-sm md:text-base">FG Newswire handles submission from draft to publication.</li>
                    <li className="text-sm md:text-base">Access live links, metrics, and engagement data.</li>
                    <li className="text-sm md:text-base">Showcase the relevance and impact of your news.</li>
                    <li className="text-sm md:text-base">Tailor tone, style, and messaging to your brand voice.</li>
                    <li className="text-sm md:text-base">Engage readers, clients, and industry professionals effectively.</li>
                    <li className="text-sm md:text-base">Extend coverage to other networks connected to BigNewsNetwork.</li>
                </ul>
                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>

        </>
    ),
    "yahoo-press-release": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    Yahoo Press Release – Guidelines
                </h1>
                <p className="text-sm md:text-base">
                    Publishing a press release on Yahoo requires following their editorial and submission standards carefully. Adhering to these guidelines ensures your content is accepted, reaches the right audience, and maintains credibility. Well-prepared press releases improve visibility, attract media attention, and help your brand gain trust online.
                </p>
                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">
                        Your press release must be unique and not duplicated elsewhere.
                    </li>
                    <li className="text-sm md:text-base">
                        Headlines should be short, descriptive, and attention-grabbing. Avoid clickbait or vague phrasing.
                    </li>
                    <li className="text-sm md:text-base">
                        Ensure all dates, figures, names, and other facts are correct.
                    </li>
                    <li className="text-sm md:text-base">
                        Content should be informative and newsworthy. Excessive advertising or links may result in rejection.
                    </li>
                    <li className="text-sm md:text-base">
                        Use standard formatting with headings, paragraphs, and line breaks to make the release readable.
                    </li>
                    <li className="text-sm md:text-base">
                        Provide a valid name, email, and phone number for media or reader inquiries.
                    </li>
                    <li className="text-sm md:text-base">
                        Attach high-quality images, infographics, or videos if applicable.
                    </li>
                    <li className="text-sm md:text-base">
                        Write content that is relevant to Yahoo readers and aligns with their interests.
                    </li>
                    <li className="text-sm md:text-base">
                        Proofread carefully to ensure clarity and professionalism. Poor grammar can lead to rejection.
                    </li>
                    <li className="text-sm md:text-base">
                        Follow Yahoo’s editorial policies, terms of service, and legal guidelines strictly to avoid issues.
                    </li>
                </ul>
                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "business-insider": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    Business Insider Press Release Service
                </h1>
                <p className="text-sm md:text-base">
                    With FG Newswire, submitting a press release to Business Insider is simple and effective. Our service helps businesses and professionals get their news published on a high-visibility platform, reaching industry leaders, investors, and a global business audience.
                </p>
                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">
                        Share news about your company, product launches, or industry updates.
                    </li>
                    <li className="text-sm md:text-base">
                        Create concise, clear, and compelling headlines that summarize your story.
                    </li>
                    <li className="text-sm md:text-base">
                        Ensure all dates, figures, and company details are correct.
                    </li>
                    <li className="text-sm md:text-base">
                        Focus on newsworthy and informative content, not just promotions.
                    </li>
                    <li className="text-sm md:text-base">
                        Use paragraphs, headings, and bullet points for readability.
                    </li>
                    <li className="text-sm md:text-base">
                        Include valid email and phone contacts for media inquiries.
                    </li>
                    <li className="text-sm md:text-base">
                        Add relevant images, charts, or infographics to strengthen your story.
                    </li>
                    <li className="text-sm md:text-base">
                        Ensure content appeals to Business Insider readers, investors, and professionals.
                    </li>
                    <li className="text-sm md:text-base">
                        Check grammar, spelling, and formatting before submission.
                    </li>
                    <li className="text-sm md:text-base">
                        Our team handles submission, placement, and reporting to ensure visibility and impact.
                    </li>
                </ul>
                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "digital-journal-pr": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    Digital Journal Press Release – Guidelines
                </h1>
                <p className='text-sm md:text-base'>
                    <strong>FG Newswire</strong> is proud to introduce its comprehensive <strong>Digital Journal Press Release Plan</strong>, designed to help businesses amplify their brand presence and reach a wider audience through our services. FG Newswire empowers businesses to make a lasting impact in the digital media landscape.
                </p>
                <p className='text-sm md:text-base font-bold my-3'>
                    Key highlights of our Digital Journal Press Release Plan include:
                </p>
                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className='text-sm md:text-base'>Expertly crafted press releases that highlight your brand’s key announcements.</li>
                    <li className='text-sm md:text-base'>High-quality guest posting opportunities on reputable digital platforms.</li>
                    <li className='text-sm md:text-base'>Increased online visibility and brand awareness through targeted outreach.</li>
                    <li className='text-sm md:text-base'>SEO-optimized content to enhance search engine performance.</li>
                    <li className='text-sm md:text-base'>Tailored content strategies to match your industry and audience.</li>
                    <li className='text-sm md:text-base'>Timely distribution of press releases to reach journalists and media outlets.</li>
                    <li className='text-sm md:text-base'>Multimedia integration, including images, videos, and links, to enrich content.</li>
                    <li className='text-sm md:text-base'>Performance tracking to measure engagement and reach of each release.</li>
                    <li className='text-sm md:text-base'>Strengthening brand authority by featuring content on trusted platforms.</li>
                    <li className='text-sm md:text-base'>Flexible packages to suit businesses of all sizes and promotional needs.</li>
                </ul>
                <button
                    type="button"
                    className='my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse'
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "gulfnews-press-release": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    Gulf News Press Release – Distribution Service
                </h1>
                <p className="text-sm md:text-base">
                    Expand your company&apos;s presence in the Middle East with <strong>FG Newswire’s Gulf News Press Release Service.</strong> We help businesses announce news, achievements, or updates to one of the region’s leading newspapers, reaching investors, industry professionals, and local audiences.
                </p>

                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">Communicate news tailored to Gulf audiences effectively.</li>
                    <li className="text-sm md:text-base">Headlines designed to attract media and readers.</li>
                    <li className="text-sm md:text-base">Include images, infographics, or charts for better engagement.</li>
                    <li className="text-sm md:text-base">Reach Gulf News readers, investors, and industry professionals.</li>
                    <li className="text-sm md:text-base">Ensure press releases are clear, polished, and accurate.</li>
                    <li className="text-sm md:text-base">Confirm announcement details, company facts, and data.</li>
                    <li className="text-sm md:text-base">Align content with editorial, legal, and regional standards.</li>
                    <li className="text-sm md:text-base">Improve online visibility through search engines.</li>
                    <li className="text-sm md:text-base">FG Newswire handles the complete submission process.</li>
                    <li className="text-sm md:text-base">Access live links, metrics, and detailed engagement insights.</li>
                </ul>

                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "insider-press-release": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    Business Insider & Yahoo Finance Press Release Service
                </h1>
                <p className="text-sm md:text-base">
                    Amplify your company&apos;s news with FG Newswire&apos;s Business Insider & Yahoo Finance Press Release Service. We help businesses share announcements, achievements, or updates directly to top-tier financial and business media, and key stakeholders.
                </p>
                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">
                        Communicate company updates, milestones, and achievements clearly.
                    </li>
                    <li className="text-sm md:text-base">
                        Headlines designed to grab media and investor attention.
                    </li>
                    <li className="text-sm md:text-base">
                        Include charts, infographics, or company logos for stronger impact.
                    </li>
                    <li className="text-sm md:text-base">
                        Business Insider, Yahoo Finance, and top financial outlets.
                    </li>
                    <li className="text-sm md:text-base">
                        Ensure press releases are discoverable by search engines and investors.
                    </li>
                    <li className="text-sm md:text-base">
                        Polished, error-free, and fact-checked content.
                    </li>
                    <li className="text-sm md:text-base">
                        Confirm company details, announcements, and data accuracy.
                    </li>
                    <li className="text-sm md:text-base">
                        Align with editorial, legal, and financial disclosure standards.
                    </li>
                    <li className="text-sm md:text-base">
                        FG Newswire manages submission from draft to publication.
                    </li>
                    <li className="text-sm md:text-base">
                        Access live links, engagement metrics, and detailed coverage reports.
                    </li>
                </ul>
                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "khaleejtimes-press-release": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    Khaleej Times Press Release – Distribution Service
                </h1>
                <p className="text-sm md:text-base">
                    Reach audiences in the Middle East with <strong>FG Newswire’s Khaleej Times Press Release Service.</strong> We help businesses announce news, achievements, or updates to one of the region’s leading newspapers, enhancing visibility among investors, industry professionals, and local audiences.
                </p>

                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">Communicate news tailored to the Middle Eastern audience.</li>
                    <li className="text-sm md:text-base">Headlines crafted to attract media and readers.</li>
                    <li className="text-sm md:text-base">Include images, infographics, or charts for impact.</li>
                    <li className="text-sm md:text-base">Reach Khaleej Times readers, investors, and industry professionals.</li>
                    <li className="text-sm md:text-base">Ensure press releases are polished, accurate, and error-free.</li>
                    <li className="text-sm md:text-base">Confirm announcement and company details for accuracy.</li>
                    <li className="text-sm md:text-base">Align content with editorial, legal, and regional standards.</li>
                    <li className="text-sm md:text-base">Boost visibility on search engines and news platforms.</li>
                    <li className="text-sm md:text-base">FG Newswire handles submission from draft to publication.</li>
                    <li className="text-sm md:text-base">Access live links, metrics, and engagement insights.</li>
                </ul>

                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "msn-news-press-release": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    MSN News Press Release
                </h1>
                <p className="text-sm md:text-base">
                    <strong>With FG Newswire</strong>, publishing your press release on MSN News is easy, professional, and effective. We handle every step from content creation and optimization to submission and reporting, so your business news reaches the right audience and gains maximum visibility.
                </p>
                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">
                        We write or optimize your press release specifically for MSN News standards.
                    </li>
                    <li className="text-sm md:text-base">
                        Create clear, concise, and attention-grabbing headlines that summarize your news.
                    </li>
                    <li className="text-sm md:text-base">
                        Ensure your press release is polished, clear, and error-free.
                    </li>
                    <li className="text-sm md:text-base">
                        Publish your news in the right sections to reach the most relevant audience.
                    </li>
                    <li className="text-sm md:text-base">
                        Add images, infographics, or charts to make your story visually appealing.
                    </li>
                    <li className="text-sm md:text-base">
                        Verify all dates, figures, and company information for accuracy.
                    </li>
                    <li className="text-sm md:text-base">
                        Ensure the release follows MSN News editorial and legal guidelines.
                    </li>
                    <li className="text-sm md:text-base">
                        Optimize your press release for search engines to boost visibility.
                    </li>
                    <li className="text-sm md:text-base">
                        FG Newswire handles the entire submission process for you.
                    </li>
                    <li className="text-sm md:text-base">
                        Receive live links, metrics, and detailed reports on your press release results.
                    </li>
                </ul>
                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    ),
    "street-insider-pr": (
        <>
            <div className="w-full md:w-auto flex-1">
                <h1 className="text-xl md:text-3xl mb-5 font-bold text-blue-500">
                    Street Insider PR Plan
                </h1>
                <p className="text-sm md:text-base">
                    <strong>FG Newswire</strong> is pleased to present its Street Insider PR Plan, offering businesses an effective way to boost visibility and credibility through professional press releases and strategic guest posts. FG Newswire make a strong impact in the competitive digital media landscape.
                </p>
                <ul className="list-disc space-y-2 ps-5 md:ps-7 my-3">
                    <li className="text-sm md:text-base">Professionally written press releases tailored to your business and goals.</li>
                    <li className="text-sm md:text-base">Guest posting opportunities on Street Insider and affiliated platforms.</li>
                    <li className="text-sm md:text-base">SEO-optimized content to enhance search engine visibility.</li>
                    <li className="text-sm md:text-base">Strategic distribution to reach investors, media, and target audiences.</li>
                    <li className="text-sm md:text-base">Multimedia support, including images, videos, and hyperlinks.</li>
                    <li className="text-sm md:text-base">Increased brand recognition and authority in your industry.</li>
                    <li className="text-sm md:text-base">Performance analytics to track reach, engagement, and coverage.</li>
                    <li className="text-sm md:text-base">Timely delivery of announcements for maximum impact.</li>
                    <li className="text-sm md:text-base">Customizable PR packages suitable for businesses of all sizes.</li>
                    <li className="text-sm md:text-base">Strengthened credibility by publishing on a trusted financial news platform.</li>
                </ul>
                <button
                    type="button"
                    className="my-5 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    data-wow-iteration="3"
                >
                    Submit PR
                </button>
            </div>
        </>
    )
};

// SSR Fetch for a single package by slug
async function getPackage(slug) {
    const res = await fetch(`https://api.glassworld06.com/api/packages`, {
        cache: "no-store", // Force SSR
    });

    if (!res.ok) return null;

    const allPackages = await res.json();

    return allPackages.find((pkg) => pkg.slug === slug) || null;
}

// SSR Page Component
export default async function PlanPage({ params }) {
    const  { slug } = await params;

    const pkg = await getPackage(slug);

    if (!pkg) {
        return (<></>);
    }

    const content = staticContent[slug];

    return (
        <>
            <section className="px-3 md:max-w-3xl gap-3 lg:max-w-5xl mx-auto flex flex-col md:flex-row items-start py-6 justify-between">
                {/* Static predefined content */}
                {content ? (
                    content
                ) : (
                    <p className="text-center text-gray-500 py-10">
                        No static content available for this package.
                    </p>
                )}


                <aside className="relative w-full md:w-4/12">
                    <div
                        className={`wow animate__animated animate__fadeInUp`}
                        data-wow-delay="0.2s"
                    >
                        <PlanCard plan={pkg} />
                    </div>
                </aside>
            </section>


        </>
    );
}
