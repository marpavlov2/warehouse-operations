import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OrderService } from 'src/app/orders/services/order.service';
import { Order } from '../../interfaces/order.query';

@Injectable()
export class OrderResolver implements Resolve<Order | null> {
  constructor(private _router: Router, private _orderService: OrderService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<Order | null> {
    const orderId = route.params['id'];
    const order = await this._orderService.getOrder(orderId);

    if (!order) {
      this._router.navigate(['orders']);
      return null;
    }

    return order;
  }
}
