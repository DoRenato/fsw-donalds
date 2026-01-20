import { CartProduct } from "@/app/[slug]/menu/contexts/cart";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { convertCentsInRealBRL } from "@/utils/convert-cents-in-real";
import { useState } from "react";

interface CartItemProps {
  item: CartProduct;
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 99) {
        return 99;
      }
      return prev + 1;
    });
  };
  return (
    <div className="flex items-center py-5">
      <div className="">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={120}
          height={120}
          className="aspect-square rounded-lg bg-gray-200 object-cover"
        />
      </div>
      <div className="flex flex-col px-2 w-full">
        <div className="line-clamp-1 text-xs">{item.name}</div>
        <div className="font-semibold text-black pb-3">
          {convertCentsInRealBRL(item.priceInCents)}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handleDecreaseQuantity}
            className="w-6 h-6"  
          >
            <ChevronLeft />
          </Button>
          <span className="w-4 text-center">{quantity}</span>
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={handleIncreaseQuantity}
            className="w-6 h-6"  
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div>
        <button className="rounded-full">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
