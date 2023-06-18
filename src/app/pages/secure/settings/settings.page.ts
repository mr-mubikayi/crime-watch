import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastService: ToastService) { }

  ngOnInit() {
  }

  async onSignOutClicked() {

    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Signing out...',
      spinner: 'crescent'
    });
    await loading.present();

    this.authService.signOut()
    .then(() => {
      this.toastService.presentToast('Success', 'Sign out successful', 'top', 'success', 4000);
      loading.dismiss();
    })
    .catch(async (error) => {
      this.toastService.presentToast('Error', `${error.message}`, 'top', 'danger', 4000);
      loading.dismiss();
    });
  }
}
