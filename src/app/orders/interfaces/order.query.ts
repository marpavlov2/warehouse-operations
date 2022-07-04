export interface OrderQuery {
  orderId: string;
  name: string;
  client: string;
  status: string;
  date: string;
  price: number;
  products: string[];
}
