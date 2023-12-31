import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/secure/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'insights',
        loadChildren: () => import('../pages/secure/insights/insights.module').then(m => m.InsightsPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('../pages/secure/reports/reports.module').then(m => m.ReportsPageModule)
      },
      {
        path: 'report',
        loadChildren: () => import('../pages/secure/report/report.module').then(m => m.ReportPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('../pages/secure/news/news.module').then(m => m.NewsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/secure/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../pages/secure/payments/payments.module').then(m => m.PaymentsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
