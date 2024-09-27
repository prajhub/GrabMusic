"use client";

import { fetchPlaylist } from "@/lib/spotify-api";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { SpinnerTwo } from "@/components/ui/spinner";
import Image from "next/image";
import { Search, Music } from "lucide-react";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const results = searchParams.get("query");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["playlist", results], // Cache by playlist and query
    queryFn: () => fetchPlaylist(results || ""),
    enabled: !!results,
  });

  console.log(data);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerTwo />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Search className="mr-2" /> Search Results for query
        </h1>

        {data?.playlists?.items?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.playlists.items.map((playlist: any) => (
              <div
                key={playlist.id}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="relative w-full pt-[100%] mb-4">
                  <Image
                    src={playlist.images[0]?.url || "/api/placeholder/300/300"}
                    alt={playlist.name}
                    layout="fill"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h2 className="font-semibold text-lg mb-1 truncate">
                  {playlist.name}
                </h2>
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                  {playlist.description || "No description available."}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Music className="w-4 h-4 mr-1" />
                  {playlist.tracks.total} tracks
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No playlists found.</p>
        )}
      </div>
    </div>
  );
}
