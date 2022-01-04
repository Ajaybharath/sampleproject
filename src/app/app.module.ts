import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DGTRAKMISComponent } from './dgtrakmis/dgtrakmis.component';
import { DgtrackserviceService } from './dgtrackservice.service';
import {HttpClientModule} from '@angular/common/http';
import { MapsComponent } from './maps/maps.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  declarations: [
    AppComponent,
    DGTRAKMISComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [DgtrackserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
