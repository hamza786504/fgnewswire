"use client";
import React, { useEffect, useRef } from "react";

const WavyCarousel = () => {
  const images = [
    {
      one: "/imgs/bloomberg.png",
      two: "/imgs/yahoo-finance.png",
      animation: "bubbleUpDown", // Animation for bubble 1
    },
    {
      one: "/imgs/yahoo-news.png",
      two: "/imgs/business insider.png",
      animation: "", // No animation for bubble 2
    },
    {
      one: "/imgs/associated press.png",
      two: "/imgs/market watch.png",
      animation: "bubbleUpDown", // Animation for bubble 3
    },
    {
      one: "/imgs/morningstar.png",
      two: "/imgs/central charts.png",
      animation: "", // No animation for bubble 4
    },
    {
      one: "/imgs/bing news.png",
      two: "/imgs/benzinga.png",
      animation: "bubbleUpDown", // Animation for bubble 5
    },
    {
      one: "/imgs/streetinsider.png",
      two: "/imgs/canadianinsider.png",
      animation: "", // No animation for bubble 6
    },
    {
      one: "/imgs/fox28.png",
      two: "/imgs/cbs19.png",
      animation: "bubbleUpDown", // Animation for bubble 7
    },
    {
      one: "/imgs/snnnews.png",
      two: "/imgs/etoro.png",
      animation: "", // No animation for bubble 8
    },
    {
      one: "/imgs/digital journal.png",
      two: "/imgs/daily herald.png",
      animation: "bubbleUpDown", // Animation for bubble 9
    },
    {
      one: "/imgs/baystreet.png",
      two: "/imgs/us time now.png",
      animation: "", // No animation for bubble 10
    },
    {
      one: "/imgs/google news.png",
      two: "/imgs/azcentral.png",
      animation: "bubbleUpDown", // Animation for bubble 11
    },
    {
      one: "/imgs/binance news.png",
      two: "/imgs/ceoca.png",
      animation: "", // No animation for bubble 12
    },
    {
      one: "/imgs/social media blast.png",
      two: "/imgs/bloomberg.png",
      animation: "bubbleUpDown", // Animation for bubble 13
    },
  ];

  const carouselRef = useRef(null);
  const carouselContentRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Clone the first set of images and append to create seamless loop
    const carouselContent = carouselContentRef.current;
    const carouselItems = carousel.querySelectorAll(".carousel-item");

    carouselItems.forEach((item) => {
      const clone = item.cloneNode(true);
      carouselContent.appendChild(clone);
    });

    // Horizontal Animation
    let animationId;
    let position = 0;
    const speed = 0.3; // Adjust speed as needed

    const animate = () => {
      position -= speed;
      if (position <= -carouselContent.scrollWidth / 2) {
        position = 0;
      }
      carouselContent.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="w-full bg-white pt-12 pb-24 px-4 md:px-16">
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto">
        {/* Headings */}
        <div className="text-center mb-8">
          <p className="text-xl md:text-4xl font-semibold tracking-widest text-gray-700">
            • 300K+ PUBLISHERS •
          </p>
          <p className="mt-2 text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Ensure that your press release reaches top-tier media platforms.
            Our services for assured media publication begin at just{" "}
            <span className="font-semibold">$99</span>.
          </p>
        </div>

        <h2 className="text-lg md:text-2xl font-bold text-center mb-10 text-gray-900">
          Get Your Story on the News Radar
        </h2>

        <div ref={carouselRef} className="carousel-container w-full">
          <div ref={carouselContentRef} className="carousel-content flex whitespace-nowrap">
            {images.map((img, index) => (
              <div key={index} className="carousel-item inline-flex items-center justify-center mx-8 space-y-10 flex-col">
                <div
                  className={`${
                    index % 2 === 0 ? "w-35 h-35" : "w-40 h-40"
                  } flex items-center justify-center p-2 bg-white rounded-full inset-shadow-sm shadow-lg overflow-hidden bubble`}
                  style={{
                    animation: img.animation
                      ? `${img.animation} 10s ease-in-out infinite 0s`
                      : "none",
                  }}
                >
                  <img
                    src={img.one}
                    alt={`Carousel item ${index}`}
                    className="w-full h-full object-contain p-2"
                    style={{ aspectRatio: "1/1" }}
                  />
                </div>
                <div
                  className={`${
                    index % 2 === 0 ? "w-35 h-35" : "w-40 h-40"
                  } flex items-center justify-center p-2 bg-white rounded-full inset-shadow-sm shadow-lg overflow-hidden bubble`}
                  style={{
                    animation: img.animation
                      ? `${img.animation} 10s ease-in-out infinite 0s`
                      : "none",
                  }}
                >
                  <img
                    src={img.two}
                    alt={`Carousel item ${index}`}
                    className="w-full h-full object-contain p-2"
                    style={{ aspectRatio: "1/1" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WavyCarousel;
