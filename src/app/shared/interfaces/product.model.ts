import { ProductQuery } from './product.query';

export class Product {
  id: string;
  name: string;
  description: string;
  isSelected?: boolean;

  constructor(orderQuery: ProductQuery) {
    this.name = orderQuery.id;
    this.name = orderQuery.name;
    this.description = orderQuery.description;
  }
}
