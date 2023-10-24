import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { UntypedFormBuilder } from '@angular/forms';
import { ToastService } from '../services/toast/toast.service';
import { ReportService } from '../services/report/report.service';
import { Report } from 'src/app/models/report';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private actionSheetController: ActionSheetController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService,
    private router: Router,
    private reportService: ReportService) {}

  async selectAction() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an action',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'New Report',
          icon: 'add-circle-outline',
          handler: () => {
            this.router.navigate(['/report']);
          }
        },
        {
          text: 'SOS',
          icon: 'alert-circle-outline',
          handler: async () => {
            const loading = await this.loadingController.create({
              cssClass: 'default-loading',
              message: 'Sending report...',
              spinner: 'crescent'
            });

            await loading.present();

            this.createReport(false, loading);
          }
        },
        {
          text: 'SOS Anonymous',
          icon: 'alert-circle-outline',
          handler: async () => {
            const loading = await this.loadingController.create({
              cssClass: 'default-loading',
              message: 'Sending report...',
              spinner: 'crescent'
            });

            await loading.present();

            this.createReport(true, loading);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  createReport(isAnonymous: boolean, loading: HTMLIonLoadingElement){

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = isAnonymous ? null : user.displayName;
    const date = new Date();
    const report: Report = {
      id: Guid.create().toString(),
      user: userName,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      latitude: -29.1219,
      longitude: 26.2039,
      type: 'SOS',
      description: 'Urgent',
      status: {
        currentStatus: 0,
        statusTimelines:
          [
            {
              date: date.toLocaleDateString(),
              description: "",
              statusDetail: 0,
              time: date.toLocaleTimeString(),
            }
          ],
      },
      severity: 1
    };

    this.reportService.createReport(report)
    .then(() => {
      this.toastService.presentToast('Success', 'Report sent successfully', 'top', 'success', 4000);
      this.router.navigate(['/reports']);
      loading.dismiss();
    })
    .catch((error) => {
      this.toastService.presentToast('Error', `${error.message}`, 'top', 'danger', 4000);
      loading.dismiss();
    });
  }
}
