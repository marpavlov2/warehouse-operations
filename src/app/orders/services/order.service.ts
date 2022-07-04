// src/app/services/order.service.ts

import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import {
  doc,
  setDoc,
  increment,
  updateDoc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
  deleteDoc,
} from 'firebase/firestore';
import { Order } from '../interfaces/order.model';
import { OrderQuery } from '../interfaces/order.query';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class OrderService {
  constructor(private _firestore: Firestore, private _toastr: ToastrService) {}

  async getOrders(): Promise<Order[] | void> {
    try {
      const ordersRef = await getDocs(collection(this._firestore, 'orders'));
      const orders: Order[] = ordersRef.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as OrderQuery
      );

      return orders;
    } catch (error) {
      this._toastr.error('Failed to fetch orders.');
    }
  }

  async getOrder(orderId: string): Promise<Order | void> {
    try {
      const ordersRef = doc(this._firestore, 'orders', orderId);
      const orderDocSnap = await getDoc(ordersRef);
      const order = orderDocSnap.data() as Order;
      return order;
    } catch (error) {
      this._toastr.error('Update order failed.');
    }
  }

  async updateOrder(orderId: string, order: Order): Promise<boolean | void> {
    try {
      const ordersRef = doc(this._firestore, 'orders', String(orderId));
      await updateDoc(ordersRef, {
        name: order.name,
        client: order.client,
        price: order.price,
        products: order.products,
        status: order.status,
      });

      this._toastr.success('Order updated.');

      return true;
    } catch (error) {
      this._toastr.error('Update order failed.');
    }
  }

  async deleteOrder(orderId: string) {
    try {
      await deleteDoc(doc(this._firestore, 'orders', orderId));

      this._toastr.success('Order deleted.');
      return true;
    } catch (error) {
      this._toastr.error('Order deletion failed.');
      return false;
    }
  }

  async createOrder(order: Order): Promise<Order | void> {
    const ordersRef = doc(this._firestore, 'customIds', 'nextOrderId');
    const ordersDocSnap = await getDoc(ordersRef);

    if (ordersDocSnap.exists()) {
      const data = ordersDocSnap.data();
      order.orderId = String(data['id']);

      try {
        await setDoc(doc(this._firestore, 'orders', order.orderId), {
          ...order,
        });

        await updateDoc(ordersRef, {
          id: increment(1),
        });

        this._toastr.success('Order created.');

        return order;
      } catch (error) {
        /* window.alert(error.message); */
      }
    } else {
      console.log('No such document! customIds collection does not exist!');
    }
  }
}
