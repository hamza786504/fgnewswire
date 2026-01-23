"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaLongArrowAltRight, FaCheckCircle, FaStar, FaTimesCircle } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import TestimonialCarousel from "../Componenets/TestimonialCarousel";
import Faq from "../Componenets/Faq";
import CountriesSection from "../Componenets/CountriesSection";
import GuestPostingPackageCard from "../Componenets/GuestPostingPackageCard";

export default function GuestPostingPackage() {
    const [showForm, setShowForm] = useState(false);
    const [reviews, setReviews] = useState([
        {
            name: "ste******",
            date: "October 28, 2021",
            review: "Great work! I appreciate that you put the keywords in the URL of each blog post.",
            rating: 5,
        },
        {
            name: "wil*****",
            date: "August 27, 2022",
            review: "Delivery is fast and definitely look like quality content. Awesome.",
            rating: 5,
        },
        {
            name: "taj******",
            date: "October 20, 2022",
            review: "Good",
            rating: 5,
        },
    ]);

    const [newReview, setNewReview] = useState({ name: "", review: "", rating: 5 });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.review) return;
        setReviews([{ ...newReview, date: new Date().toDateString() }, ...reviews]);
        setNewReview({ name: "", review: "", rating: 5 });
        setShowForm(false);
    };

    const averageRating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    const ratingCounts = [5, 4, 3, 2, 1].map(
        (star) => reviews.filter((r) => r.rating === star).length
    );


    const plans = [
        {
            title: "DA50+",
            price: "$150",
            subtitle: "10 Guest Posts Included",
            features: [
                "DA50+ 100 Websites",
                "Publish Your Articles",
                "2 Do-Follow Contextual Links Per Post",
                "Links From Real Traffic Websites",
                "600+ Word Articles Included",
                "Normal Delivery Time: 7-10 days",
                "NO CASINO & CBD Allowed (+30$)",
            ],
            highlight: false,
        },
        {
            title: "DA60+",
            price: "$200",
            subtitle: "10 Guest Posts Included",
            features: [
                "DA60+ 100 Websites",
                "Publish Your Articles",
                "2 Do-Follow Contextual Links Per Post",
                "Links From Real Traffic Websites",
                "800+ Word Articles Included",
                "Normal Delivery Time: 7-10 days",
                "NO CASINO & CBD Allowed (+30$)",
            ],
            highlight: true, // Middle package highlighted
        },
        {
            title: "DA70+",
            price: "$400",
            subtitle: "10 Guest Posts Included",
            features: [
                "DA70+ 100 Websites",
                "Publish Your Articles",
                "2 Do-Follow Contextual Links Per Post",
                "Links From Real Traffic Websites",
                "600+ Word Articles Included",
                "Normal Delivery Time: 7-10 days",
                "NO CASINO & CBD Allowed (+30$)",
            ],
            highlight: false,
        },
    ];
    return (
        <>

            <section
                className="relative w-full h-full flex items-center min-h-[80vh] transition-all duration-300 ease-in-out bg-linear-to-r from-blue-500 to-purple-700"
            >
                <div className="py-8 md:pt-0 px-3 md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between banner-container">

                    {/* LEFT SECTION */}
                    <div className="relative w-full md:w-1/2 text-center md:text-start">
                        <h1
                            className="text-white wow animate__animated animate__fadeInLeft inline-block text-xl sm:text-3xl md:text-5xl text-center md:text-start font-bold leading-tight my-1"
                            data-wow-delay="0.2s"
                        >
                            Expand Your Reach with Guest Posting Packages
                        </h1>

                        <p
                            className="wow animate__animated animate__fadeInLeft text-base md:text-lg my-2 text-white"
                            data-wow-delay="0.4s"
                        >
                            Our guest posting packages make it easy to publish your content on high-quality, trusted websites. Reach the right audience, build backlinks, and improve your SEO while boosting your brand&apos;s online credibility, all with a simple, hassle-free process.
                        </p>

                        <div
                            className="wow animate__animated animate__fadeInLeft flex flex-col items-stretch sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:items-center space-x-- sm:space-x-2 mt-5"
                            data-wow-delay="0.6s"
                        >
                            {/* <a
                                href="/"
                                className="flex items-center md:px-4 hover:bg-transparent bg-[#163316] uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-2 rounded-full text-xs sm:text-sm lg:text-base font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform gap-2"
                            >
                                DA PACKAGES
                                <FaLongArrowAltRight className="ms-0" />
                            </a> */}
                            <Link
                                href="/"
                                className="text-center justify-center sm:justify-start flex items-center md:px-4 uppercase bg-white text-black px-8 py-2 rounded-full text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform gap-2"
                            >
                                DA PACKAGES
                                <FaLongArrowAltRight className="ms-0" />
                            </Link>

                            {/* <a
                                href="/"
                                className="px-3 md:px-4 py-[6px] rounded-3xl text-xs sm:text-sm lg:text-base font-normal border-2 text-center text-[#242423] bg-transparent border-[#242423] hover:bg-black hover:border-black hover:text-white transition-all ease-in-out uppercase inline-flex items-center gap-2"
                            >
                                PUBLISHER SITES & PRICING
                                <FaLongArrowAltRight className="ms-0" />
                            </a> */}
                            <Link
                                href="/sites"
                                className="justify-center sm:justify-start px-3 md:px-4 py-[6px] rounded-3xl text-xs sm:text-sm lg:text-base font-normal border-2 text-white text-center white bg-transparent border-white transition-all ease-in-out uppercase inline-flex items-center gap-2"
                            >
                                PUBLISHER SITES & PRICING
                                <FaLongArrowAltRight className="ms-0" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SECTION IMAGE */}
                    <div
                        className="relative w-full md:w-1/2 text-center wow animate__animated animate__flipInY"
                        data-wow-delay="1s"
                        style={{
                            backfaceVisibility: "hidden",
                            transformStyle: "preserve-3d",
                            transition: "transform 1s ease-in-out",
                        }}
                    >
                        <div
                            className="absolute -bottom-[68px] sm:left-[120px] md:left-auto md:right-[230px] lg:right-[330px] z-[11] w-[120px] sm:w-[140px]"
                            style={{
                                animation: "pulseScale 2s ease-in-out infinite",
                            }}
                        >
                            <img src="/imgs/graph.png" alt="" />
                        </div>
                        <div className="absolute z-[11] w-[200px] top-[0px] -sm:top-[150px] left-auto right-[1%] sm:right-[70px] md:left-auto md:right-[0px] md:translate-x-[50px] lg:translate-0 lg:right-[30px]"
                            style={{
                                animation: "pulseScale 2s ease-in-out infinite",
                            }}>
                            <img src="/imgs/guest-posting-page/Guest posting.png" alt="" />
                        </div>
                        <div className="absolute -bottom-[20px] right-[3%] left-auto sm:right-[70px] md:left-auto md:right-[0px] md:translate-x-[50px] lg:translate-0 lg:right-[30px] z-[21] w-[130px] sm:w-[170px]" style={{
                            animation: "pulseScale 2s ease-in-out infinite",
                        }}>
                            <img src="/imgs/technoo.png" alt="" />
                        </div>


                        <img
                            src="/imgs/guest-posting-page/guest posting model.png"
                            alt=""
                            className="w-11/12 max-w-sm mx-auto"
                        />
                    </div>
                </div>
            </section>


            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="md:max-w-4xl lg:max-w-5xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl capitalize font-bold text-gray-900">
                            Why Choose Our <span className="text-[#2563eb]">Guest Posting Service?</span>
                        </h2>
                        <p className="text-center mt-4 text-sm sm:text-md md:text-lg text-gray-600">
                            Our guest posting service helps your brand get noticed on trusted, high-quality websites. It improves your SEO, drives real traffic, and connects your content with the right audience.
                        </p>
                        <p className="text-center mt-4 text-sm sm:text-md md:text-lg text-gray-600">
                            We make the process simple and efficient. You provide your content, and we handle placement, publishing, and reporting, ensuring your brand gets noticed.
                        </p>
                        <p className="text-center mt-4 text-sm sm:text-md md:text-lg text-gray-600">
                            With flexible packages, reliable support, and results-driven strategies, FG Newswire helps businesses of all sizes grow their credibility and online reach.
                        </p>
                    </div>
                </div>
            </section>


            <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 wow animate__animated animate__fadeInUp">
                    Our Key Areas
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    <div className="p-6 bg-white shadow-lg rounded-lg wow animate__animated animate__fadeInUp" data-wow-delay="0.1s">
                        <h3 className="text-md md:text-lg font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Reach Your Audience</h3>
                        <p className="text-gray-600 text-sm md:text-md">
                            Publish content on trusted websites and connect with real readers.
                        </p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-lg wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
                        <h3 className="text-md md:text-lg font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Improve SEO:</h3>
                        <p className="text-gray-600 text-sm md:text-md">
                            Gain high-quality backlinks that boost search engine rankings effectively.
                        </p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-lg wow animate__animated animate__fadeInUp" data-wow-delay="0.3s">
                        <h3 className="text-md md:text-lg font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Build Credibility</h3>
                        <p className="text-gray-600 text-sm md:text-md">
                            Feature your brand on authoritative sites to strengthen trust online.
                        </p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-lg wow animate__animated animate__fadeInUp" data-wow-delay="0.4s">
                        <h3 className="text-md md:text-lg font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Drive Traffic</h3>
                        <p className="text-gray-600 text-sm md:text-md">
                            Increase website visits with engaging, relevant content for your audience
                        </p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-lg wow animate__animated animate__fadeInUp" data-wow-delay="0.5s">
                        <h3 className="text-md md:text-lg font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Flexible Packages</h3>
                        <p className="text-gray-600 text-sm md:text-md">
                            Choose plans that fit startups, growing businesses, and established brands.
                        </p>
                    </div>

                    <div className="p-6 bg-white shadow-lg rounded-lg wow animate__animated animate__fadeInUp" data-wow-delay="0.6s">
                        <h3 className="text-md md:text-lg font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Proven Results</h3>
                        <p className="text-gray-600 text-sm md:text-md">
                            See measurable growth in visibility, engagement, and online presence quickly.
                        </p>
                    </div>

                </div>
            </section>



            <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-700 wow animate__animated animate__fadeInUp">
                    How Our Guest Posting Service Work
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="p-6 rounded-lg shadow-lg border-l-4 border-blue-500 bg-gray-50 wow animate__animated animate__fadeInUp" data-wow-delay="0.1s">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">Submit Your Content:</h3>
                        <p className="text-gray-600">
                            Share your article or topic, or let our team create it
                        </p>
                    </div>

                    <div className="p-6 rounded-lg shadow-lg border-l-4 border-purple-500 bg-gray-50 wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
                        <h3 className="text-xl font-semibold mb-3 text-purple-600">Placement on Trusted Sites</h3>
                        <p className="text-gray-600">
                            We publish your content on high-quality, relevant websites
                        </p>
                    </div>

                    <div className="p-6 rounded-lg shadow-lg border-l-4 border-blue-500 bg-gray-50 wow animate__animated animate__fadeInUp" data-wow-delay="0.3s">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">Track Your Results</h3>
                        <p className="text-gray-600">
                            Receive live links and performance reports to measure impact
                        </p>
                    </div>

                </div>
            </section>





            <section className="py-16 px-2 md:px-12 lg:px-24  max-w-6xl mx-auto bg-white">
                <div>
                    <div className="mb-12">
                        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl capitalize font-bold text-gray-900">
                            <span className="text-[#2563eb]">Guest Post</span> <strong>Packages</strong>
                        </h2>
                        <p className="text-center mt-4 text-sm sm:text-md font-bold capitalize md:text-lg text-gray-600">
                            Choose a Package That Fits Your Requirements.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        <GuestPostingPackageCard limit={3} />
                    </div>
                </div>
                <div className="text-center mt-5 mx-auto">
                    <Link href={"/guest-posting-plans"} className="mt-4 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        View All Guest Posting Plans
                    </Link>
                </div>
            </section>


            <TestimonialCarousel />
            <Faq
                faqData={[
                    {
                        question: "What is guest posting?",
                        answer:
                            "Guest posting is publishing your article or content on another website to reach new audiences.",
                    },
                    {
                        question: "How does FG Newswire help with guest posting?",
                        answer:
                            "We find high-quality websites, place your content, and handle everything from start to finish.",
                    },
                    {
                        question: "Who can use this service?",
                        answer:
                            "Startups, small businesses, established brands, and individuals looking to grow their online presence.",
                    },
                    {
                        question: "Do I need to provide my article?",
                        answer:
                            "You can provide your own content, or our team can create it for you.",
                    },
                    {
                        question: "How long does it take to publish a post?",
                        answer:
                            "Most posts go live within a few days, depending on the package and website approval.",
                    },
                    {
                        question: "Are the websites real and trustworthy?",
                        answer:
                            "Yes, we only work with high-authority, relevant, and trusted websites.",
                    },
                    {
                        question: "How many backlinks can I include in a post?",
                        answer:
                            "Each post usually allows 1–2 backlinks to your website for SEO purposes.",
                    },
                    {
                        question: "Will this improve my SEO?",
                        answer:
                            "Yes, publishing on high-quality sites helps boost search engine rankings and visibility.",
                    },
                    {
                        question: "Can I choose the websites for my guest post?",
                        answer:
                            "Yes, we work with you to select relevant websites that match your niche.",
                    },
                    {
                        question: "How much does the service cost?",
                        answer:
                            "Pricing depends on the package, number of posts, and authority of the websites.",
                    },
                    {
                        question: "Are there flexible packages?",
                        answer:
                            "Yes, we offer packages for businesses of all sizes and budgets.",
                    },
                    {
                        question: "Can I track my guest post performance?",
                        answer:
                            "Yes, we provide live links and reports so you can monitor results.",
                    },
                    {
                        question: "Is this safe for my website?",
                        answer:
                            "Absolutely. We follow ethical practices and avoid spammy sites.",
                    },
                    {
                        question: "How often can I submit posts?",
                        answer:
                            "You can submit as many posts as your chosen package allows.",
                    },
                    {
                        question: "What topics are accepted?",
                        answer:
                            "We accept topics relevant to your business, industry, or niche.",
                    },
                    {
                        question: "Can guest posting increase brand credibility?",
                        answer:
                            "Yes, being featured on reputable sites strengthens your authority and trust.",
                    },
                    {
                        question: "How do I get started?",
                        answer:
                            "Select a package, provide your content or topic, and we handle the rest.",
                    },
                ]}
            />

            <CountriesSection />


           
        </>
    );
}