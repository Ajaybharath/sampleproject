import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DGTRAKMISComponent } from './dgtrakmis/dgtrakmis.component';
import { SummaryReportsComponent } from './summary-reports/summary-reports.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginPageComponent } from './Modals/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'DgTrakmis', component: DGTRAKMISComponent },
  { path: 'SummaryReports', component: SummaryReportsComponent },
  {path:'**',pathMatch:'full',component:PagenotfoundComponent}
  // { path: '', pathMatch:'full',component: LoginPageComponent }
];

@NgModule({
  declarations: [], 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
