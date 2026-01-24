import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { db } from "@/lib/prisma";
import { MapPinned, Utensils } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const restaurants = await db.restaurant.findMany();
  return (
    <main className="bg-gray-300">
      <div className="md:max-w-106.25 container mx-auto min-h-dvh bg-white">
        <div className="flex w-full flex-col items-center justify-center gap-2 bg-red-600 px-5 pb-6 pt-10">
          <Utensils className="h-12 w-12 text-white" />
          <h1 className="py-5 pb-10 text-center text-2xl font-semibold text-white">
            Sistema de Self Antedimento
          </h1>
        </div>
        <div className="relative z-50 mt-[-25] flex flex-col rounded-t-xl bg-white px-5">
          <h1 className="py-5 text-lg font-semibold">Escolha o Restaurante</h1>
          <div className="flex flex-col gap-5">
            {restaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className="mx-auto w-full max-w-sm border-gray-300"
              >
                <CardHeader>
                  <CardTitle>{restaurant.name}</CardTitle>
                  <CardDescription>{restaurant.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <MapPinned className="h-7 w-7" />
                  <p>
                    Rua Lorem ipsum dolor 19, sit amet consectetur, adipisicing
                    elit.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/${restaurant.slug}`} className="w-full">
                    <Button size="sm" className="w-full">
                      Ver Cardápio
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
