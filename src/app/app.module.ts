import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DGTRAKMISComponent } from './dgtrakmis/dgtrakmis.component';
import { DgtrackserviceService } from './dgtrackservice.service';
import {HttpClientModule} from '@angular/common/http';
import { MapsComponent } from './maps/maps.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome'; 
import { FormsModule } from '@angular/forms';
import { SummaryReportsComponent } from './summary-reports/summary-reports.component';
import { AppRoutingModule } from './app-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



@NgModule({
  declarations: [
    AppComponent,
    DGTRAKMISComponent,
    MapsComponent,
    SummaryReportsComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DgtrackserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
