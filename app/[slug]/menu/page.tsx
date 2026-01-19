import RestaurantCategories from "@/components/menu/categories";
import RestaurantHeader from "@/components/menu/header";
import RestaurantTitle from "@/components/menu/header-title-restaurant";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { notFound } from "next/navigation";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

export default async function RestaurantMenuPage({
  params,
  searchParams,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await getRestaurantBySlug(slug);
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="container mx-auto lg:border">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantTitle restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
