import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SpinnerOne } from "@/components/ui/spinner";

const SuccessLoginClient = dynamic(() => import("./SuccessClient"), {
  ssr: false,
});

export default function SuccessLoginPage() {
  return (
    <Suspense fallback={<SpinnerOne />}>
      <SuccessLoginClient />
    </Suspense>
  );
}
