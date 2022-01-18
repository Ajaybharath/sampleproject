import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DGTRAKMISComponent } from './dgtrakmis/dgtrakmis.component';
import { SummaryReportsComponent } from './summary-reports/summary-reports.component';

const routes: Routes = [
  { path: '', component: DGTRAKMISComponent },
  { path: 'SummaryReports', component: SummaryReportsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
