/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  currentYear: number = new Date().getFullYear();

  resetForm: UntypedFormGroup;
  submitAttempt: boolean;

  constructor(
    public authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['orpamubi30@gmail.com', Validators.compose([Validators.email, Validators.required])]
    });
  }

  async onResetPasswordClicked(){

    this.submitAttempt = true;

    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Sending email...',
      spinner: 'crescent'
    });
    await loading.present();

    this.authService.passwordRecover(this.resetForm.value.email)
    .then(() => {
      this.toastService.presentToast('Success', 'Password reset email sent successfully, please check your email box', 'top', 'success', 4000);
      loading.dismiss();
    })
    .catch((error) => {
      switch(error.code){
        case 'auth/too-many-requests':
          this.toastService.presentToast('Error', 'Error sending password reset email, please try again in few minutes', 'top', 'danger', 4000);
          loading.dismiss();
        break;
        case 'auth/user-not-found':
              this.toastService.presentToast('Error', 'There is no user record corresponding to this identifier', 'top', 'danger', 4000);
              loading.dismiss();
        break;
        case 'auth/invalid-email':
              this.toastService.presentToast('Error', 'Email format is incorect, please change.', 'top', 'danger', 4000);
              loading.dismiss();
        break;
        default:
          this.toastService.presentToast('Error', `${error.message}`, 'top', 'danger', 4000);
          loading.dismiss();
        break;
      }
    });
  }
}
