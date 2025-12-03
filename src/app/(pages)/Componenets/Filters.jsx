"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaSearch } from "react-icons/fa";

// Data for the publications table
const publicationsData = [
  { url: "https://www.forbes.com/", da: "95", tat: "3-5 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.inc.com/", da: "95", tat: "3-5 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.bloomberg.com/", da: "94", tat: "2-3 weeks", linkType: "No Follow", sponsored: "Press Release" },
  { url: "https://www.usatoday.com/", da: "94", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://finance.yahoo.com/", da: "93", tat: "2-3 weeks", linkType: "No Follow", sponsored: "Press Release" },
  { url: "https://www.chicagotribune.com/", da: "93", tat: "2-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://nl.mashable.com/", da: "93", tat: "2-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.sfgate.com/", da: "93", tat: "2-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
  { url: "https://www.nydailynews.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.mercurynews.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.chron.com/", da: "92", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
  { url: "http://eonline.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://venturebeat.com/", da: "92", tat: "3-5 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "http://billboard.com/", da: "92", tat: "3-5 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.nasdaq.com/", da: "91", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.makeuseof.com/", da: "91", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.ibtimes.com/", da: "91", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.makeuseof.com/", da: "91", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.washingtontimes.com/", da: "90", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
  { url: "https://www.miamiherald.com/", da: "90", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.azcentral.com/", da: "90", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
  { url: "https://www.inquirer.net/", da: "89", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://dailycaller.com/", da: "89", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.dallasnews.com/", da: "89", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.digitaljournal.com/", da: "88", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.benzinga.com/", da: "87", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.maxim.com/", da: "87", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
  { url: "https://www.villagevoice.com/", da: "85", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://www.techtimes.com/", da: "84", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://hackernoon.com/", da: "84", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.mensjournal.com/", da: "82", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
  { url: "https://goodmenproject.com/", da: "82", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes / No" },
  { url: "https://www.intouchweekly.com/", da: "82", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.sfexaminer.com/", da: "80", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.lifeandstylemag.com/", da: "80", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://okmagazine.com/", da: "80", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.tmcnet.com/", da: "80", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.closerweekly.com/", da: "78", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.laweekly.com/", da: "77", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://hauteliving.com/", da: "73", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
  { url: "https://www.sfweekly.com/", da: "73", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.financemagnates.com/", da: "71", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.bbntimes.com/", da: "71", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
  { url: "https://www.geekextreme.com/", da: "70", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://techbullion.com/", da: "61", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "UK Magazines", da: "DA", tat: "Cost", linkType: "Link Type", sponsored: "Sponsored" },
  { url: "https://www.mirror.co.uk/", da: "94", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://www.dailymail.co.uk/", da: "94", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.express.co.uk/", da: "93", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://metro.co.uk/", da: "93", tat: "2-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://www.dailystar.co.uk/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://www.ibtimes.co.uk/", da: "90", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.manchestereveningnews.co.uk/", da: "90", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.walesonline.co.uk/", da: "89", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.liverpoolecho.co.uk/", da: "88", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.birminghammail.co.uk/", da: "87", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.dailyrecord.co.uk/", da: "85", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "https://www.thisismoney.co.uk/", da: "81", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
  { url: "https://www.femalefirst.co.uk/", da: "78", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.deadlinenews.co.uk/", da: "75", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.bristolpost.co.uk/", da: "80", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
  { url: "Other Magazines", da: "DA", tat: "Cost", linkType: "Link Type", sponsored: "Sponsored" },
  { url: "http://africa.businessinsider.com/", da: "94", tat: "2-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.entrepreneur.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.entrepreneur.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.jpost.com/", da: "91", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
  { url: "https://www.timesofisrael.com/", da: "91", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
  { url: "https://www.livemint.com/", da: "91", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://guardian.ng/", da: "87", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
  { url: "https://www.khaleejtimes.com/", da: "86", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://www.arabianbusiness.com/", da: "84", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://gulfbusiness.com/", da: "72", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
  { url: "https://www.forbesmiddleeast.com/", da: "72", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
  { url: "https://www.ibtimes.sg/", da: "70", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
];


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
            className={`rounded-lg border shadow-md flex flex-col justify-between relative ${plan.highlight ? "bg-blue-50 border-blue-400" : "bg-white border-orange-400"
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
                className={`block w-full text-center py-2 rounded font-semibold hover:text-white border transition ${plan.highlight ? "text-blue-600 border-blue-600 hover:bg-blue-700" : "text-orange-400 border-orange-400 hover:bg-orange-400"
                  }`}
              >
                BUY NOW
              </Link>
            </div>
          </div>
        ))}
      </div>



      {/* Publications Table */}
      <section className="mb-16 overflow-x-auto">
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <table className="overflow-x-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-700 text-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  US Magazines
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  DA
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Cost
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  TAT
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Link Type
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Sponsored
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {publicationsData.map((pub, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {pub.url.includes('http') ? (
                      <span className="text-blue-600 hover:text-purple-700 hover:underline transition-colors">
                        {pub.url}
                      </span>
                    ) : (
                      <span className="font-bold text-purple-700">{pub.url}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pub.da}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="https://worldwidebacklink.spp.io/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-purple-700 hover:underline transition-colors">
                      Contact Us!
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pub.tat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pub.linkType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pub.sponsored}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Link href={"/guest-posting-package/da50"}className="uppercase w-full bg-gradient-to-r from-blue-400 to-purple-600 
                hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm 
                font-semibold text-white transition-all duration-300 shadow-lg 
                hover:shadow-xl transform hover:-translate-y-1">
                      Buy Now
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex my-10 items-center justify-center">
          <Link href="/signin" className="hidden md:inline-flex ml-6 hover:bg-transparent bg-[#163316] justify-center uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform">VIEW ALL PUBLICATIONS</Link>
        </div>
      </section>
    </div>
  );
}
