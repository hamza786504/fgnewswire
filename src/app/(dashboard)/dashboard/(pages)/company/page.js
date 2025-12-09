import CompaniesTable from "./CompaniesTable";

async function getCompanies() {
  try {
    const res = await fetch("https://api.glassworld06.com/api/companies", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch companies");

    const data = await res.json();
    // API might return data in data property or directly as array
    return data.data || data || [];
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return [];
  }
}

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return <CompaniesTable initialCompanies={companies} />;
}