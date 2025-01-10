import { requiredUser } from "@/hooks/requiredUser";

const OrdersPage = async () => {
  await requiredUser();

  return <div>order page</div>;
};
export default OrdersPage;
