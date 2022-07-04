// src/app/services/auth.service.ts
// ServerErrorInterceptor && Error service can be added to handle Errors

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  getAuth,
  signOut,
} from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  private _auth = getAuth();

  get isLoggedIn(): boolean {
    const user = !!localStorage.getItem('user');
    return user;
  }

  get user(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  constructor(
    private _firestore: Firestore,
    private router: Router,
    private _toastr: ToastrService
  ) {
    this._auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this._auth, email, password);
      this._toastr.success('Successful login.');
      this.router.navigate(['/orders']);
    } catch (error) {
      // Error message description can be added based on API error code
      this._toastr.error('Unsuccessful login.', 'Error message');
    }
  }

  async signUp(name: string, city: string, email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );

      await setDoc(doc(this._firestore, 'users', userCredential.user.uid), {
        name,
        city,
        email,
      });

      this._toastr.success('Successful registration.', 'Automatic login');
      this.router.navigate(['/login']);
    } catch (error) {
      this._toastr.error('Unsuccessful registration.');
    }
  }

  async logout() {
    try {
      await signOut(this._auth);
      this._toastr.success('Successful logout.');
    } catch (error) {
      this._toastr.error('Unsuccessful logout.');
    }
  }
}
