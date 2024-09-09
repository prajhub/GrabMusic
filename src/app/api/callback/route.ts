import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = "http://localhost:3000/api/callback";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect("/?error=state_mismatch");
  }

  // Base64 encode the client id and client secret
  const encodedCredentials = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString("base64");

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenResponse.json();

  if (tokenResponse.ok) {
    const { access_token, refresh_token, expires_in } = data;

    // Now you can use the access_token to fetch data from Spotify API
    // You can also store the access_token, refresh_token, and expires_in in a session or cookie
    return NextResponse.json({
      access_token,
      refresh_token,
      expires_in,
    });
  } else {
    // Handle error
    return NextResponse.json({
      error: data.error,
      error_description: data.error_description,
    });
  }
}
