"use server";

import { db } from "@/lib/prisma";
import { removeCpfPunctuation } from "@/utils/cpf";
import { ConsumptionMethod } from "@prisma/client";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    priceInCents: productsWithPrices.find((p) => p.id === product.id)!
      .priceInCents,
  }));
  await db.order.create({
    data: {
      status: "PEDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      totalInCents: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.priceInCents * product.quantity,
        0,
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
};
