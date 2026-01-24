import ListOrders from "@/components/orders/find-orders-by-cpf-dialog";
import HeaderOrdersButtons from "@/components/orders/header-orders";
import ShowOrder from "@/components/orders/ShowOrder";
import { getOrdersByCpf } from "@/data/get-restaurant-data";

interface OrdersProps {
  searchParams: Promise<{ cpf: string }>;
}

export default async function Orders({ searchParams }: OrdersProps) {
  const { cpf } = await searchParams;
  const orders = await getOrdersByCpf(cpf);
  const orderScreen = () => {
    if (!cpf) {
      return (
        <div className="p-5">Digite seu CPF para listar os pedidos aqui</div>
      );
    }
    if (orders.length === 0) {
      return <div className="p-5">Ainda não há pedidos neste CPF.</div>;
    } else {
      return <ShowOrder orders={orders} />;
    }
  };
  return (
    <div className="bg-gray-300">
      <main className="md:max-w-106.25 bg-white min-h-dvh mx-auto">
      <HeaderOrdersButtons />
      <ListOrders />
      {orderScreen()}
    </main>
    </div>
  );
}
