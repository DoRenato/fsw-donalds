"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import ProductMenuRestaurant from "./products";
import { useContext } from "react";
import { CartContext } from "@/app/[slug]/menu/contexts/cart";
import { convertCentsInRealBRL } from "@/utils/convert-cents-in-real";
import CartSheet from "../product/cart-sheet";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: {
          products: true;
        };
      };
    };
  }>;
  consumptionMethod: string;
}

type menuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

export default function RestaurantCategories({
  restaurant,
  consumptionMethod,
}: RestaurantCategoriesProps) {
  const { products, total, totalQuantity, toggleCart } =
    useContext(CartContext);
  const [selectedCategory, setSelectedCategory] =
    useState<menuCategoriesWithProducts>(restaurant.menuCategories[0]);
  const handlerCategoryClick = (category: menuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };
  return (
    <div className="pt-5">
      <ScrollArea className="w-full">
        <div className="flex gap-x-4 p-5">
          {restaurant.menuCategories.map((category, indice) => {
            return (
              <div key={category.id}>
                <Button
                  onClick={() => handlerCategoryClick(category)}
                  variant={
                    selectedCategory.id === category.id
                      ? "default"
                      : "secondary"
                  }
                  size={"sm"}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {/* Titulo da categoria */}
      <h1 className="text-md px-5 font-semibold">{selectedCategory.name}</h1>

      {/* Produtos */}
      <ProductMenuRestaurant
        consumptionMethod={consumptionMethod}
        slug={restaurant.slug}
        products={selectedCategory.products}
      />
      {products.length > 0 && (
        <div className="md:md:max-w-106.25 fixed bottom-0 flex w-full justify-between border border-gray-200 bg-white pb-5 pt-5">
          <div className="flex flex-col px-5">
            <p className="text-sm text-gray-400">Total dos pedidos</p>
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                {convertCentsInRealBRL(total)}
              </span>
              <span className="text-xs text-gray-400">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </div>
          </div>
          <div className="px-5">
            <Button onClick={toggleCart} className="rounded-lg p-6">
              Ver Sacola
            </Button>
          </div>
          <CartSheet />
        </div>
      )}
    </div>
  );
}
