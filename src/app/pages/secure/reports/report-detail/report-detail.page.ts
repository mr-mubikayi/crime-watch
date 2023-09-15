import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report/report.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.page.html',
  styleUrls: ['./report-detail.page.scss'],
})
export class ReportDetailPage implements OnInit {

  report: any;

  constructor(
    private reportService: ReportService,
    private navController: NavController
  ) {
    if(this.reportService.selectedReport != null){
      this.report = this.reportService.selectedReport;
    }
    else{
      this.navController.navigateForward('reports');
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if(this.reportService.selectedReport != null){
      this.report = this.reportService.selectedReport;
    }
    else{
      this.navController.navigateForward('reports');
    }
  }

  selectAction(){

  }
}
