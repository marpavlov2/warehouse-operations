import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { OrdersListComponent } from './orders/pages/orders-list/orders-list.component';
import { RegisterComponent } from './pages/register/register.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
