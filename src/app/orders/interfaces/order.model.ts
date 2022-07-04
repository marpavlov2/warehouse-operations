import { OrderQuery } from './order.query';
import { Product } from './product.model';

export class Order {
  orderId: string;
  name: string;
  client: string;
  status: string;
  date: string;
  price: number;
  products: Product[];

  constructor(orderQuery: OrderQuery) {
    this.orderId = orderQuery.orderId;
    this.client = orderQuery.client;
    this.status = orderQuery.status;
    this.date = orderQuery.date;
    this.price = orderQuery.price;
    this.products = orderQuery.products;
  }
}
