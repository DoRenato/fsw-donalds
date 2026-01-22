import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { convertCentsInRealBRL } from "@/utils/convert-cents-in-real";
import { Order } from "@prisma/client";

interface ShowOrderProps {
  orders: Order[];
}

export default function ShowOrder({ orders }: ShowOrderProps) {
  const statusPedido = (status: string) => {
    if (status === "PEDING") {
      return (
        <div className="rounded-full border-2 border-gray-600 px-2 py-1 text-sm text-gray-600">
          {status}
        </div>
      );
    } else {
      return (
        <div className="rounded-full border-2 border-green-600 px-2 py-1 text-sm text-green-600">
          {status}
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col">
      {orders.map((order) => (
        <div key={order.id}>
          <div className="pb-2">
            <Card className="mx-auto w-full max-w-sm border-gray-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Image
                    src={order.restaurant.avatarImageUrl}
                    alt={order.restaurant.name}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <CardTitle>{order.restaurant.name}</CardTitle>
                </div>
                <CardDescription className="flex gap-5">
                  <div>Nº Pedido: {order.numPedido}</div>
                  <div>Método: {order.consumptionMethod}</div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                {order.orderProducts.map((orderProduct) => (
                  <div
                    key={orderProduct.id}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm">{orderProduct.product.name}</span>
                    <span>x{orderProduct.quantity}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-between">
                <h2 className="font-semibold">
                  Total: {convertCentsInRealBRL(order.totalInCents)}
                </h2>
                <div>{statusPedido(order.status)}</div>
              </CardFooter>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
