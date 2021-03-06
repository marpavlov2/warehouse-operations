import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Order } from '../../interfaces/order.query';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductsListResolver implements Resolve<Order[]> {
  constructor(private _productService: ProductService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return await this._productService.getProducts();
  }
}
