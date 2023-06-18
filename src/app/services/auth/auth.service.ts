/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone,
    private toastService: ToastService) {

      this.ngFireAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user') || '{}');
        } else {
          localStorage.setItem('user', null || '{}');
          JSON.parse(localStorage.getItem('user') || '{}');
        }
      });
    }

  // Get user session
  async getSession() {

    // ...
    // put auth session here
    // ...

    // Sample only - remove this after real authentication / session
    const session = {
      email: 'john.doe@mail.com'
    };

    return false;
    // return session;
  }

  signIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  registerUser(email: any, password: any) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  async sendVerificationMail() {
    return (await this.ngFireAuth.currentUser).sendEmailVerification();
  }

  passwordRecover(passwordResetEmail: any) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  // Auth providers
  authLogin(provider: any) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
        this.toastService.presentToast('Error', error.message, 'top', 'danger', 4000);
      });
  }

  // Store user in localStorage
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.id}`
    );

    const userData: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      password: user.password
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign-out
  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/signin']);
    });
  }

  // Sign in with Gmail
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified !== false ? true : false;
  }
}
