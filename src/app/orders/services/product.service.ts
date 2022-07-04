// src/app/services/product.service.ts
// ServerErrorInterceptor && Error service can be added to handle Errors

import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product.query';

@Injectable()
export class ProductService {
  constructor(private _firestore: Firestore, private _toastr: ToastrService) {}

  async getProducts(): Promise<Product[] | void> {
    try {
      const productsRef = await getDocs(
        collection(this._firestore, 'products')
      );
      const products: Product[] = productsRef.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Product
      );

      return products;
    } catch (error) {
      this._toastr.error('Failed to fetch products.');
    }
  }
}
