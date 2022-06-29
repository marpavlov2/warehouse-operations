import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Injectable()
export class OrdersListResolver implements Resolve<Order[]> {
  constructor(private _orderService: OrderService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return await this._orderService.getOrders();
  }
}
