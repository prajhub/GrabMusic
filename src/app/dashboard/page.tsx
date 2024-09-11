"use client";

import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const expiresIn = searchParams.get("expires_in");

  return (
    <div>
      <p>
        hi {expiresIn} {refreshToken}
      </p>
    </div>
  );
}
