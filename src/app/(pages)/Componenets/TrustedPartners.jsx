"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react'

const logos = [
    "/imgs/trusted-1.webp",
    "/imgs/trusted-2.webp",
    "/imgs/trusted-3.webp",
    "/imgs/trusted-4.webp",
    "/imgs/trusted-5.webp",
    "/imgs/trusted-6.webp",
    "/imgs/trusted-7.webp",
    "/imgs/trusted-8.webp"
];

function TrustedPartners() {
    const leftToRightSettings = {
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        rtl: false, // Left to right
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const rightToLeftSettings = {
        ...leftToRightSettings,
        rtl: true // Right to left
    };

    return (
        <>
            <section className="w-full bg-white py-12 px-4 md:px-16">
                <div className="md:max-w-3xl lg:max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <p className="text-xl md:text-4xl font-semibold tracking-widest text-gray-700">
                            Trusted and celebrated as a top-tier solution.
                        </p>
                    </div>
                    <Slider {...rightToLeftSettings}>
                        {logos.map((src, index) => (
                            <div key={index} className="my-24 px-2">
                                <div className="flex items-center h-16 md:h-20">
                                    <Image
                                        src={src}
                                        alt={`Logo ${index}`}
                                        width={260}
                                        height={180}
                                        className="object-cover max-h-[450px] mx-auto"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default TrustedPartners
