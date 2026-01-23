import { Restaurant } from "@prisma/client";
import { Clock, Star } from "lucide-react";
import Image from "next/image";

interface RestaurantCategoriesProps {
  restaurant: Restaurant;
}

export default function RestaurantTitle({
  restaurant,
}: RestaurantCategoriesProps) {
  return (
    <div className="relative z-50 mt-[-25] rounded-t-2xl bg-white">
      {/* header */}
      <div className="flex px-5 pb-3 pt-5">
        {/* logo */}
        <div>
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
          />
        </div>
        <div className="flex w-full justify-between">
          {/* titulo e desc */}
          <div className="flex flex-col justify-center px-3">
            <h1 className="text-lg font-semibold">{restaurant.name}</h1>
            <div className="text-xs text-gray-400">
              {restaurant.description}
            </div>
          </div>
          {/*  avaliacao */}
          <div className="flex items-center justify-center gap-x-1">
            <div className="text-yellow-500">
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-sm text-black">5.0</div>
          </div>
        </div>
        {/* fim header abaixo */}
      </div>

      {/* Status Aberto/Fechado */}
      <div className="flex items-center gap-x-2 px-5 text-xs text-green-500">
        <Clock className="h-4 w-4" /> Aberto
      </div>
    </div>
  );
}
