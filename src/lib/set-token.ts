"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useSetToken() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const expiresIn = searchParams.get("expires_in");

    if (accessToken && refreshToken && expiresIn) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("expires_in", expiresIn);

      console.log("Stored access token:", localStorage.getItem("access_token"));
      console.log(
        "Stored refresh token:",
        localStorage.getItem("refresh_token")
      );
    } else {
      console.error("Failed to retrieve tokens from URL");
    }
  }, [searchParams]);
}
