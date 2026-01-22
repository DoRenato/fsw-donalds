"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      {" "}
      {/* inline block serve para quando tem botoes dentro de uma imagem */}
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        width={720}
        height={480}
      />
      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute left-4 top-4 z-50 rounded-full bg-white"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Link href={"/orders"}>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="absolute right-4 top-4 z-50 rounded-full bg-white"
        >
          <ScrollTextIcon />
        </Button>
      </Link>
    </div>
  );
}
