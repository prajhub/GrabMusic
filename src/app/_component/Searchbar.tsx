"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-96">
      {" "}
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for artists, songs, or podcasts"
        className="pl-12 pr-4 py-3 text-black bg-[#f1f3f5] border-none rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-[#1db954]" // Spotify style
      />
      <SearchIcon className="absolute left-4 top-1.5 h-6 w-6 text-gray-500" />{" "}
      {/* Larger search icon */}
    </form>
  );
};

export default SearchBar;
