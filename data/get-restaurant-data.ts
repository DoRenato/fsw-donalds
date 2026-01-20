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
    }
  }); // poderia ser findFirst se não fosse um campo unique
  return restaurant;
};

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({ where: { id: id } }); // poderia ser findFirst se não fosse um campo unique
  return product;
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
