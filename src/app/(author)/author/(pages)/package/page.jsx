import PackagesTable from "./PackageTable";

async function getPackages() {
  try {
    const res = await fetch("https://api.glassworld06.com/api/packages", {
      cache: "no-store",  // IMPORTANT for SSR fresh data
    });

    if (!res.ok) throw new Error("Failed to fetch packages");

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return [];
  }
}

export default async function PackagesPage() {
  const packages = await getPackages();

  return <PackagesTable initialPackages={packages} />;
}
