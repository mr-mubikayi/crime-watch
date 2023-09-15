import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  selectedType: string;
  reportForm: UntypedFormGroup;
  crimeTypes: string[] = [
    'Harassment',
    'Discrimination',
    'Domestic violence'
  ];

  constructor(
    public authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService,
    private router: Router,
    private reportService: ReportService) {

  }

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      description: ['I was harassed at my work place', Validators.required],
      anonymous: [false, Validators.required]
    });
  }

  onTypeSelected(event: any){
    this.selectedType = event.detail.value;
  }

  async onSendClicked(){

    if (!this.selectedType) {
      this.toastService.presentToast('Error', 'Please select the crime type', 'top', 'danger', 2000);

    } else {
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: 'Sending report...',
        spinner: 'crescent'
      });

      await loading.present();

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userName = this.reportForm.value.anonymous ? null : user.displayName;
      const date = new Date();
      const report: Report = {
        user: userName,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        latitude: -29.1219,
        longitude: 26.2039,
        type: this.selectedType,
        description: this.reportForm.value.description,
        status: 0,
        severity: 0
      };

      this.reportService.createReport(report)
      .then(() => {
        this.selectedType = undefined;
        this.toastService.presentToast('Success', 'Report sent successfully', 'top', 'success', 4000);
        this.router.navigate(['/reports']);
        loading.dismiss();
      })
      .catch((error) => {
        this.selectedType = undefined;
        this.toastService.presentToast('Error', `${error.message}`, 'top', 'danger', 4000);
        loading.dismiss();
      });
    }
  }
}
