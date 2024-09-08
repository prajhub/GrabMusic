import { generateRandomString } from "@/lib/util";
import { NextResponse } from "next/server";

const CLIENTID = process.env.CLIENT_ID;

const REDIRECTURI = "http://localhost:3000/";

export async function GET() {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENTID!,
    scope: scope,
    redirect_uri: REDIRECTURI,
    state: state,
  });

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(spotifyAuthUrl);
}
