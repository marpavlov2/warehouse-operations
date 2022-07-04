import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../../interfaces/product.query';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductsListResolver implements Resolve<Product[] | void> {
  constructor(private _productService: ProductService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<Product[] | void> {
    return await this._productService.getProducts();
  }
}
