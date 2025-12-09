"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { SidebarProvider } from "../../context/SidebarContext";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");

    if (!token || !expiry || Date.now() > parseInt(expiry)) {
      router.replace("/admin/signin");
    } else {
      setIsAuthenticated(true);
    }

    // ✅ Mark check complete so render can proceed
    setIsAuthChecked(true);
  }, [router]);



  // 🚫 Not authenticated — don't render anything
  if (!isAuthenticated) return null;

  // ✅ Authenticated — render the full dashboard
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
          defer
        ></script>
      </head>
      <body className="antialiased">
        <SidebarProvider>
          <div className="bg-white h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="mt-3 rounded-l-4xl flex-1 flex flex-col overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">{children}</div>
                <Footer />
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
