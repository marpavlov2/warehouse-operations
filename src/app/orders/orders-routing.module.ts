import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { ProductsListResolver } from './pages/add-order/products.resolver';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrdersListResolver } from './pages/orders-list/orders-list.resolver';
import { OrderResolver } from './pages/view-edit-order/order.resolver';
import { ViewEditOrderComponent } from './pages/view-edit-order/view-edit-order.component';
import { AuthGuardService } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OrdersListComponent,
    resolve: {
      ordersList: OrdersListResolver,
    },
  },
  {
    path: 'add',
    component: AddOrderComponent,
    resolve: {
      productsList: ProductsListResolver,
    },
  },
  {
    path: ':id',
    component: ViewEditOrderComponent,
    canActivate: [AuthGuardService],
    resolve: {
      productsList: ProductsListResolver,
      orderData: OrderResolver,
    },
  },
  {
    path: ':id/edit',
    component: ViewEditOrderComponent,
    canActivate: [AuthGuardService],
    resolve: {
      productsList: ProductsListResolver,
      orderData: OrderResolver,
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class OrdersRoutingModule {}
