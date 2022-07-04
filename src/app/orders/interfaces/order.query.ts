import { Product } from './product.query';

export interface Order {
  orderId: string;
  name: string;
  client: string;
  status: string;
  date: string;
  price: number;
  products: Product[];
}
