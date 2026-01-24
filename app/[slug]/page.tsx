import ConsumptionMethodOptions from "@/components/restaurant-page/consumption-method-options";
import { Button } from "@/components/ui/button";
import { getRestaurantBySlug } from "@/data/get-restaurant-data";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ConsumptionMethodPage({
  params,
}: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <>
      <main className="py-25 container mx-auto flex min-h-dvh flex-col bg-white">
        <div className="absolute top-5 z-50 flex px-5">
          <Link href={"/"}>
            <Button
              variant={"secondary"}
              size={"icon"}
              className="rounded-full bg-gray-200 p-6"
            >
              <ChevronLeftIcon />
            </Button>
          </Link>
        </div>
        {/* Logo e Título */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.description}
            width={100}
            height={100}
          />
          <h1 className="font-semibold">{restaurant.name}</h1>
        </div>

        {/* Boas vindas e texto */}
        <div className="pt-15 flex flex-col items-center">
          <h1 className="text-2xl">Seja Bem-Vindo!</h1>
          <span className="px-5 py-2 text-center text-gray-400">
            Escolha como prefere aproveitar sua refeição. Estamos oferecer
            praticidade e sabor em cada detalhe!
          </span>
        </div>

        {/* Imagens para escolha do usuario */}
        <div className="grid grid-cols-2 pt-20">
          <ConsumptionMethodOptions
            imageUrl="/images/dinin.png"
            imageAlt="Para comer aqui."
            buttonText="Para comer aqui"
            slug={restaurant.slug}
            option="DINE_IN"
          />
          <ConsumptionMethodOptions
            imageUrl="/images/takeaway.png"
            imageAlt="Para levar."
            buttonText="Para levar"
            slug={restaurant.slug}
            option="TAKEAWAY"
          />
        </div>
      </main>
    </>
  );
}
