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
  SheetTrigger,
} from "../ui/sheet";
import { useContext } from "react";
import CartItem from "../cart/cart-item";
import { ScrollArea } from "../ui/scroll-area";

export default function CartSheet() {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
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
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
