"use client";

import React from "react";
import ProfileDropdown from "./Profile-dropdown";

import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./Searchbar";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className=" bg-[#ffffff] w-full flex relative justify-between items-center text-black mx-auto px-8 h-20">
      <h1
        onClick={() => {
          router.push("/");
        }}
        className=" font-semibold hover:cursor-pointer text-3xl tracking-tight"
      >
        GrabMusic
      </h1>
      <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
        <SearchBar />
      </div>
      <div className="flex-initial">
        <div className="flex justify-end items-center relative">
          <div className="flex mr-4 items-center"></div>

          <div className="block">
            <div className="inline relative">
              <ProfileDropdown />
            </div>
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
