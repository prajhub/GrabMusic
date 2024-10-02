"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchSinglePlaylist } from "@/lib/spotify-api";
import Image from "next/image";
import { SpinnerOne } from "@/components/ui/spinner";
import CreatePlaylist from "../_component/CreatePlaylist";
export default function PlaylistDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singlePlaylist", id], // Cache by playlist and query
    queryFn: () => fetchSinglePlaylist(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SpinnerOne />
      </div>
    );
  }

  const existingTracks = data?.tracks.items;

  if (isError || !data) {
    return <p>Error retrieving playlist</p>;
  }
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-black to-gray-900 min-h-screen text-white px-4">
      <div className="mt-10 flex items-center">
        <div className="relative w-64 h-64 shadow-xl">
          <Image
            src={data.images[0]?.url || "/default_playlist.jpg"}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="ml-8">
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <p className="mt-2 text-xl text-gray-400">{data.description}</p>
          <p className="mt-4 text-lg text-gray-500">
            Created by {data.owner.display_name}
          </p>
          <p className="mt-2 text-lg text-gray-500">
            {data.followers.total} followers
          </p>
          <CreatePlaylist existingTracks={existingTracks} />
        </div>
      </div>

      <div className="mt-12 w-full">
        <h2 className="text-2xl font-semibold">Tracks</h2>
        <ul className="mt-4 space-y-4">
          {data.tracks.items.map((track: any, index: number) => (
            <li
              key={track.track.id}
              className="bg-gray-800 p-4 rounded-md flex items-center justify-between hover:bg-gray-700 transition"
            >
              <div className="flex items-center">
                <span className="text-gray-400 text-lg mr-4">{index + 1}</span>
                <div className="flex flex-col">
                  <span className="text-white">{track.track.name}</span>
                  <span className="text-gray-400">
                    {track.track.artists
                      .map((artist: any) => artist.name)
                      .join(", ")}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-gray-400">{track.track.duration_ms}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
