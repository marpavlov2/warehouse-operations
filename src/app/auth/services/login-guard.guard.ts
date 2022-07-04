// src/app/auth/login-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(private _auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this._auth.isLoggedIn) {
      this.router.navigate(['orders']);
    }
    return true;
  }
}
