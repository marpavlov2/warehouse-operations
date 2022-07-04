import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { OrderService } from '../shared/services/order.service';
import { ProductService } from '../shared/services/product.service';

import { OrdersRoutingModule } from './orders-routing.module';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { ProductsListResolver } from './pages/add-order/products.resolver';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrdersListResolver } from './pages/orders-list/orders-list.resolver';
import { OrderResolver } from './pages/view-edit-order/order.resolver';
import { ViewEditOrderComponent } from './pages/view-edit-order/view-edit-order.component';

@NgModule({
  declarations: [
    AddOrderComponent,
    ViewEditOrderComponent,
    OrdersListComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
  ],
  providers: [
    OrderService,
    OrdersListResolver,
    ProductsListResolver,
    ProductService,
    OrderResolver,
  ],
})
export class OrdersModule {}
