import ListOrders from "@/components/orders/find-orders-by-cpf-dialog";
import HeaderOrdersButtons from "@/components/orders/header-orders";

export default function Orders() {
  return (
    <main className="container mx-auto">
        <HeaderOrdersButtons />
        <ListOrders />
    </main>
  );
}
