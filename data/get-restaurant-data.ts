import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: slug },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  }); // poderia ser findFirst se não fosse um campo unique
  return restaurant;
};

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id: id },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });
  return product;
};

export const getOrdersByCpf = async (customerCpf: string) => {
  const order = await db.order.findMany({
    where: { customerCpf: customerCpf },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        select: {
          id: true,
          quantity: true,
          priceInCents: true,
          product: {
            select: {
              name: true,
              priceInCents: true,
            },
          },
        },
      },
    },
  });
  return order;
};

// export const getRestaurantBySlug = async (slug: string) => {
//   const restaurant = await db.restaurant.findUnique({ where: { slug: slug } }); // poderia ser findFirst se não fosse um campo unique
//   return restaurant;
// };

// export async function getCategoriesByRestaurantId(restaurantId: string) {
//   return db.menuCategory.findMany({
//     where: { restaurantId },
//     orderBy: { name: "asc" },
//   })
// }

// export async function getProductsByCategoryId(categoryId: string) {
//   return db.product.findMany({
//     where: { menuCategoryId: categoryId },
//     orderBy: { name: "asc" },
//   })
// }
