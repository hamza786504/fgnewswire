"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaSearch } from "react-icons/fa";

export default function PackagesWithAllFilters({ plans = [] }) {
  const [filters, setFilters] = useState({
    as: "",
    da: "",
    dr: "",
    niche: "",
    language: "",
    ahrefTraffic: "",
    ahrefKeywords: "",
    similarwebTraffic: "",
    semrushTraffic: "",
    country: "",
    sportsAllowed: "",
    pharmacyAllowed: "",
    cryptoAllowed: "",
    backlinks: "",
    linkType: "",
    linkValidity: "",
    googleNews: "",
    markedSponsored: "",
    foreignLangAllowed: "",
    tld: "",
    priceRange: "",
    selectWeek: "",
    searchText: "",
    perPage: "25",
    sortBy: "ahrefs",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((s) => ({ ...s, [name]: value }));
  };

  const applyFilters = () => {
    // TODO: implement real filtering (client-side or server-side)
    // For now just logs filters so you can see what to send to your API.
    console.log("Applying filters:", filters);
    // Example: fetch(`/api/plans?${qs.stringify(filters)}`) ...
  };

  const clearFilters = () => {
    setFilters({
      as: "",
      da: "",
      dr: "",
      niche: "",
      language: "",
      ahrefTraffic: "",
      ahrefKeywords: "",
      similarwebTraffic: "",
      semrushTraffic: "",
      country: "",
      sportsAllowed: "",
      pharmacyAllowed: "",
      cryptoAllowed: "",
      backlinks: "",
      linkType: "",
      linkValidity: "",
      googleNews: "",
      markedSponsored: "",
      foreignLangAllowed: "",
      tld: "",
      priceRange: "",
      selectWeek: "",
      searchText: "",
      perPage: "25",
      sortBy: "ahrefs",
    });
  };

  return (
    <div className="w-full px-4 md:px-8 py-6">
      {/* FILTER CARD */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        {/* Filters container: mobile => horizontal scroll, md+ => wrap */}
        <div className="flex gap-2 overflow-x-auto md:overflow-visible md:flex-wrap py-2">
          {/* Keep each control minimally wide so horizontal scroll looks tidy */}
          <select
            name="as"
            value={filters.as}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">AS</option>
            <option value="<10">&lt;10</option>
            <option value="10-50">10 - 50</option>
            <option value="50+">50+</option>
          </select>

          <select
            name="da"
            value={filters.da}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">DA</option>
            <option value="0-10">0 - 10</option>
            <option value="11-30">11 - 30</option>
            <option value="31-50">31 - 50</option>
            <option value="51+">51+</option>
          </select>

          <select
            name="dr"
            value={filters.dr}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">DR</option>
            <option value="0-10">0 - 10</option>
            <option value="11-30">11 - 30</option>
            <option value="31-50">31 - 50</option>
            <option value="51+">51+</option>
          </select>

          <select
            name="niche"
            value={filters.niche}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Niche</option>
            <option value="tech">Technology</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="ecommerce">Ecommerce</option>
          </select>

          <select
            name="language"
            value={filters.language}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="multi">Multi</option>
          </select>

          <select
            name="ahrefTraffic"
            value={filters.ahrefTraffic}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Ahref Traffic</option>
            <option value="low">&lt;1k</option>
            <option value="medium">1k - 10k</option>
            <option value="high">&gt;10k</option>
          </select>

          <select
            name="ahrefKeywords"
            value={filters.ahrefKeywords}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Ahref Keywords</option>
            <option value="<100">&lt;100</option>
            <option value="100-500">100 - 500</option>
            <option value="500+">500+</option>
          </select>

          <select
            name="similarwebTraffic"
            value={filters.similarwebTraffic}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Similarweb Traffic</option>
            <option value="low">&lt;5k</option>
            <option value="medium">5k - 50k</option>
            <option value="high">&gt;50k</option>
          </select>

          <select
            name="semrushTraffic"
            value={filters.semrushTraffic}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Semrush Traffic</option>
            <option value="low">&lt;5k</option>
            <option value="medium">5k - 50k</option>
            <option value="high">&gt;50k</option>
          </select>

          <select
            name="country"
            value={filters.country}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="pk">Pakistan</option>
            <option value="in">India</option>
            <option value="ca">Canada</option>
          </select>

          {/* boolean / allowed flags */}
          <select
            name="sportsAllowed"
            value={filters.sportsAllowed}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Sports/Gaming allowed?</option>
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select
            name="pharmacyAllowed"
            value={filters.pharmacyAllowed}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Pharmacy allowed?</option>
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select
            name="cryptoAllowed"
            value={filters.cryptoAllowed}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Crypto allowed?</option>
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select
            name="backlinks"
            value={filters.backlinks}
            onChange={handleChange}
            className="min-w-[150px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">No. of backlinks</option>
            <option value="<100">&lt;100</option>
            <option value="100-500">100 - 500</option>
            <option value="500-1000">500 - 1k</option>
            <option value="1000+">1000+</option>
          </select>

          <select
            name="linkType"
            value={filters.linkType}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Link Type</option>
            <option value="dofollow">Dofollow</option>
            <option value="nofollow">Nofollow</option>
            <option value="sponsored">Sponsored</option>
            <option value="ugc">UGC</option>
            <option value="any">Any</option>
          </select>

          <select
            name="linkValidity"
            value={filters.linkValidity}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Link Validity</option>
            <option value="live">Live</option>
            <option value="broken">Broken</option>
            <option value="any">Any</option>
          </select>

          <select
            name="googleNews"
            value={filters.googleNews}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Google News</option>
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select
            name="markedSponsored"
            value={filters.markedSponsored}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Marked as Sponsored</option>
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select
            name="foreignLangAllowed"
            value={filters.foreignLangAllowed}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Foreign lang. allowed?</option>
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select
            name="tld"
            value={filters.tld}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">TLD</option>
            <option value=".com">.com</option>
            <option value=".net">.net</option>
            <option value=".org">.org</option>
            <option value=".co.uk">.co.uk</option>
            <option value="other">Other</option>
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
            className="min-w-[150px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Price range</option>
            <option value="<50">&lt;$50</option>
            <option value="50-150">$50 - $150</option>
            <option value="150-500">$150 - $500</option>
            <option value="500+">$500+</option>
          </select>

          <select
            name="selectWeek"
            value={filters.selectWeek}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select Week</option>
            <option value="this-week">This Week</option>
            <option value="1-week">Last 1 Week</option>
            <option value="2-weeks">Last 2 Weeks</option>
            <option value="4-weeks">Last 4 Weeks</option>
          </select>
        </div>

        {/* Actions: search, bulk, perPage, sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 mt-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="relative w-full">
              <input
                name="searchText"
                value={filters.searchText}
                onChange={handleChange}
                placeholder="Search by Website URL or Niche..."
                className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
            </div>

            <button
              onClick={() => {
                applyFilters();
              }}
              className="bg-orange-500 text-white rounded-md text-sm px-4 py-2 font-semibold hover:bg-orange-600 transition whitespace-nowrap"
            >
              APPLY FILTERS
            </button>

            <button
              onClick={clearFilters}
              className="bg-gray-100 text-gray-800 rounded-md text-sm px-3 py-2 border hover:bg-gray-200 transition"
            >
              CLEAR
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              name="perPage"
              value={filters.perPage}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="10">10 / page</option>
              <option value="25">25 / page</option>
              <option value="50">50 / page</option>
              <option value="100">100 / page</option>
            </select>

            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="ahrefs">Sort by Ahrefs</option>
              <option value="price">Sort by Price</option>
              <option value="da">Sort by DA</option>
              <option value="dr">Sort by DR</option>
            </select>

            <button
              onClick={() => {
                // Example: Bulk search flow (open modal / navigate / send file)
                console.log("Bulk search pressed");
              }}
              className="bg-blue-600 text-white rounded-md text-sm px-3 py-2 font-semibold hover:bg-blue-700 transition"
            >
              BULK SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* PACKAGES GRID (your existing grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-lg border shadow-md flex flex-col justify-between relative ${
              plan.highlight ? "bg-blue-50 border-blue-400" : "bg-white border-orange-400"
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                Popular
              </div>
            )}

            <div className="p-6 text-center">
              <h3 className="text-xl font-bold">{plan.title}</h3>
              <h2 className="text-3xl font-bold mt-2">{plan.price}</h2>
              <p className="text-gray-600 text-sm mt-1">{plan.subtitle}</p>
            </div>

            <ul className="px-6 pb-6 space-y-2 text-gray-700 text-sm flex-1">
              {plan.features?.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <FaCheckCircle className="mt-1" />
                  <span className="ml-2">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="p-6">
              <Link
                href="#"
                className={`block w-full text-center py-2 rounded font-semibold hover:text-white border transition ${
                  plan.highlight ? "text-blue-600 border-blue-600 hover:bg-blue-700" : "text-orange-400 border-orange-400 hover:bg-orange-400"
                }`}
              >
                BUY NOW
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
