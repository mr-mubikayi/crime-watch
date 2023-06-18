/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(
    public authService: AuthService,
    private loadingController: LoadingController,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
  }

  async onResendClicked(){
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Sending email...',
      spinner: 'crescent'
    });
    await loading.present();

    this.authService.sendVerificationMail()
    .then(() => {
      this.toastService.presentToast('Success', 'Verification email sent successfully, please check your email box', 'top', 'success', 4000);
      loading.dismiss();
    })
    .catch(async (error) => {
      switch(error.code){
        case 'auth/too-many-requests':
          this.toastService.presentToast('Error', 'Error sending verification email, please try again in few minutes', 'top', 'danger', 4000);
          loading.dismiss();
        break;
        default:
          this.toastService.presentToast('Error', `${error.message}`, 'top', 'danger', 4000);
          loading.dismiss();
        break;
      }
    });
  }

  onGoToPageClicked(url: string){
    this.router.navigate([url]);
  }
}
