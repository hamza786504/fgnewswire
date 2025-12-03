"use client";
import Link from 'next/link';
import React, { useState } from 'react'



function ProductInfo() {
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




    return (
        <>
            {/* Product Info */}
            <div className="container mx-auto px-4 py-6">
                {/* Product Gallery and Summary */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Product Images */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative">
                            {/* Main Product Image */}
                            <div className="mb-4 relative">
                                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                    <img
                                        src="https://guestpostlinks.net/wp-content/smush-webp/2021/06/DA50-Package-10-Guest-Posts-Included.png.webp"
                                        alt="DA 50 Guest Posting Package - 10 Guest Posts Included"
                                        className="w-full h-full object-contain"
                                        width={1080}
                                        height={1080}
                                        loading="eager"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Newsletter Signup - Mobile Only */}
                        <div className="mt-6 block lg:hidden bg-white rounded-lg border border-gray-200 p-6">
                            <div className="text-center">
                                <div className="text-2xl mb-2">📬</div>
                                <h3 className="font-bold text-lg mb-2">DON'T MISS UPDATES FROM US!</h3>
                                <p className="text-gray-600 mb-4">
                                    Sign up now for our newsletter to receive a list of newly added high DA sites and limited-time offers every week.
                                </p>
                                <form className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="E-mail Address"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                                    >
                                        Subscribe Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="w-full lg:w-1/2">
                        {/* Product Title */}
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">
                            DA50+ Guest Posting Package (10 Guest Posts Included)
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="20" height="20" viewBox="0 0 32 32" className="fill-current">
                                        <path d="M16 1.333l3.467 11.2h11.2l-9.067 6.933 3.467 11.2-9.067-6.933-9.067 6.933 3.467-11.2-9.067-6.933h11.2z"></path>
                                    </svg>
                                ))}
                            </div>
                            <span className="text-gray-600">4.88 (27 Reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <p className="text-3xl font-bold text-gray-900">$150.90</p>
                            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                    <span className="mr-1">📰</span> Content Placement
                                </span>
                                <span className="flex items-center">
                                    <span className="mr-1">🔗</span> Link Insertion
                                </span>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="mb-6">
                            <ul className="space-y-2">
                                <li className="flex">
                                    <span className="mr-2">•</span>
                                    <span>DA50+ Bundle (10 Guest Posts Included)</span>
                                </li>
                                <li className="flex">
                                    <span className="mr-2">•</span>
                                    <span>2 Do-Follow Contextual Links Per Post</span>
                                </li>
                                <li className="flex">
                                    <span className="mr-2">•</span>
                                    <span>Links on Real Traffic Websites</span>
                                </li>
                                <li className="flex">
                                    <span className="mr-2">•</span>
                                    <span>Normal Delivery Time 2 Weeks</span>
                                </li>
                                <li className="flex">
                                    <span className="mr-2">•</span>
                                    <span>Publish Your Articles (Provided by you)</span>
                                </li>
                                <li className="flex">
                                    <span className="mr-2">•</span>
                                    <span>If you want us to write unique content for you, please check Add-on Services below.</span>
                                </li>
                                <li className="flex">
                                    <span className="mr-2">•</span>
                                    <span>This DA package exclusively includes publication services for articles written in English.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Domain Metrics */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src="https://guestpostlinks.net/wp-content/themes/gpl-child/images/ico_moz.svg"
                                        alt="MOZ"
                                        className="h-3 w-8 mr-2"
                                    />
                                    <span className="text-sm font-medium">DA</span>
                                </div>
                                <div className="text-2xl font-bold">50</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                        </div>

                        {/* Estimated Time */}
                        <div className="mb-6">
                            <p className="font-medium">
                                <strong>Estimated publication time (TAT)</strong>: 14 days
                            </p>
                        </div>

                        {/* Publishing Rules */}
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-bold mb-2 flex items-center">
                                <span className="mr-2">📌</span> Publishing Rules:
                            </h3>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>You can select any 10 websites from given list</li>
                                <li>This DA package exclusively includes publication services for articles written in English.</li>
                                <li>Our editorial team may make changes to maintain quality and SEO standards.</li>
                            </ul>
                        </div>

                        {/* Order Form */}
                        <form className="space-y-6">
                            {/* Order Type */}
                            <div>
                                <label className="block font-medium mb-2">
                                    Order Type <span className="text-orange-400">*</span>
                                </label>
                                <div className="space-y-2">
                                    {[
                                        "Article Publication (We will publish your article.)",
                                        "Article Writing + Publication (We will write and publish the article.)",
                                        "Link Insertion (Niche Edits) (1 Backlink,Subject to Approval)"
                                    ].map((option, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`order-type-${index}`}
                                                name="order-type"
                                                value={option}
                                                className="mr-2"
                                                defaultChecked={index === 0}
                                            />
                                            <label htmlFor={`order-type-${index}`} className="text-sm">
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Article Niche */}
                            <div>
                                <label className="block font-medium mb-2">
                                    Your Article Niche (Content Type) <span className="text-orange-400">*</span>
                                </label>
                                <div className="space-y-2">
                                    {[
                                        { label: "General Niche", price: 0 },
                                        { label: "Sports/iGaming, Crypto", price: 150 },
                                        { label: "Pharmacy, Restricted Beverages", price: 150 },
                                        { label: "Loan and Trading", price: 150 }
                                    ].map((option, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`niche-${index}`}
                                                name="article-niche"
                                                value={option.label}
                                                className="mr-2"
                                                defaultChecked={index === 0}
                                            />
                                            <label htmlFor={`niche-${index}`} className="text-sm">
                                                {option.label}
                                                {option.price > 0 && (
                                                    <span className="text-green-600 ml-1">(+${option.price}.00)</span>
                                                )}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Writing Service */}
                            <div>
                                <label className="block font-medium mb-2">Article Writing Service</label>
                                <div className="space-y-2">
                                    {[
                                        { label: "None", price: 0 },
                                        { label: "600+ Words Article", price: 100 },
                                        { label: "1000+ Words Article", price: 150 },
                                        { label: "1500+ Words Article", price: 200 }
                                    ].map((option, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`writing-${index}`}
                                                name="writing-service"
                                                value={option.label}
                                                className="mr-2"
                                                defaultChecked={index === 0}
                                            />
                                            <label htmlFor={`writing-${index}`} className="text-sm">
                                                {option.label}
                                                {option.price > 0 && (
                                                    <span className="text-green-600 ml-1">(+${option.price}.00)</span>
                                                )}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Note */}
                            <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                                <p>
                                    <u>Note</u>: After checkout, you will be redirected to Requirement Page, where you can upload the <b>Article, Anchor Text, Target URL</b>, or any other details.
                                </p>
                            </div>

                            {/* Add to Cart */}
                            <Link
                                href={"/signin"}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 32 32" className="fill-current mr-2">
                                    <path d="M25.248 22.4l3.552-14.4h-18.528l-0.96-4.8h-6.112v3.2h3.488l3.2 16h15.36zM24.704 11.2l-1.968 8h-10.24l-1.6-8h13.808z"></path>
                                    <path d="M25.6 26.4c0 1.325-1.075 2.4-2.4 2.4s-2.4-1.075-2.4-2.4c0-1.325 1.075-2.4 2.4-2.4s2.4 1.075 2.4 2.4z"></path>
                                    <path d="M14.4 26.4c0 1.325-1.075 2.4-2.4 2.4s-2.4-1.075-2.4-2.4c0-1.325 1.075-2.4 2.4-2.4s2.4 1.075 2.4 2.4z"></path>
                                </svg>
                                Add to cart
                            </Link>

                            {/* Money Back Guarantee */}
                            <div className="flex items-center justify-center p-4 border border-green-200 rounded-lg bg-green-50">
                                <img
                                    src="https://guestpostlinks.net/wp-content/uploads/money-back-guarantee.svg"
                                    alt="Money Protection Guarantee"
                                    className="w-12 h-12 mr-3"
                                />
                                <div>
                                    <p className="font-semibold">Money Protection Guarantee</p>
                                    <p className="text-sm">Guest Post Published or Your Money Back.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Newsletter Signup - Desktop Only */}
                <div className="hidden lg:block mt-12 max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
                    <div className="text-center">
                        <div className="text-2xl mb-2">📬</div>
                        <h3 className="font-bold text-xl mb-2">DON'T MISS UPDATES FROM US!</h3>
                        <p className="text-gray-600 mb-4">
                            Sign up now for our newsletter to receive a list of newly added high DA sites and limited-time offers every week.
                        </p>
                        <form className="flex gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="E-mail Address"
                                className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-orange-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Rating */}
            <section className="w-full px-4 py-10 bg-gray-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Left: Ratings Summary */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Ratings</h2>
                        <div className="flex items-center space-x-3">
                            <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
                            <div>
                                <div className="flex text-yellow-400 text-xl">
                                    {"★".repeat(Math.round(averageRating))}
                                    {"☆".repeat(5 - Math.round(averageRating))}
                                </div>
                                <p className="text-gray-500 text-sm">{reviews.length} Publisher Ratings</p>
                            </div>
                        </div>

                        {/* Progress bars */}
                        <div className="mt-4 space-y-1">
                            {[5, 4, 3, 2, 1].map((star, i) => (
                                <div key={star} className="flex items-center space-x-2">
                                    <span className="w-4 text-sm">{star}</span>
                                    <div className="flex-1 bg-gray-200 h-2 rounded">
                                        <div
                                            className="h-2 rounded bg-gradient-to-r from-blue-500 to-purple-700"
                                            style={{
                                                width: `${(ratingCounts[i] / reviews.length) * 100 || 0
                                                    }%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600">{ratingCounts[i]}</span>
                                </div>
                            ))}
                        </div>

                        {/* Write Review Button */}
                        <div className="mt-6">
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 hover:opacity-90"
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>

                    {/* Right: Reviews List */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Customer Reviews ({reviews.length})
                        </h2>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                            {reviews.map((r, i) => (
                                <div key={i} className="border-b border-gray-200 pb-3">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium">{r.name}</p>
                                        <div className="text-yellow-400">
                                            {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">{r.date}</p>
                                    <p className="mt-2 text-gray-700">{r.review}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Review Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full p-2 border rounded-lg"
                                    value={newReview.name}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, name: e.target.value })
                                    }
                                />
                                <textarea
                                    placeholder="Your Review"
                                    className="w-full p-2 border rounded-lg"
                                    rows="3"
                                    value={newReview.review}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, review: e.target.value })
                                    }
                                />
                                <select
                                    className="w-full p-2 border rounded-lg"
                                    value={newReview.rating}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                                    }
                                >
                                    {[5, 4, 3, 2, 1].map((s) => (
                                        <option key={s} value={s}>
                                            {s} Star{s > 1 ? "s" : ""}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        className="flex-1 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 hover:opacity-90"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 py-2 rounded-lg border"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default ProductInfo
