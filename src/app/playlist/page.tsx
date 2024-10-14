import { Suspense } from "react";
import dynamic from "next/dynamic";

const PlaylistDetailsClient = dynamic(() => import("./PlaylistClient"), {
  ssr: false,
});

function Loading() {
  return <div className="text-white">Loading...</div>;
}

export default function PlaylistDetails() {
  return (
    <Suspense fallback={<Loading />}>
      <PlaylistDetailsClient />
    </Suspense>
  );
}
