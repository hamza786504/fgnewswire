"use client";

import { useEffect, useState } from "react";
import PressReleaseTable from "./PressReleaseTable";

export default function PressReleasesPage() {
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPressReleases() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://api.glassworld06.com/api/press-releases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setPressReleases(data.data?.data || []);
      } catch (error) {
        console.error("Client Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPressReleases();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <PressReleaseTable initialPressReleases={pressReleases} />
  );
}