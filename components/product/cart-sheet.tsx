import { CartContext } from "@/app/[slug]/menu/contexts/cart";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useContext } from "react";
import CartItem from "../cart/cart-item";
import { ScrollArea } from "../ui/scroll-area";
import { convertCentsInRealBRL } from "@/utils/convert-cents-in-real";
import FinishOrderDisplay from "../cart/finish-order-display";

export default function CartSheet() {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-90">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
          <SheetDescription>
            <ScrollArea>
              {products.map((product) => (
                <h1 key={product.id}>
                  <CartItem item={product} />
                </h1>
              ))}
            </ScrollArea>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="pb-8">
          <div className="flex flex-col gap-7 pb-10">
            <div className="flex justify-between px-5">
              <span className="text-sm font-light text-gray-500">Subtotal</span>
              <span className="text-sm">{convertCentsInRealBRL(total)}</span>
            </div>
            <div className="flex justify-between px-5">
              <span className="text-sm font-light text-gray-500">Descontos</span>
              <span className="text-sm">R$ 0,00</span>
            </div>
            <h2 className="flex justify-between px-5">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{convertCentsInRealBRL(total)}</span>
            </h2>
          </div>
          <FinishOrderDisplay>Finalizar Pedido</FinishOrderDisplay>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
