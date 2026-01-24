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
    <main className="container mx-auto bg-white min-h-dvh">
      <HeaderOrdersButtons />
      <ListOrders />
      {orderScreen()}
    </main>
  );
}
