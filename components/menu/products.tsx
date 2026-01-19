import { convertCentsInRealBRL } from "@/utils/convert-cents-in-real";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductMenuRestaurantProps {
  products: Product[];
}

export default function ProductMenuRestaurant({
  products,
}: ProductMenuRestaurantProps) {
  return (
    <div className="px-1">
      {products.map((product, indice) => {
        return (
          <div key={product.id} className="pt-5">
            <Link href={"#"} className="flex justify-between items-center border border-gray-300 p-4 rounded-xl">
              <div className="max-w-65 flex flex-col gap-2">
                <h1>{product.name}</h1>
                <span className="line-clamp-3 text-sm text-gray-400">
                  {product.description}
                </span>
                <h1 className="font-semibold">{convertCentsInRealBRL(product.priceInCents)}</h1>
              </div>
              <div className="">
                <Image
                  src={product.imageUrl}
                  alt={""}
                  width={100}
                  height={100}
                  className="aspect-square object-cover rounded-lg bg-gray-200"
                />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
