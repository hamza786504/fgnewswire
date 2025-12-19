"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // "checking" | "authenticated" | "unauthenticated"

  useEffect(() => {
    // 👇 Run immediately on mount before rendering
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");

    if (token && expiry && Date.now() < parseInt(expiry)) {
      // valid token — redirect instantly
      setStatus("authenticated");
      router.replace("/dashboard");
    } else {
      // not logged in — show sign-in
      setStatus("unauthenticated");
    }
  }, [router]);

  // ⏳ While checking, render *nothing* (no flash of sign-in)
  if (status === "checking") {
    return (
      <html lang="en">
        <body className="bg-white"></body>
      </html>
    );
  }

  // 🚫 Already authenticated — don't render form while redirecting
  if (status === "authenticated") return null;

  // ✅ Not logged in — show the actual sign-in page
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
