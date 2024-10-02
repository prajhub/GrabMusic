import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SpinnerOne } from "@/components/ui/spinner";

const SuccessClient = dynamic(() => import("./SuccessClient"), {
  ssr: false,
});

export default function PlaylistDetails() {
  return (
    <Suspense fallback={<SpinnerOne />}>
      <SuccessClient />
    </Suspense>
  );
}
