"use client";

import Image from "next/image";
import { refreshAccessToken } from "@/lib/spotify-api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return <div>Hi</div>;
}
