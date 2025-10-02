"use client";

import { useEffect, useState } from "react";

const FILTERS = ["All", "Africa", "Asia", "Europe", "North America", "South America", "Oceania"];

export default function CountriesSection() {
  const [countries, setCountries] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // Fetch countries from API
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        // Format countries to include relevant fields
        const formatted = data.map((c) => ({
          name: c.name.common,
          flag: c.flags.png,
          continent: c.region,
        }));
        setCountries(formatted);
      });
  }, []);

  // Filter countries based on active tab
  const filteredCountries =
    activeFilter === "All"
      ? countries
      : countries.filter((c) => c.continent === activeFilter);

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Traffic Websites <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">by Country</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Browse traffic websites by country to find high-quality guest posting opportunities in your target markets.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 border-b pb-4">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeFilter === filter
                ? "text-white bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCountries.map((country, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded-sm" />
            <span className="text-sm font-medium">{country.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
