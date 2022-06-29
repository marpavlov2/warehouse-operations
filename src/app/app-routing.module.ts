import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersListResolver } from './pages/orders/orders.resolver';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService],
    resolve: {
      isFetched: OrdersListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
