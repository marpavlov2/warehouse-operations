// src/app/services/auth.service.ts

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

  constructor(private _firestore: Firestore, private router: Router) {
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
      this.router.navigate(['/orders']);
    } catch (error) {
      /* window.alert(error.message); */
    }
  }

  async signUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );

      await setDoc(doc(this._firestore, 'users', userCredential.user.uid), {
        email,
      });

      this.router.navigate(['/login']);
    } catch (error) {
      /* window.alert(error.message); */
    }
  }

  async logout() {
    try {
      await signOut(this._auth);
    } catch (error) {
      /* window.alert(error.message); */
    }
  }
}
