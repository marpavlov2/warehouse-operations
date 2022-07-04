import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.model';
import { OrderService } from 'src/app/orders/services/order.service';

@Injectable()
export class OrderResolver implements Resolve<Order> {
  constructor(private _orderService: OrderService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<Order> {
    const orderId = route.params['id'];

    return await this._orderService.getOrder(orderId);
  }
}
