"use client";

import React from "react";
import ProfileDropdown from "./Profile-dropdown";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
  return (
    <nav className=" bg-[#ec4b60] w-full flex relative justify-between items-center mx-auto px-8 h-20">
      <h1 className=" font-semibold text-3xl tracking-wide">GrabMusic</h1>
      <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
        <div className="inline-block">
          <div className="inline-flex items-center max-w-full">
            <button
              className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1"
              type="button"
            >
              <div className="block flex-grow flex-shrink overflow-hidden">
                Start your search
              </div>
              <div className="flex items-center justify-center relative  h-8 w-8 rounded-full">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  className="block h-3 w-3 fill-none stroke-current stroke-[5.33333] overflow-visible"
                >
                  <g fill="none">
                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-initial">
        <div className="flex justify-end items-center relative">
          <div className="flex mr-4 items-center">
            <div className="flex items-center relative ">
              <ModeToggle />
            </div>
          </div>

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
