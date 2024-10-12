"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Hero() {
  const router = useRouter();

  const handleStartNowClick = () => {
    router.push("/?focus=search");
  };
  return (
    <div className="min-h-[700px] flex flex-col justify-center items-center overflow-hidden mx-auto bg-[#ec4b60] max-w-full px-4 sm:px-6 lg:px-8 text-center">
      <p className="mx-auto max-w-1xl text-lg tracking-tight text-white">
        Welcome to
        <span className="border-b pl-2 border-dotted text-white border-slate-300">
          Grab Music
        </span>
      </p>

      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        <span className="inline-block mr-2 text-white">
          Your
          <span className="relative whitespace-nowrap text-blue-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
              preserveAspectRatio="none"
            >
              <path d="..."></path>
            </svg>
            <span className="relative  text-white">Personal</span>
          </span>
        </span>
        <span className="inline-block text-white">Playlist Grabber</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        <span className="inline-block text-white tracking-wide">
          Copy other&apos;s playlist
        </span>
        <span className="inline-block pl-1 text-white tracking-wide">
          into your own.
        </span>
      </p>

      <div className="mt-10 flex flex-col justify-center gap-y-5 sm:flex-row sm:gap-y-0 sm:gap-x-6">
        <div
          className="relative flex flex-1 flex-col items-stretch sm:flex-none"
          data-headlessui-state=""
        >
          <Button
            onClick={handleStartNowClick}
            className="bg-[#44183b] tracking-wide hover:bg-[#2f0a26] text-lg text-white py-5 rounded-full px-8"
          >
            Start Now&nbsp;
          </Button>
        </div>
      </div>
    </div>
  );
}
