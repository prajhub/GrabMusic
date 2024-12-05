"use client";

import { fetchPlaylist } from "@/lib/spotify-api";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SpinnerTwo } from "@/components/ui/spinner";
import Image from "next/image";
import { Search, Music } from "lucide-react";
import { Playlist } from "@/lib/util";

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const results = searchParams.get("query");

  const { data, isLoading } = useQuery({
    queryKey: ["playlist", results], // Cache by playlist and query
    queryFn: () => fetchPlaylist(results || ""),
    enabled: !!results,
  });

  const filteredPlaylists = data?.playlists?.items?.filter(
    (playlist: Playlist) => playlist !== null
  );

  useEffect(() => {
    if (filteredPlaylists) {
      filteredPlaylists.forEach((playlist: Playlist) => {
        if (playlist.id) {
          router.prefetch(`/playlist?id=${playlist.id}`);
        }
      });
    }
  }, [data, router]);

  const pushSinglePlaylist = (playlistId: string) => {
    router.push(`/playlist?id=${playlistId}`);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerTwo />
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold mb-6 tracking-normal flex items-center">
          <Search className="mr-2" />
          Search
          <span className="text-[#aa69ff] font-extrabold ml-1">Results</span>
        </h1>

        {filteredPlaylists?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlaylists.map((playlist: Playlist) => {
              if (!playlist || !playlist.name) {
                return null; // Or render a placeholder component here
              }
              return (
                <div
                  onClick={() => pushSinglePlaylist(playlist.id)}
                  key={playlist.id}
                  className="bg-[#d8d4d4] p-4 rounded-lg hover:bg-[#b4b2b2] hover:cursor-pointer transition-colors"
                >
                  <div className="relative w-full pt-[100%] mb-4">
                    <Image
                      src={playlist.images?.[0]?.url || "/default-image.png"} // Default image if no image available
                      alt={playlist.name}
                      layout="fill"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <h2 className="font-semibold text-md mb-1 truncate">
                    {playlist.name || "Unknown Playlist"}
                  </h2>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {playlist.description || "No description available."}
                  </p>
                  <div className="flex items-center text-lg font-semibold text-gray-500">
                    <Music className="w-4 h-4 mr-1" />
                    {playlist.tracks.total} tracks
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No playlists found.</p>
        )}
      </div>
    </div>
  );
}
