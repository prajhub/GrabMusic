"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get("focus") === "search" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const spotifyUrlPattern =
      /https:\/\/open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/;

    const match = searchQuery.match(spotifyUrlPattern);
    if (match && match[1]) {
      const playlistId = match[1];
      router.push(`/playlist?id=${playlistId}`);
    } else if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-96">
      {" "}
      <Input
        type="text"
        ref={searchInputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Paste playlist link or search..."
        className="pl-12 pr-4 py-3 text-black bg-[#f1f3f5] border-none rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-[#1db954]" // Spotify style
      />
      <SearchIcon className="absolute left-4 top-1.5 h-6 w-6 text-gray-500" />{" "}
      {/* Larger search icon */}
    </form>
  );
};

export default SearchBar;
