import { Prisma } from "@prisma/client";


// Não está em uso
export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    restaurant: {
      select: {
        name: true;
        avatarImageUrl: true;
      };
    };
    orderProducts: {
      select: {
        quantity: true;
        priceInCents: true;
        id: true;
        product: {
          select: {
            id: true;
            name: true;
            priceInCents: true;
          };
        };
      };
    };
  };
}>;
