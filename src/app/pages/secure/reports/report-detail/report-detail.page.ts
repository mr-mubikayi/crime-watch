import { ReportService } from 'src/app/services/report/report.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Report } from 'src/app/models/report';
import { StatusTimeline } from 'src/app/models/status-timeline';
import { ReportStatus } from 'src/app/models/enums/report-status';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.page.html',
  styleUrls: ['./report-detail.page.scss'],
})
export class ReportDetailPage implements OnInit {

  report: Report;
  statusTimelines: StatusTimeline[] = [];

  constructor(
    private reportService: ReportService,
    private navController: NavController
  ) {
    if(this.reportService.selectedReport != null){
      this.report = this.reportService.selectedReport;
      this.statusTimelines = this.report.status.statusTimelines;
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
      this.statusTimelines = this.report.status.statusTimelines;
    }
    else{
      this.navController.navigateForward('reports');
    }
  }

  isLastItem(item) {
    return this.statusTimelines.indexOf(item) === this.statusTimelines.length - 1;
  }

  getStatusName(status: number): string{
    return ReportStatus[status];
  }
}
