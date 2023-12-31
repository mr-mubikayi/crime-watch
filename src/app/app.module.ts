import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';
// NgCharts
import { NgChartsModule } from 'ng2-charts';
//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      IonicModule.forRoot({ mode: 'ios' }),
      ReactiveFormsModule,
      AppRoutingModule,
      NgChartsModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [{
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }],
    bootstrap: [
      AppComponent
    ]
})
export class AppModule { }
