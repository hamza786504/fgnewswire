"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCheckCircle, FaSearch } from "react-icons/fa";

export default function PackagesWithAllFilters({ plans = [] }) {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    niches: [],
    languages: [],
    countries: [],
    linkTypes: [],
    sponsors: [],
  });

  // Initial filters state
  const [filters, setFilters] = useState({
    website_url: "",
    niche: "",
    language: "",
    country: "",
    sports_allowed: "",
    sponsored: "",
    indexed: "",
    do_follow: "",
    pharmacy_allowed: "",
    crypto_allowed: "",
    foreign_lang_allowed: "",
    link_type: "",
    link_validity: "",
    price_min: "",
    price_max: "",
    da_min: "",
    da_max: "",
    dr_min: "",
    dr_max: "",
    perPage: "25",
    sortBy: "da_desc",
    searchText: "",
  });

  // Fetch sites with filters
  const fetchSites = async (filterParams = {}) => {
    try {
      setIsLoading(true);
      
      // Build query string from filters
      const queryParams = new URLSearchParams();
      
      // Add all active filters
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          if (key === "searchText" && value.trim() !== "") {
            // Search can be implemented differently or with API support
            // For now, we'll handle search client-side
          } else {
            queryParams.append(key, value);
          }
        }
      });

      // Add pagination and sorting
      if (filterParams.perPage) queryParams.append("per_page", filterParams.perPage);
      if (filterParams.sortBy) {
        const [sortField, sortOrder] = filterParams.sortBy.split("_");
        queryParams.append("sort_by", sortField);
        queryParams.append("sort_order", sortOrder);
      }

      const queryString = queryParams.toString();
      const url = queryString 
        ? `https://api.glassworld06.com/api/guest-posting-sites?${queryString}`
        : `https://api.glassworld06.com/api/guest-posting-sites`;

      console.log("Fetching from:", url);
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch sites: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Transform API data to match your table structure
      const transformedSites = Array.isArray(data) 
        ? data.map(transformSiteData) 
        : (Array.isArray(data.data) ? data.data.map(transformSiteData) : []);
      
      setSites(transformedSites);
      
      // Extract filter options from sites data
      extractFilterOptions(transformedSites);
      
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Transform site data for table display
  const transformSiteData = (site) => {
    // Parse metrics if it's a string
    let metrics = {};
    if (site.metrics && typeof site.metrics === 'string') {
      try {
        metrics = JSON.parse(site.metrics);
      } catch (e) {
        console.error('Error parsing metrics:', e);
      }
    } else if (site.metrics) {
      metrics = site.metrics;
    }
    
    return {
      id: site.id,
      website_url: site.website_url || "",
      slug: site.slug || site.id,
      publication: site.publication || site.website_url || "Unknown Publication",
      da: metrics.da || 0,
      dr: metrics.dr || 0,
      price: site.price ? `$${site.price}` : "Contact Us!",
      tat: "1-3 weeks", // Default, you can add this field to your API
      link_type: site.link_type || "N/A",
      sponsored: site.sponsored ? "Yes" : "No",
      niche: site.niche || "",
      language: site.language || "",
      country: site.country || "",
      sports_allowed: site.sports_allowed || false,
      indexed: site.indexed || false,
      do_follow: site.do_follow || false,
      pharmacy_allowed: site.pharmacy_allowed || false,
      crypto_allowed: site.crypto_allowed || false,
      foreign_lang_allowed: site.foreign_lang_allowed || false,
      link_validity: site.link_validity || "",
      // Store original for filtering
      original: site
    };
  };

  // Extract unique values for filter dropdowns
  const extractFilterOptions = (sitesData) => {
    const niches = new Set();
    const languages = new Set();
    const countries = new Set();
    const linkTypes = new Set();
    
    sitesData.forEach(site => {
      if (site.niche) niches.add(site.niche);
      if (site.language) languages.add(site.language);
      if (site.country) countries.add(site.country);
      if (site.link_type && site.link_type !== "N/A") linkTypes.add(site.link_type);
    });
    
    setFilterOptions({
      niches: Array.from(niches).sort(),
      languages: Array.from(languages).sort(),
      countries: Array.from(countries).sort(),
      linkTypes: Array.from(linkTypes).sort(),
      sponsors: ["Yes", "No"]
    });
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchSites();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    // Create a clean filters object for API call
    const apiFilters = { ...filters };
    
    // Remove empty values
    Object.keys(apiFilters).forEach(key => {
      if (apiFilters[key] === "" || apiFilters[key] === null || apiFilters[key] === undefined) {
        delete apiFilters[key];
      }
    });
    
    // Remove client-side only filters
    delete apiFilters.searchText;
    delete apiFilters.perPage;
    delete apiFilters.sortBy;
    
    console.log("Applying filters to API:", apiFilters);
    fetchSites(apiFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      website_url: "",
      niche: "",
      language: "",
      country: "",
      sports_allowed: "",
      sponsored: "",
      indexed: "",
      do_follow: "",
      pharmacy_allowed: "",
      crypto_allowed: "",
      foreign_lang_allowed: "",
      link_type: "",
      link_validity: "",
      price_min: "",
      price_max: "",
      da_min: "",
      da_max: "",
      dr_min: "",
      dr_max: "",
      perPage: "25",
      sortBy: "da_desc",
      searchText: "",
    };
    
    setFilters(clearedFilters);
    fetchSites(); // Fetch without filters
  };

  // Apply search filter client-side (or you can implement server-side search)
  const filteredSites = sites.filter(site => {
    if (!filters.searchText) return true;
    
    const searchLower = filters.searchText.toLowerCase();
    return (
      site.website_url?.toLowerCase().includes(searchLower) ||
      site.publication?.toLowerCase().includes(searchLower) ||
      site.niche?.toLowerCase().includes(searchLower) ||
      site.language?.toLowerCase().includes(searchLower) ||
      site.country?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full px-4 md:px-8 py-6">
      {/* FILTER CARD */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        {/* Filters container: mobile => horizontal scroll, md+ => wrap */}
        <div className="flex gap-2 overflow-x-auto md:overflow-visible md:flex-wrap py-2">
          {/* Niche Filter - Dynamic */}
          <select
            name="niche"
            value={filters.niche}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">All Niches</option>
            {filterOptions.niches.map((niche, index) => (
              <option key={index} value={niche}>
                {niche}
              </option>
            ))}
          </select>

          {/* Language Filter - Dynamic */}
          <select
            name="language"
            value={filters.language}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Languages</option>
            {filterOptions.languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>

          {/* Country Filter - Dynamic */}
          <select
            name="country"
            value={filters.country}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Countries</option>
            {filterOptions.countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Link Type Filter - Dynamic */}
          <select
            name="link_type"
            value={filters.link_type}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Link Types</option>
            {filterOptions.linkTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Sponsored Filter */}
          <select
            name="sponsored"
            value={filters.sponsored}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Sponsored?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* Do Follow Filter */}
          <select
            name="do_follow"
            value={filters.do_follow}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Do Follow?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* Sports Allowed Filter */}
          <select
            name="sports_allowed"
            value={filters.sports_allowed}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Sports Allowed?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* Pharmacy Allowed Filter */}
          <select
            name="pharmacy_allowed"
            value={filters.pharmacy_allowed}
            onChange={handleChange}
            className="min-w-[160px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Pharmacy Allowed?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* Crypto Allowed Filter */}
          <select
            name="crypto_allowed"
            value={filters.crypto_allowed}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Crypto Allowed?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* Foreign Language Allowed Filter */}
          <select
            name="foreign_lang_allowed"
            value={filters.foreign_lang_allowed}
            onChange={handleChange}
            className="min-w-[180px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Foreign Language Allowed?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* Indexed Filter */}
          <select
            name="indexed"
            value={filters.indexed}
            onChange={handleChange}
            className="min-w-[140px] md:w-auto border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Indexed?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* DA Range Filter */}
          <div className="flex gap-1 min-w-[200px]">
            <input
              type="number"
              name="da_min"
              value={filters.da_min}
              onChange={handleChange}
              placeholder="DA Min"
              className="w-1/2 border rounded-md px-2 py-2 text-sm"
              min="0"
              max="100"
            />
            <input
              type="number"
              name="da_max"
              value={filters.da_max}
              onChange={handleChange}
              placeholder="DA Max"
              className="w-1/2 border rounded-md px-2 py-2 text-sm"
              min="0"
              max="100"
            />
          </div>

          {/* DR Range Filter */}
          <div className="flex gap-1 min-w-[200px]">
            <input
              type="number"
              name="dr_min"
              value={filters.dr_min}
              onChange={handleChange}
              placeholder="DR Min"
              className="w-1/2 border rounded-md px-2 py-2 text-sm"
              min="0"
              max="100"
            />
            <input
              type="number"
              name="dr_max"
              value={filters.dr_max}
              onChange={handleChange}
              placeholder="DR Max"
              className="w-1/2 border rounded-md px-2 py-2 text-sm"
              min="0"
              max="100"
            />
          </div>

          {/* Price Range Filter */}
          <div className="flex gap-1 min-w-[220px]">
            <input
              type="number"
              name="price_min"
              value={filters.price_min}
              onChange={handleChange}
              placeholder="Min Price"
              className="w-1/2 border rounded-md px-2 py-2 text-sm"
              min="0"
            />
            <input
              type="number"
              name="price_max"
              value={filters.price_max}
              onChange={handleChange}
              placeholder="Max Price"
              className="w-1/2 border rounded-md px-2 py-2 text-sm"
              min="0"
            />
          </div>
        </div>

        {/* Actions: search, bulk, perPage, sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 mt-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="relative w-full">
              <input
                name="searchText"
                value={filters.searchText}
                onChange={handleChange}
                placeholder="Search by Website URL, Publication, Niche..."
                className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
            </div>

            <button
              onClick={applyFilters}
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
              <option value="da_desc">DA (High to Low)</option>
              <option value="da_asc">DA (Low to High)</option>
              <option value="dr_desc">DR (High to Low)</option>
              <option value="dr_asc">DR (Low to High)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* PACKAGES GRID (your existing grid - optional) */}
      {plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading guest posting sites...</p>
        </div>
      ) : (
        /* Publications Table */
        <section className="mb-16 overflow-x-auto">
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-700 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Website / Publication
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSites.length > 0 ? (
                  filteredSites.map((site, index) => (
                    <tr key={site.id} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className="text-blue-600 hover:text-purple-700 hover:underline transition-colors">
                          {site.publication}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {site.da || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {site.price === 'Contact Us!' ? (
                          <a 
                            href="https://worldwidebacklink.spp.io/dashboard" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-purple-700 hover:underline transition-colors"
                          >
                            {site.price}
                          </a>
                        ) : (
                          <span>{site.price}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {site.tat}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {site.link_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {site.sponsored}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link 
                          href={`/sites/${site.slug}`}
                          className="inline-block uppercase bg-gradient-to-r from-blue-400 to-purple-600 
                            hover:from-blue-500 hover:to-purple-700 px-4 py-2 rounded-full text-xs 
                            font-semibold text-white transition-all duration-300 shadow-lg 
                            hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Buy Now
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No guest posting sites found. Please try different filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* View All Publications Button */}
          <div className="flex my-10 items-center justify-center">
            <Link 
              href="/signin" 
              className="hidden md:inline-flex ml-6 hover:bg-transparent bg-[#163316] justify-center uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform"
            >
              VIEW ALL PUBLICATIONS
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}