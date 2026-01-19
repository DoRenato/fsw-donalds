"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MenuCategory, Prisma } from "@prisma/client";
import { useState } from "react";
import ProductMenuRestaurant from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: {
          products: true;
        };
      };
    };
  }>; // Só chama essas propriedades ao inves de todas
}

type menuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

export default function RestaurantCategories({
  restaurant,
}: RestaurantCategoriesProps) {
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
      <ProductMenuRestaurant products={selectedCategory.products} />
    </div>
  );
}
