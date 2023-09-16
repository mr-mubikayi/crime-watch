import { NavController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';
import { FilterPage } from '../reports/filter/filter.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UntypedFormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report/report.service';
import { ReportStatus } from 'src/app/models/enums/report-status';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  skeletonItems = new Array(3);
  content_loaded: boolean = false;
  reports: any;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private navController: NavController,
    public authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService,
    private router: Router,
    public reportService: ReportService) {
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.getReports();
  }

  getReports(){
    this.content_loaded = false;
    setTimeout(() => {
      this.reportService.getReports();
      this.content_loaded = true;
    }, 1500);
  }

  getStatusColor(status: ReportStatus): string {
    switch (status) {
      case ReportStatus.pending:
        return 'medium';
      case ReportStatus.progress:
        return 'primary';
      case ReportStatus.resolved:
        return 'success';
      case ReportStatus.suspended:
        return 'danger';
      default:
        return 'warning';
    }
  }

  getStatusName(status: number): string{
    return ReportStatus[status];
  }

  goToReportDetails(report: any){
    this.reportService.selectedReport = report;
    this.navController.navigateForward('reports/detail', { state: report });
  }

  // Filter
  async filter() {
    const modal = await this.modalController.create({
      component: FilterPage,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {

    }
  }
}
