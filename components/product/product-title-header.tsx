"use client";
import { convertCentsInRealBRL } from "@/utils/convert-cents-in-real";
import { Prisma } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

interface ProductTextHeaderProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

export default function ProductTextHeader({ product }: ProductTextHeaderProps) {
  const preco = convertCentsInRealBRL(product.priceInCents);
  const [quantity, setQuantity] = useState<number>(1);
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
    <div className="relative z-50 mt-[-25] rounded-t-2xl bg-white">
      {/* header */}
      <div className="flex flex-col px-5 pb-3 pt-5">
        {/* Logo e nome do restaurante */}
        <div className="flex items-center gap-2 pb-1">
          <div>
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={18}
              height={18}
              className="rounded-full"
            />
          </div>
          <div className="text-sm opacity-30">{product.restaurant.name}</div>
        </div>

        {/* Titulo */}
        <h1 className="pb-5 font-semibold">{product.name}</h1>

        {/* Preço e quantidade */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{preco}</h1>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"} size={"icon"} onClick={handleDecreaseQuantity}>
              <ChevronLeft />
            </Button>
            <span className="w-4 text-center">{quantity}</span>
            <Button variant={"destructive"} size={"icon"} onClick={handleIncreaseQuantity}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
