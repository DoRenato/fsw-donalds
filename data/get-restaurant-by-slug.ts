import { db } from "@/lib/prisma"

export const getRestaurantBySlug = async (slug:string) => {
    const restaurant = await db.restaurant.findUnique({where:{slug:slug}}); // poderia ser findFirst se não fosse um campo unique
    return restaurant
}
