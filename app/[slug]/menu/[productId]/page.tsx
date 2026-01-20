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
  const { productId } =  await params;
  const product = await getProductById(productId);
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod) || !product) {
    return notFound();
  }
  return (
    <main className="container mx-auto">
      <ProductHeader product={product}/>
      <ProductTextHeader product={product}/>
    </main>
  );
}
