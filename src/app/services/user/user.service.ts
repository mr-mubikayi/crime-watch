import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone,
    private toastService: ToastService) {

  }
}
