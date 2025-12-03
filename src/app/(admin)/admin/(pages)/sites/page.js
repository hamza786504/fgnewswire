import GuestSitesTable from "./GuestSitesTable";

async function getGuestSites() {
  try {
    const res = await fetch("https://api.glassworld06.com/api/guest-posting-sites", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch guest posting sites");

    const data = await res.json();
    return data?.data || []; // because it's paginated
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return [];
  }
}

export default async function GuestSitesPage() {
  const sites = await getGuestSites();

  return <GuestSitesTable initialSites={sites} />;
}
