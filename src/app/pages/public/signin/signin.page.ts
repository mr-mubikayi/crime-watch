/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  currentYear: number = new Date().getFullYear();
  signinForm: UntypedFormGroup;
  submitAttempt: boolean;

  constructor(
    public authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {

    this.signinForm = this.formBuilder.group({
      email: ['orpamubi30@gmail.com', Validators.compose([Validators.email, Validators.required])],
      password: ['123456', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  async signIn() {

    this.submitAttempt = true;

    // If email or password empty
    if (this.signinForm.value.email === '' || this.signinForm.value.password === '') {
      this.toastService.presentToast('Error', 'Please input email and password', 'top', 'danger', 2000);

    } else {
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: 'Signing in...',
        spinner: 'crescent'
      });

      await loading.present();

      this.authService
        .signIn(this.signinForm.value.email, this.signinForm.value.password)
        .then((): any => {
          if (this.authService.isEmailVerified) {
            this.router.navigate(['/home']);
            loading.dismiss();
          } else {
            this.toastService.presentToast('Verification', 'Email is not verified, please check your email box', 'top', 'medium', 4000);
            loading.dismiss();
            return false;
          }
        })
        .catch((error) => {
          switch(error.code){
            case 'auth/user-not-found':
              this.toastService.presentToast('Error', 'There is no user record corresponding to this identifier', 'top', 'danger', 4000);
              loading.dismiss();
            break;
            case 'auth/invalid-email':
              this.toastService.presentToast('Error', 'Email format is incorect, please change.', 'top', 'danger', 4000);
              loading.dismiss();
            break;
            case 'auth/wrong-password':
              this.toastService.presentToast('Error', 'Password is invalid, please change.', 'top', 'danger', 4000);
              loading.dismiss();
            break;
            case 'auth/too-many-requests':
              this.toastService.presentToast('Error', 'Error signing in, please try again in few minutes', 'top', 'danger', 4000);
              loading.dismiss();
            break;
            default:
              this.toastService.presentToast('Error', `${error.message}`, 'top', 'danger', 4000);
              loading.dismiss();
            break;
          }
        }
      );
    }
  }
}
