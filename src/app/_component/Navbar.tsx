"use client";

import { SpinnerOne } from "@/components/ui/spinner";

import React from "react";
import ProfileDropdown from "./Profile-dropdown";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getUserProfile } from "@/lib/spotify-api";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./Searchbar";

const Navbar = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  const handleLogin = () => {
    router.push("/api/login");
  };

  useEffect(() => {
    setIsClient(true);
    refetch();
  }, []);

  const {
    data: userProfile,
    refetch,
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
    enabled: true,
    staleTime: isClient ? 1000 * 60 * 5 : 0,
  });

  const isLoggedIn = Boolean(userProfile);
  return (
    <nav className="bg-[#ffffff] w-full flex relative justify-between items-center text-black mx-auto px-8 h-20">
      <h1
        onClick={() => router.push("/")}
        className="font-semibold hover:cursor-pointer text-3xl tracking-tight"
      >
        GrabMusic
      </h1>

      {/* Show SearchBar only if user is logged in */}
      {isLoggedIn && (
        <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
          <SearchBar />
        </div>
      )}

      <div className="flex-initial">
        <div className="flex justify-end items-center relative">
          <div className="flex mr-4 items-center"></div>

          <div className="block">
            {isLoading ? (
              <SpinnerOne />
            ) : !isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="tracking-wide bg-[#9a58df] hover:bg-[#8544c5] text-md font-medium text-white py-2 px-8 rounded-full"
              >
                Sign In
              </button>
            ) : (
              <ProfileDropdown
                userProfile={userProfile}
                refetchUserProfile={refetch}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

export function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname === "/success-login") {
    return null;
  }

  return <Navbar />;
}
