"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Disc } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  getUserProfile,
  getUserTopItems,
  getUserRecentlyPlayed,
} from "@/lib/spotify-api";
import { Artist, recentlyPlayedTrack } from "@/lib/util";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
  });

  const { data: topArtists, isLoading: isLoadingTopArtists } = useQuery({
    queryKey: ["userTopArtists"],
    queryFn: getUserTopItems,
  });

  if (isLoadingTopArtists) {
    <div>Loading...</div>;
  }

  const { data: recentlyPlayed } = useQuery({
    queryKey: ["userRecentlyPlayed"],
    queryFn: getUserRecentlyPlayed,
  });

  return (
    <div className="bg-white text-black min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="relative w-32 h-32 rounded-full bg-white flex items-center justify-center">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={data?.images?.[0]?.url}
                alt={data?.display_name}
              />
              <AvatarFallback>{data?.display_name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          {data ? (
            <div className="ml-8">
              <h1 className="text-4xl font-bold">{data?.display_name}</h1>
              <div className="flex mt-2 space-x-4 text-gray-400">
                <span>{data?.followers?.total} Followers</span>

                <span>{data?.playlists?.total} Playlists</span>
              </div>
            </div>
          ) : (
            <div>Loading....</div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-[#5d2c53] p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <span className="mr-2 tracking-wider "> Top Artists</span>
              </h2>
            </div>
            <div className="flex justify-between items-start">
              {topArtists?.items?.map((item: Artist) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center w-1/4 px-2"
                >
                  <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-2">
                    {item.images?.[2] ? (
                      <Image
                        src={item.images[0].url}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="absolute top-0 left-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-center font-medium mt-2 truncate w-full">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Disc className="mr-2" /> Recently Played
            </h2>
            <ul className="space-y-2">
              {recentlyPlayed?.items.map((item: recentlyPlayedTrack) => (
                <li key={item.track.id} className="flex items-center">
                  <div className="w-10 h-10 mr-3 relative">
                    <Image
                      src={item.track.album.images[0]?.url}
                      alt={`${item.track.name} album cover`}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.track.name}</p>
                    <p className="text-sm text-gray-400">
                      {item.track.artists[0].name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
