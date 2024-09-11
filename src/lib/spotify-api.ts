"use client";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
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
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
    localStorage.setItem("expires_in", data.expiresIn);
    console.log("Data stored in local storage.");
  } else {
    console.log("error");
  }
};
