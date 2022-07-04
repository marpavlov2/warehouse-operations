import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from 'src/app/orders/services/order.service';
import { Order } from '../../interfaces/order.query';

@Injectable()
export class OrdersListResolver implements Resolve<Order[]> {
  constructor(private _orderService: OrderService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return await this._orderService.getOrders();
  }
}
