import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SpinnerOne } from "@/components/ui/spinner";

const SearchClient = dynamic(() => import("./SearchClient"), {
  ssr: false,
});

export default function PlaylistDetails() {
  return (
    <Suspense fallback={<SpinnerOne />}>
      <SearchClient />
    </Suspense>
  );
}
