import { Component, Input, OnInit } from '@angular/core';
import { DgtrackserviceService } from '../dgtrackservice.service';
import * as apexChart from '../js/apexchart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() divid='';
  domain:any=[];Details:any;totaldomain:any;
  selectValue1=3;
  constructor(private service: DgtrackserviceService) { }
  inputs = { "uid": "idea", "pwd": "bytes" };
  ngOnInit() {
    this.service.apicall(this.inputs).subscribe(data => {
      this.Details = data
      for (var i = 0; i < this.Details.length; i++) {
        this.domain.push(this.Details[i].domain);
      }
      //this.chartdata(this.selectValue1);})
    })
  }

  //   chartdata(selectValue1: any) {
  //     function onlyUnique(value, index, self) {
  //       return self.indexOf(value) === index;
  //     }
  //     var unique = this.domain.filter(onlyUnique);
  //     this.totaldomain = unique.length;
  //     for (var ic = 0; ic < unique.length; ic++) {
  //       var subDomainval1 = [], Reportingval = [], goodState = [], warningState = [], criticalState = [], TotalDevices = [], ReportingDevices = [];
  //       for (var id = 0; id < this.Details.length; id++) {
  //         if (this.Details[id].domain == unique[ic]) {
  //           subDomainval1.push(this.Details[id].subDomain)
  //           TotalDevices.push(parseInt(this.Details[id].totalDevice));
  //           ReportingDevices.push(parseInt(this.Details[id].reporting));
  //           goodState.push(parseInt(this.Details[id].Good));
  //           warningState.push(parseInt(this.Details[id].Warning));
  //           criticalState.push(parseInt(this.Details[id].Critical));
  //         }
  //       }
  //       var test = ReportingDevices.concat();
  //       var len = test.length;
  //       var indices = new Array(len);
  //       for (var i = 0; i < len; ++i) indices[i] = i;
  //       //indices.sort(function (a, b) { return test[b] < test[a] ? -1 : test[b] > test[a] ? 1 : 0; });
  //       // if(this.selectValue1 == 3 || this.selectValue1 == 5){
  //       //   var top3ReportingIndex = indices.slice(0,selectValue1);
  //       // }
  //       // else if(this.selectValue1 == -3){
  //       //   var top3ReportingIndex = indices.slice(indices.length-3,indices.length);
  //       // }
  //       // else{
  //       //   var top3ReportingIndex = indices.slice(indices.length-5,indices.length);
  //       // }
  //       if (this.selectValue1 == 3 || this.selectValue1 == 5) {
  //         indices.sort(function (a, b) { return test[b] < test[a] ? -1 : test[b] > test[a] ? 1 : 0; });
  //         var top3ReportingIndex = indices.slice(0, selectValue1);
  //       }
  //       else if (this.selectValue1 == -3 || this.selectValue1 == -5) {
  //         indices.sort(function (a, b) { return test[a] < test[b] ? -1 : test[a] > test[b] ? 1 : 0; });
  //         var top3ReportingIndex = indices.slice(0, Math.abs(selectValue1));
  //       }
  //       var top3subDomain = [], top3totdevices = [], top3good = [], top3warning = [], top3critical = [], top3Reporting = [];
  //       for (var ri = 0; ri < top3ReportingIndex.length; ri++) {
  //         top3Reporting.push(ReportingDevices[top3ReportingIndex[ri]]);
  //         top3subDomain.push(subDomainval1[top3ReportingIndex[ri]]);
  //         top3totdevices.push(TotalDevices[top3ReportingIndex[ri]]);
  //         top3good.push(goodState[top3ReportingIndex[ri]]);
  //         top3warning.push(warningState[top3ReportingIndex[ri]]);
  //         top3critical.push(criticalState[top3ReportingIndex[ri]]);
  //       }
  //       //debugger
  //       var chartOptions = {
  //         series: [{
  //           name: 'Total',
  //           data: top3totdevices
  //         },
  //         {
  //           name: 'Reporting',
  //           data: top3Reporting
  //         }, {
  //           name: 'Good',
  //           data: top3good
  //         }, {
  //           name: 'Warning',
  //           data: top3warning
  //         }, {
  //           name: 'Critical',
  //           data: top3critical
  //         }
  //         ],
  //         chart: {
  //           type: 'bar',
  //           height: 350
  //         },
  //         plotOptions: {
  //           bar: {
  //             horizontal: false,
  //             columnWidth: '55%',
  //             endingShape: 'rounded'
  //           },
  //         },
  //         dataLabels: {
  //           enabled: false
  //         },
  //         stroke: {
  //           show: true,
  //           width: 2,
  //           colors: ['transparent']
  //         },
  //         xaxis: {
  //           categories: top3subDomain,
  //         },
  //         title: {
  //           text: unique[ic],
  //           fontFamily: 'Times New Roman',
  //           align: "left"
  //         },
  //         fill: {
  //           opacity: 1
  //         },
  //         legend: {
  //           show: false
  //         },
  //       };
  //       var name = '#chart5';
  //       document.querySelector(name).innerHTML = "";
  //       var chart = new apexChart(document.querySelector(name), chartOptions);
  //       chart.render();
      
  //     }
   }

//}
