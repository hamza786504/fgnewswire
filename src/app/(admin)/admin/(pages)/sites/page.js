// /sites/page.js
import GuestSitesTable from "./GuestSitesTable";

async function getGuestSites() {
  try {
    const res = await fetch("https://api.glassworld06.com/api/guest-posting-sites", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch guest posting sites");

    const data = await res.json();
    console.log(data);
    
    return data;
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return {
      data: [],
      total_sites: 0,
      total_pages: 1,
      current_page: 1,
      prev_page: null,
      next_page: null
    };
  }
}

export default async function GuestSitesPage() {
  const apiResponse = await getGuestSites();

  return <GuestSitesTable initialData={apiResponse} />;
}