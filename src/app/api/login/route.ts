import { generateRandomString } from "@/lib/util";
import { NextResponse } from "next/server";

const CLIENTID = process.env.CLIENT_ID;

const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:3000/api/callback";

export async function GET() {
  console.log("starting to auth");
  try {
    const state = generateRandomString(16);
    const scope =
      "user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read user-read-recently-played ";

    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENTID!,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    });

    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

    return NextResponse.redirect(spotifyAuthUrl);
  } catch (error) {
    console.log(error);
  }
}
