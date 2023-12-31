import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Report } from '../../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public reportsGroupedByDate: any;
  public selectedReport: any;

  constructor(
    private firestore: AngularFirestore) {
  }

  getReports(){

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.firestore.collection('/reports/')
    .snapshotChanges()
    .subscribe(result => {
      const reports = result
      .map(e => ({
        id: e.payload.doc.data()['id'],
        user: e.payload.doc.data()['user'],
        date: e.payload.doc.data()['date'],
        time: e.payload.doc.data()['time'],
        latitude: e.payload.doc.data()['latitude'],
        longitude: e.payload.doc.data()['longitude'],
        type: e.payload.doc.data()['type'],
        description: e.payload.doc.data()['description'],
        status: e.payload.doc.data()['status'],
        severity: e.payload.doc.data()['severity']
        }))
      .filter(report => report.user  === user.displayName);
      const groupedReports = this.groupReportsByDate(reports);
      this.reportsGroupedByDate = groupedReports;
    });
  }

  groupReportsByDate(reports: Report[]) {
    const groupedReports: { date: Date; reports: Report[] }[] = [];

    reports.forEach(report => {
      const reportDate = new Date(report.date);

      // Get a string that represents year-month only
      const yearMonth = `${reportDate.getFullYear()}-${reportDate.getMonth() + 1}`; // Note: getMonth() returns 0-based month
      // Compare the year-month strings
      const existingGroup = groupedReports.find(group => `${group.date.getFullYear()}-${group.date.getMonth() + 1}` === yearMonth);

      if (existingGroup) {
        existingGroup.reports.push(report);
      } else {
        const newGroup = { date: reportDate, reports: [report] };
        groupedReports.push(newGroup);
      }
    });

    groupedReports.sort((a, b) => b.date.getTime() - a.date.getTime());
    return groupedReports;
  }

  createReport(report: Report){
    return this.firestore.collection('/reports/').add(report);
  }
}
