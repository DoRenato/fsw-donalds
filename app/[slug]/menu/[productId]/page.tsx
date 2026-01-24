import ProductHeader from "@/components/product/image-header-with-buttons";
import ProductTextHeader from "@/components/product/product-title-header";
import { getProductById } from "@/data/get-restaurant-data";
import { isConsumptionMethodValid } from "@/utils/is-comsumption-method-valid";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
  searchParams: Promise<{
    consumptionMethod: string;
  }>;
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { productId, slug } = await params;
  const product = await getProductById(productId);
  const { consumptionMethod } = await searchParams;
  if (
    !isConsumptionMethodValid(consumptionMethod) ||
    !product ||
    product.restaurant.slug.toLowerCase() !== slug.toLowerCase()
  ) {
    return notFound();
  }
  return (
    <div className="bg-gray-300">
      <main className="md:max-w-106.25 mx-auto max-h-dvh min-h-dvh overflow-hidden">
        <ProductHeader product={product} />
        <ProductTextHeader product={product} />
      </main>
    </div>
  );
}
