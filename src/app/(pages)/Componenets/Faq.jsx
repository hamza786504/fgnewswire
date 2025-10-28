"use client";

import React, { useState } from "react";
const faqData = [
  {
    question: "What is FG Newswire?",
    answer:
      "FG Newswire is a platform that helps businesses and individuals share their news, press releases, and guest posts on trusted websites.",
  },
  {
    question: "How does guest posting work?",
    answer:
      "You provide your content or topic, and we publish it on high-quality websites relevant to your niche.",
  },
  {
    question: "What is a press release service?",
    answer:
      "We write and distribute your news to media outlets and online platforms to increase visibility and credibility.",
  },
  {
    question: "Who can use FG Newswire?",
    answer:
      "Startups, small businesses, established brands, and even individuals looking to share news can use our services.",
  },
  {
    question: "Are the websites real and high-quality?",
    answer:
      "Yes, we only publish on trusted, high-traffic websites that add real value.",
  },
  {
    question: "Do I need to pay upfront?",
    answer:
      "No credit card is required to get started, and you can cancel anytime.",
  },
  {
    question: "How long does it take to publish my content?",
    answer:
      "Most guest posts and press releases go live within a few days, depending on the package.",
  },
  {
    question: "Can I choose the websites for my guest posts?",
    answer:
      "Yes, we work with you to select websites that match your niche and goals.",
  },
  {
    question: "How many links can I include in a guest post?",
    answer:
      "Each post typically allows 1–2 backlinks to your website for SEO purposes.",
  },
  {
    question: "Will this help my SEO?",
    answer:
      "Yes, publishing on high-quality websites improves your search engine rankings and online visibility.",
  },
  {
    question: "Can I submit my own article?",
    answer:
      "Yes, you can provide your content, or we can write it for you.",
  },
  {
    question: "Is there a limit to how many posts I can submit?",
    answer:
      "No, you can choose packages that fit your needs, from single posts to multiple submissions.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We offer flexible plans to suit every budget. Pricing depends on the number of posts and the authority of the websites.",
  },
  {
    question: "What industries do you cover?",
    answer:
      "We cover a wide range of industries, including tech, health, lifestyle, business, and more.",
  },
  {
    question: "How do I track my results?",
    answer:
      "We provide live links and reports so you can see where your content is published and track performance.",
  },
  {
    question: "Is this safe for my website?",
    answer:
      "Yes, we follow ethical publishing practices and avoid spammy sites.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply choose a plan, share your content or topic, and our team will handle the rest.",
  },
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
