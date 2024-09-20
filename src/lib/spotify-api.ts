"use client";

export const getUserProfile = async () => {
  const accessToken = localStorage.getItem("access_token");
  const res = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (res.ok) {
    console.log(data.display_name);
    return data;
  } else {
    console.log("Error retrieving user profile.");
    return null;
  }
};

export const refreshAccessToken = async () => {
  if (typeof window === "undefined") {
    console.error("Cannot access localStorage on the server side.");
    return;
  }

  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    console.error("No refresh token found in localStorage.");
    return;
  }

  const res = await fetch("/api/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("expires_in", data.expires_in);
    console.log("Data stored in local storage.");
  } else {
    console.log("Error refreshing access token.");
  }
};
