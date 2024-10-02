export function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

interface Image {
  height: number;
  width: number;
  url: string;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  popularity: number;
  images: Image[];

  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Album {
  available_markets: string[];
  album_type: string;
  id: string;
  name: string;
  images: Image[];
  release_date: string;
  href: string;
  external_urls: {
    spotify: string;
  };
}

interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

export interface recentlyPlayedTrack {
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  played_at: string; // ISO 8601 string
  track: {
    album: Album;
    artists: Artist[];
    id: string;
    name: string;
    popularity: number; // Assuming you have popularity
    uri: string;
    type: string; // Can be 'track'
  };
}

export interface TrackResponse {
  items: {
    track: Track;
  }[];
}

export interface Playlist {
  id: string;
  name: string;
  images: Image[];
  description: string;
  tracks: {
    total: number;
  };
}

export interface TopArtistsResponse {
  items: Artist[];
  total: number;
  limit: number;
  offset: number;
  href: string;
}
