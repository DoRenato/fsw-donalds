"use client";
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<
  Product,
  "id" | "name" | "priceInCents" | "imageUrl"
> {
  quantity: number;
}

// esse I é de Interface
export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    setProducts(prevProducts => {
      return prevProducts.map(prevProduct => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct
      });
    });
  };
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <CartContext.Provider
      value={{
        isOpen: isOpen,
        products: products,
        toggleCart: toggleCart,
        addProduct: addProduct,
      }}
    >
      {children}
      {/* Esse children serão os componentes que terao acesso ao contexto */}
    </CartContext.Provider>
  );
};
