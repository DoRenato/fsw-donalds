"use client";

import { Button } from "@/components/ui/button";
import { Product, Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductImageHeaderProps {
  product: Pick<Product, "name" | "imageUrl">; // Só chama essas propriedades ao inves de todas
}

export default function ProductImageHeader({ product }: ProductImageHeaderProps) {
  const router = useRouter();
  return (
    <div className="relative inline-block"> {/* inline block serve para quando tem botoes dentro de uma imagem */}
      <div className="bg-gray-200 p-5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={415}
          height={415}
          className="aspect-square object-cover"
        />
      </div>
      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute left-4 top-4 z-50 rounded-full bg-white"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Link href={"/orders"}>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="absolute right-4 top-4 z-50 rounded-full bg-white"
        >
          <ScrollTextIcon />
        </Button>
      </Link>
    </div>
  );
}
