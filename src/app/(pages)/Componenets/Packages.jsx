// Remove "use client" - this makes it a server component
import React from "react";
import Link from "next/link";
import ClientSlider from "./ClientSlider"; // Create a separate client component for the slider

// This runs on the server
async function getPackages() {
  try {
    const response = await fetch('https://api.glassworld06.com/api/packages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // This works in server components
    });

    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }

    const data = await response.json();
    return data.data || data || [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

// Server Component
export default async function PricingSection() {
  const packages = await getPackages();

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-10 wow animate__animated animate__fadeInUp">
          Select a plan whenever you&apos;re ready
        </h1>

        <div className="relative px-6">
          {/* ClientSlider handles all interactive parts */}
          <ClientSlider packages={packages.filter(p => p.type === "press_release" && p.name.toLowerCase() === "basic" || p.name.toLowerCase() === "standard" || p.name.toLowerCase() === "premium")} />
          
          <div className="text-center">
            <Link
              href="/press-release"
              className="inline-block max-w-[220px] !mx-auto mt-7 text-center w-full bg-gradient-to-r from-blue-500 to-purple-700 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 