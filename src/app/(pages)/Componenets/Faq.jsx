"use client";

import React, { useState } from "react";
const faqData = [
    {
        question: "What is the definition of a press release?",
        answer: "A press release is a documented communication sent to news media members to inform them of newsworthy information.",
    },
    {
        question: "Can my press release include photographs, video, or sound recordings?",
        answer: "You can add up to 5 images per release. You can also add more images according to the plan you selected.",
    },
    {
        question: "What is the procedure for distributing press releases?",
        answer: "Our distribution process involves submitting your press release through our platform, after which our team reviews it for quality and then distributes it to our network of media outlets and journalists based on your selected package."
    },
    {
        question: "What are the advantages of distributing press releases?",
        answer: "Press release distribution helps increase brand visibility, improve SEO through backlinks, establish credibility, reach target audiences, and potentially get media coverage from journalists who monitor press release services."
    },
    {
        question: "What's the best way to get started?",
        answer: "The easiest way to get started is to select a package that fits your needs, prepare your press release content, and submit it through our platform. Our team will guide you through the process."
    },
    {
        question: "What is the procedure for submitting a press release?",
        answer: "You can submit a press release by creating an account on our platform, selecting a distribution package, uploading your content (text, images, etc.), and completing the submission process with payment."
    },
    {
        question: "How can I improve my press release writing skills?",
        answer: "We provide writing guidelines and templates to help you craft effective press releases. Focus on newsworthy angles, clear headlines, concise writing, and including all essential information (who, what, when, where, why)."
    },
    {
        question: "Do you have any samples of effective press releases?",
        answer: "Yes, we can provide sample press releases that demonstrate effective structure, content, and formatting. These samples showcase how to present information in a way that attracts media attention."
    },
    {
        question: "What is the maximum amount of traffic that one Press Release can generate?",
        answer: "Traffic results vary depending on the newsworthiness of your content and the distribution package selected. Some releases generate hundreds of visits, while particularly newsworthy ones can generate thousands."
    },
    {
        question: "How long would it take to distribute the press release?",
        answer: "Standard distribution typically begins within 24 hours of submission and completes within 2-3 business days. Expedited options are available for faster distribution."
    },
    {
        question: "Do photos, videos, and music come at an extra cost?",
        answer: "Basic packages include a limited number of images. Additional multimedia elements or higher quantities may require premium packages or additional fees."
    },
    {
        question: "How can I know when my press release has been distributed entirely?",
        answer: "You'll receive email notifications at key stages of the distribution process, and a final report when distribution is complete showing all placements."
    },
    {
        question: "Will I receive a distribution report?",
        answer: "Yes, all packages include a detailed distribution report showing where your press release was placed, including links to online coverage when available."
    },
    {
        question: "What is the significance of the 'Company Logo' attachment in the Agency Submission?",
        answer: "Including your company logo helps with brand recognition in the distributed release and increases the chances of media outlets using it when covering your story."
    },
    {
        question: "How do I include my company's logo in a branded report?",
        answer: "You can upload your logo during the submission process. We recommend high-resolution logos in standard formats (JPEG, PNG) for best results."
    },
    {
        question: "Can you help me write a press release?",
        answer: "Yes, we offer professional press release writing services at an additional cost. Our writers can help craft an effective release based on your information."
    },
    {
        question: "Can I provide your services to my clients as a resale? Will there be any discounts available for resellers?",
        answer: "We do offer reseller programs with discounted rates for agencies and professionals who regularly distribute press releases for clients. Please contact our sales team for reseller program details."
    }
];

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFaq = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div
            className="relative w-full bg-white px-0 pt-10 pb-8 mt-8 ring-1 ring-gray-900/5 sm:rounded-lg sm:px-10">
            <div className="mx-auto px-3 sm:px-5">
                <div className="flex flex-col items-center">
                    <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
                    <p className="mt-3 text-lg text-neutral-500 md:text-xl">Frequenty asked questions
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mx-auto mt-8 divide-y divide-neutral-200">
                    {faqData.map((faq,idx) => {
                        return (
                            <div key={idx} className="py-5">
                                <details className="group">
                                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                        <span> {faq.question}</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="group-open:animate-fadeIn mt-3 text-neutral-600">{faq.answer}
                                    </p>
                                </details>
                            </div>
                        )
                    })}


                </div>
            </div>
        </div>
    );
};

export default Faq;
