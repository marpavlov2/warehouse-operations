import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './guards/auth.guard';
import { LoginGuardService } from './services/login-guard.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [LogInComponent, RegisterComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  providers: [AuthService, AuthGuardService, LoginGuardService],
})
export class AuthModule {}
