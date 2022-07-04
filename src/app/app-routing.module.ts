import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { AddOrderComponent } from './orders/pages/add-order/add-order.component';
import { ProductsListResolver } from './orders/pages/add-order/products.resolver';
import { OrdersListComponent } from './orders/pages/orders-list/orders-list.component';
import { OrdersListResolver } from './orders/pages/orders-list/orders-list.resolver';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './shared/services/auth.guard';
import { ViewEditOrderComponent } from './orders/pages/view-edit-order/view-edit-order.component';
import { OrderResolver } from './orders/pages/view-edit-order/order.resolver';
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
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  { path: '**', component: OrdersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
