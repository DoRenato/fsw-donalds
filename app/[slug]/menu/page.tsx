import RestaurantCategories from "@/components/menu/categories";
import RestaurantHeader from "@/components/menu/header";
import RestaurantTitle from "@/components/menu/header-title-restaurant";
import { getRestaurantBySlug } from "@/data/get-restaurant-data";
import { isConsumptionMethodValid } from "@/utils/is-comsumption-method-valid";
import { notFound } from "next/navigation";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

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
    <div className="pb-15 container mx-auto lg:border">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantTitle restaurant={restaurant} />
      <RestaurantCategories
        restaurant={restaurant}
        consumptionMethod={consumptionMethod}
      />
    </div>
  );
}
