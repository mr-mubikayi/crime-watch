import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Report } from '../../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private firestore: AngularFirestore) {

  }

  getReports(){
    return this.firestore.collection('/reports/').snapshotChanges();
  }

  createReport(report: Report){
    return this.firestore.collection('/reports/').add(report);
  }
}
