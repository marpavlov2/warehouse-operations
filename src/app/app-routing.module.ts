import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { ProductsListResolver } from './pages/add-order/products.resolver';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrdersListResolver } from './pages/orders-list/orders-list.resolver';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './shared/services/auth.guard';
import { ViewEditOrderComponent } from './pages/view-edit-order/view-edit-order.component';
import { OrderResolver } from './pages/view-edit-order/order.resolver';
import { LoginGuardService } from './shared/services/login-guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LogInComponent,
    canActivate: [LoginGuardService],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'orders',
    component: OrdersListComponent,
    resolve: {
      ordersList: OrdersListResolver,
    },
  },
  {
    path: 'orders/add',
    component: AddOrderComponent,
    resolve: {
      productsList: ProductsListResolver,
    },
  },
  {
    path: 'orders/:id',
    component: ViewEditOrderComponent,
    canActivate: [AuthGuardService],
    resolve: {
      productsList: ProductsListResolver,
      orderData: OrderResolver,
    },
  },
  { path: '**', component: OrdersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
