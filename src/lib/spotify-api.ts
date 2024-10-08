"use client";

export const getUserProfile = async () => {
  console.log("Starting to get user profile");
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
    return null;
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

export const fetchSinglePlaylist = async (playlistId: string) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
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
    return new Error("Error retrieving playlist.");
  }
};

export const createPlaylist = async (
  name: string,
  user_id: string,
  description: string
) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const res = await fetch(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to create playlist. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};

export const addTracksToPlaylist = async (
  playlistId: string,
  trackUris: string[]
) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
          position: 0,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to add tracks to playlist");
    }

    return await res.json();
  } catch (error) {
    console.error("Error adding tracks to playlist:", error);
    throw error;
  }
};
