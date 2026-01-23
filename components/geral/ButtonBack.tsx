"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import clsx from "clsx";

interface BackButtonProps {
  type?: "1" | "2";
}

export default function ButtonBack({type="1"}:BackButtonProps) {
  const router = useRouter();
  return (
    <div>
      <Button
        variant={"secondary"}
        size={"icon"}
        onClick={() => router.back()}
        className={clsx(
            "rounded-full",
            {
                "absolute left-4 top-4 z-50 bg-white": type === "1",
                "bg-gray-200 p-6": type === "2",
            }
        )}
        // className="absolute left-4 top-4 z-50 rounded-full bg-white"
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
}

