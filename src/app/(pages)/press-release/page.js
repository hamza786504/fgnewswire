import React from 'react';
import Link from 'next/link';
import PlanCard from '../Componenets/PlanCard';

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

async function AllPackagesPage() {
  const allPackages = await getPackages();




  return (
    <section className='py-16 m-1 p-2 md:m-3 min-h-screen rounded-3xl bg-no-repeat'
      style={{
        backgroundImage: "url(https://cdn.prod.website-files.com/66e3cafc52638c58d5c746f1/66e7afd9c7a18dc168eb399f_Subtract.webp), url(https://cdn.prod.website-files.com/66e3cafc52638c58d5c746f1/66e7afd9f2c0f73944a569cd_gradient-bottom.webp), url(https://cdn.prod.website-files.com/66e3cafc52638c58d5c746f1/66e7afd977d7d990d1f43a84_gradient-top.webp), url(https://cdn.prod.website-files.com/66e3cafc52638c58d5c746f1/66e788fe3d7856003f3a3df9_home_grid.svg), linear-gradient(180deg, #004cd3, #a8d0f3 76%, #a8d0f3)",
        backgroundSize: "contain, cover, cover, contain, auto"
      }}
    >
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto">
        <h1 className="text-center text-2xl md:text-5xl mt-4 font-semibold text-white">
          Choose Your Package
        </h1>
        <p className="text-sm md:text-base text-center max-w-4xl text-white mx-auto mt-5">
          Pick a plan that works best for you. We offer clear pricing with no hidden fees.
        </p>

        <div className="mt-7 grid grid-cols-3 space-y-5">
          {/* Client component for tabs */}
          {allPackages.filter(p => p.type === "press_release").map((plan, idx) => <PlanCard plan={plan} idx={idx} />)}
        </div>
      </div>
    </section>
  );
}

export default AllPackagesPage;