/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/MovingBorders";
import NextError from "next/error";

export default function Error({
  error,
  reset,
}: {
  error: any;
  reset: () => void;
}) {
  console.log(error);

  return (
    <div className="overflow-hidden content-center">
      <div className="h-[70vh] flex flex-col items-center justify-center mx-auto max-w-screen-md text-center">
        <NextError statusCode={500} title={error.message} />
        <Button onClick={() => reset()} className="px-8 py-6 text-lg">
          Try again
        </Button>
      </div>
    </div>
  );
}
