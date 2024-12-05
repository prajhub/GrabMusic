"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Hero() {
  const router = useRouter();

  const handleStartNowClick = () => {
    router.push("/?focus=search");
  };
  return (
    <div className="min-h-[700px] flex flex-col justify-center items-center overflow-hidden mx-auto bg-[#ffffff] max-w-full px-4 sm:px-6 lg:px-8 text-center">
      {/* Updated Heading */}
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-semibold tracking-tight text-slate-900 sm:text-7xl">
        <span className="inline-block text-black">
          An
          <span className="relative whitespace-nowrap text-blue-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
              preserveAspectRatio="none"
            >
              <path d="..."></path>
            </svg>
            <span className="relative text-black"> app </span>
          </span>
          to help you
        </span>
        <span className="inline-block text-[#aa69ff]">
          copy other's playlist
        </span>
        <span className="inline-block text-black">and make it own.</span>
      </h1>

      {/* Updated Subtext */}
      <p className="mx-auto mt-6 max-w-2xl text-md font-medium tracking-tight text-slate-400">
        Easily clone your favorite playlists in just a{" "}
        <span className="text-[#aa69ff]">few clicks.</span>
      </p>

      <div className="mt-10 flex flex-col justify-center gap-y-5 sm:flex-row sm:gap-y-0 sm:gap-x-6">
        <div
          className="relative flex flex-1 flex-col items-stretch sm:flex-none"
          data-headlessui-state=""
        >
          <Button
            onClick={handleStartNowClick}
            className="bg-[#9a58df] hover:bg-[#8544c5] text-white font-medium py-2 px-4 rounded-full animate-pulse"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
