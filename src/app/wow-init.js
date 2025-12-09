// app/wow-init.js

"use client";

import { useEffect } from "react";

export default function WOWInit() {
  useEffect(() => {
    if (typeof window !== "undefined" && "WOW" in window) {
      new window.WOW().init();
    }
  }, []);

  return null;
}
