import { Product } from "@prisma/client";
import { ChefHat } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useContext } from "react";
import { CartContext } from "@/app/[slug]/menu/contexts/cart";
import CartSheet from "../menu/cart-sheet";

interface ProductDetailsProps {
  product: Product;
  quantity: number;
}

export default function ProductDetails({
  product,
  quantity,
}: ProductDetailsProps) {
  const { isOpen, toggleCart, addProduct } = useContext(CartContext);
  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity: quantity,
    });
    toggleCart();
  };
  return (
    <div>
      <div className="flex h-dvh flex-col px-5">
        <ScrollArea className="min-h-0 flex-1">
          <h2 className="pb-1 text-sm font-semibold">Sobre</h2>
          <div className="pb-6 text-sm text-gray-400">
            {product.description}
          </div>
          <div className="flex gap-x-2">
            <div>
              <ChefHat className="h-5 w-5" />
            </div>
            <h2 className="pb-2 text-sm font-semibold">Ingredientes</h2>
          </div>
          <ul className="pb-160 list-disc text-sm text-gray-400">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient} className="pl-2 pr-5">
                - {ingredient}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      <div className="min-w-106.25 fixed bottom-0 z-50 border-t border-gray-200 bg-white">
        <div className="max-w-106.25 p-5">
          <Button onClick={handleAddToCart} className="w-full rounded-full">
            Adicionar à Sacola
          </Button>
        </div>
      </div>
      <CartSheet />
    </div>
  );
}
