"use client";

import { useEffect } from "react";
import { Button } from "@/src/app/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen">
      <div className="m-auto justify-center text-center">
        <h1 className="inline-block text-[24px] font-medium leading-[90px] mr-[20px] pr-[23px] border-r-1 border-opacity-30">
          500
        </h1>
        <div className="inline-block text-[14px] font-normal place-items-center">
          Something went wrong!
          <Button className="mt-2" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
