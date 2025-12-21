import PrTypesTable from "./PrTypesTable";

async function getPrTypes() {
  try {
    const res = await fetch("https://api.glassworld06.com/api/pr-types", {
      cache: "no-store",
      headers: {
        "Content-Type" : "application/json"
      },
    });

    if (!res.ok) throw new Error("Failed to fetch PR Types");

    return await res.json();
  } catch (err) {
    console.error("SSR Fetch Error:", err);
    return [];
  }
}

export default async function PrTypesPage() {
  const prTypes = await getPrTypes();
  return <PrTypesTable initialPrTypes={prTypes} />;
}
