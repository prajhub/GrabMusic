import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SpinnerOne } from "@/components/ui/spinner";

const PlaylistDetailsClient = dynamic(() => import("./PlaylistClient"), {
  ssr: false,
});

export default function PlaylistDetails() {
  return (
    <Suspense fallback={<SpinnerOne />}>
      <PlaylistDetailsClient />
    </Suspense>
  );
}
