import CompaniesTable from "./CompaniesTable";

async function getCompanies() {
  try {
    // You cannot use localStorage in server components
    // Instead, you might need to pass the token from a parent component
    // or handle this differently
    
    // For now, we'll return empty array and let client component fetch
    return [];
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return [];
  }
}

export default async function CompaniesPage() {
  // Don't fetch on server since we need authentication
  const companies = await getCompanies();

  return <CompaniesTable initialCompanies={companies} />;
}