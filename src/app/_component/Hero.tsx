"use client";

import { getUserProfile, refreshAccessToken } from "@/lib/spotify-api";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return <div>Hero</div>;
}
