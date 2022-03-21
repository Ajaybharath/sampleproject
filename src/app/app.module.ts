import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DGTRAKMISComponent } from './dgtrakmis/dgtrakmis.component';
import { DgtrackserviceService } from './dgtrackservice.service';
import {HttpClientModule} from '@angular/common/http';
import { MapsComponent } from './maps/maps.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SummaryReportsComponent } from './summary-reports/summary-reports.component';
import { AppRoutingModule } from './app-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { MailconfigModelComponent } from './Modals/mailconfig-model/mailconfig-model.component';
import { ChartsComponent } from './charts/charts.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginAccessGuard } from './login-access.guard';
  

@NgModule({
  declarations: [
    AppComponent,
    DGTRAKMISComponent,
    MapsComponent,
    SummaryReportsComponent,
    PagenotfoundComponent,
    LoadingComponent,
    MailconfigModelComponent,
    ChartsComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DgtrackserviceService,LoginAccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
