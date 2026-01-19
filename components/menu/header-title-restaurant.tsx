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
    <div className="bg-white relative z-50 mt-[-25] rounded-t-2xl">
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
        {/* titulo e desc */}
        <div className="flex flex-col justify-center px-3">
          <h1 className="text-lg font-semibold">{restaurant.name}</h1>
          <div className="text-xs text-gray-400">{restaurant.description}</div>
        </div>
        {/*  avaliacao */}
        <div className="flex items-center justify-center gap-x-1 rounded-lg border border-gray-300 bg-white">
          <div className="text-yellow-500">
            <Star className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="text-sm text-black">5.0</div>
        </div>
        {/* fim header abaixo */}
      </div>

      {/* Status Aberto/Fechado */}
      <div className="flex items-center gap-x-2 px-5 text-green-500 text-xs">
        <Clock className="h-4 w-4" /> Aberto
      </div>
    </div>
  );
}
