import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FilterPage } from '../payments/filter/filter.page';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  contentLoaded = false;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
     setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
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

      this.contentLoaded = false;
      setTimeout(() => {
        this.contentLoaded = true;
      }, 2000);
    }
  }
}
