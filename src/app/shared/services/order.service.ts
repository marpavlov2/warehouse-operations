// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import {
  doc,
  setDoc,
  increment,
  updateDoc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { Order } from '../interfaces/order.model';

@Injectable()
export class OrderService {
  constructor(private _firestore: Firestore, private router: Router) {}

  async getOrders(): Promise<any> {
    const ordersRef = await getDocs(collection(this._firestore, 'orders'));
    const videos: Order[] = ordersRef.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Order
    );
    console.log(videos);
    return videos;

    /* const q = query(collection(this._firestore, 'orders'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
    });
    return true; */
  }

  async createOrder(order: Order) {
    const ordersRef = doc(this._firestore, 'customIds', 'nextOrderId');
    const ordersDocSnap = await getDoc(ordersRef);

    if (ordersDocSnap.exists()) {
      const data = ordersDocSnap.data();
      try {
        await setDoc(doc(this._firestore, 'orders', String(data['id'])), {
          ...order,
        });

        await updateDoc(ordersRef, {
          id: increment(1),
        });
      } catch (error) {
        /* window.alert(error.message); */
      }
    } else {
      console.log('No such document! customIds collection does not exist!');
    }
  }
}
