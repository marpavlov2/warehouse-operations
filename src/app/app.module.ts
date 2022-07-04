import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { SidenavService } from './shared/services/sidenav.service';

import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth.guard';
import { OrderService } from './shared/services/order.service';
import { AddOrderComponent } from './orders/pages/add-order/add-order.component';
import { ProductService } from './shared/services/product.service';
import { ProductsListResolver } from './orders/pages/add-order/products.resolver';
import { OrdersListComponent } from './orders/pages/orders-list/orders-list.component';
import { OrdersListResolver } from './orders/pages/orders-list/orders-list.resolver';
import { ViewEditOrderComponent } from './orders/pages/view-edit-order/view-edit-order.component';
import { OrderResolver } from './orders/pages/view-edit-order/order.resolver';
import { ToastrModule } from 'ngx-toastr';
import { LoginGuardService } from './shared/services/login-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    SidenavService,
    AuthService,
    AuthGuardService,
    LoginGuardService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
