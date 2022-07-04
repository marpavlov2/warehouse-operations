// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { ProductQuery } from '../interfaces/product.query';
import { Product } from '../interfaces/product.model';

@Injectable()
export class ProductService {
  private _productsSubject$ = new BehaviorSubject<Product[]>([]);
  public productsSubject$ = this._productsSubject$.asObservable();

  constructor(private _firestore: Firestore, private router: Router) {}

  async getProducts(): Promise<Product[] | void> {
    try {
      const productsRef = await getDocs(
        collection(this._firestore, 'products')
      );
      const products: Product[] = productsRef.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as ProductQuery
      );

      this._productsSubject$.next(products);
      return products;
    } catch (error) {}
  }
}
