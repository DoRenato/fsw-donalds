import { CartContext, CartProduct } from "@/app/[slug]/menu/contexts/cart";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { convertCentsInRealBRL } from "@/utils/convert-cents-in-real";
import { useContext } from "react";

interface CartItemProps {
  item: CartProduct;
}

export default function CartItem({ item }: CartItemProps) {
  const{decreaseProductQuantity, increaseProductQuantity, removeProduct} = useContext(CartContext)
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
            onClick={()=>decreaseProductQuantity(item.id)}
            className="w-6 h-6"  
          >
            <ChevronLeft />
          </Button>
          <span className="w-4 text-center">{item.quantity}</span>
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={()=>increaseProductQuantity(item.id)}
            className="w-6 h-6"  
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div>
        <Button onClick={()=>removeProduct(item.id)} variant={"outline"} className="rounded-full h-4 w-4 border-0">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
