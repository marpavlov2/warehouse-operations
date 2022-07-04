// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/orders/interfaces/product.model';
import { ProductQuery } from 'src/app/orders/interfaces/product.query';

@Injectable()
export class ProductService {
  constructor(private _firestore: Firestore, private _toastr: ToastrService) {}

  async getProducts(): Promise<Product[] | void> {
    try {
      const productsRef = await getDocs(
        collection(this._firestore, 'products')
      );
      const products: Product[] = productsRef.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as ProductQuery
      );

      return products;
    } catch (error) {
      this._toastr.error('Failed to fetch products.');
    }
  }
}
