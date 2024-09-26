"use client";

export const getUserProfile = async () => {
  console.log("Starting to get user profile");
  const accessToken = localStorage.getItem("access_token");
  console.log("Access token:", accessToken);
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

export function logOut() {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    //window.location.reload();
    console.log("Logged out.");
  } catch (error) {
    console.log("Error logging out:", error);
  }
}

//Getting user's details

export const getUserTopItems = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/artists?limit=4",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      console.log("Error retrieving user top artists.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user top artists:", error);
  }
};

export const getUserRecentlyPlayed = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      console.log("Error retrieving user recently played.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user recently played:", error);
  }
};

export const fetchPlaylist = async (query: string) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(
      `https://api.spotify.com/v1/search?type=playlist&offset=0&q=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      console.log("Error retrieving playlist.");
      return new Error("Error retrieving playlist.");
    }
  } catch (error) {
    console.error("Error retrieving playlist:", error);
  }
};
