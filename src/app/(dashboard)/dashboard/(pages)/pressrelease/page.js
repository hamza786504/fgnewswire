import PressReleasesTable from "./PressReleaseTable";

async function getPressReleases() {
  try {
    const res = await fetch("https://api.glassworld06.com/api/press-releases", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch press releases");

    const data = await res.json();
    return data.data || []; // Note: API returns data in data property
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return [];
  }
}

export default async function PressReleasesPage() {
  const pressReleases = await getPressReleases();

  return <PressReleasesTable initialPressReleases={pressReleases} />;
}