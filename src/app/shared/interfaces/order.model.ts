import { IOrderQuery } from './order.query';

export class Order {
  name: string;
  client: string;
  status: string;
  date: Date;
  price: number;

  constructor(orderQuery: IOrderQuery) {
    this.client = orderQuery.client;
    this.status = orderQuery.status;
    this.date = orderQuery.date;
    this.price = orderQuery.price;
  }
}
