"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">; // Só chama essas propriedades ao inves de todas
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  const router = useRouter();
  return (
    <div className="relative inline-block">
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        width={720}
        height={480}
      />
      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute top-4 left-4 z-50 rounded-full bg-white"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute top-4 right-4 z-50 rounded-full bg-white"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
