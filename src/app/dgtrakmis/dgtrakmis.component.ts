import { ThrowStmt } from '@angular/compiler';
import { mapToExpression } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { cr } from '@angular/core/src/render3';
// import { debug } from 'console';
import { parse } from 'querystring';
import { DgtrackserviceService } from '../dgtrackservice.service';
import * as apexChart from '../js/apexchart.js';



@Component({
  selector: 'app-dgtrakmis',
  templateUrl: './dgtrakmis.component.html',
  styleUrls: ['./dgtrakmis.component.css']
})
export class DGTRAKMISComponent implements OnInit {
  DateTime: any = [];
  Locations: any = [];
  Details: any = [];
  reporting: any = [];
  domain: any = [];
  subDomain: any = [];
  @ViewChild('map') gmap: any;
  mapContainer: google.maps.Map;
  marker: google.maps.Marker;
  private totalDevice = 0;
  private totalReporting = 0; private totalNotReporting = 0; private totalDomain = 0; private totalSubDomain = 0; private Regions = 0;
  constructor(private service: DgtrackserviceService) { }
  inputs = { "uid": "idea", "pwd": "bytes" };
  ngOnInit() {
    this.service.apicall(this.inputs).subscribe(data => {
      this.Details = data
      for (var i = 0; i < this.Details.length; i++) {
        this.totalDevice += parseInt(this.Details[i].totalDevice);
        this.totalReporting += parseInt(this.Details[i].reporting);
        this.totalNotReporting += parseInt(this.Details[i].notReporting);
        this.subDomain.push(this.Details[i].subDomain);
        this.domain.push(this.Details[i].domain);
        this.totalSubDomain = parseInt(this.Details.length);
        if (parseInt(this.Details[i].reporting) == 0 || parseInt(this.Details[i].totalDevice) == 0) {

          this.reporting.push(0);
        }
        else {
          this.reporting.push(Math.round(parseInt(this.Details[i].reporting) / parseInt(this.Details[i].totalDevice) * 100));
        }
      }
      console.log(this.Details);
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      var unique = this.domain.filter(onlyUnique);
      this.totalDomain = unique.length;
      for (var ic = 0; ic < unique.length; ic++) {
        var subDomainval1 = [],Reportingval = [], goodState = [], warningState = [],criticalState = [],TotalDevices = [], ReportingDevices = [];
        for (var id = 0; id < this.Details.length; id++) {
          if (this.Details[id].domain == unique[ic]) {
            subDomainval1.push(this.Details[id].subDomain)
            TotalDevices.push(this.Details[id].totalDevice);
            ReportingDevices.push(this.Details[id].reporting);
            goodState.push(parseInt(this.Details[id].Good));
            warningState.push(parseInt(this.Details[id].Warning));
            criticalState.push(parseInt(this.Details[id].Critical));
          }
        }
        var top3Reporting = [], top3subDomain = [], top3totdevices = [], top3good = [], top3warning = [], top3critical = [];
        top3Reporting = ReportingDevices.sort(function(a, b){return b - a}).slice(0, 3);
        for(var t = 0; t < top3Reporting.length; t++){
          var count = 0;
          for(var d = 0; d < ReportingDevices.length; d++){
            debugger
            if(ReportingDevices[d] == top3Reporting[t] && count == 0){
              count = count + 1;
              top3subDomain.push(subDomainval1[d]);
              top3totdevices.push(TotalDevices[d]);
              top3good.push(goodState[d]);
              top3warning.push(warningState[d]);
              top3critical.push(criticalState[d]);
            }
          }
        }
        console.log(top3Reporting);
        console.log(top3subDomain);
        console.log(top3good);
        console.log(top3warning);
        console.log(top3critical);
        console.log(top3totdevices)
        var chartOptions = {
          series: [{
          name: 'Total',
          data: top3totdevices
        },
        {
          name: 'Reporting',
          data: top3Reporting
        }, {
          name: 'Good',
          data: top3good
        }, {
          name: 'Warning',
          data: top3warning
        },{
          name: 'Critical',
          data: top3critical
        }
      ],
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: top3subDomain,
        },
        title: {
              text: unique[ic],
              fontFamily: 'Times New Roman',
              align: "left"
            },
        fill: {
          opacity: 1
        },
        legend: {
          show:false
        },
        };
        var name = '#chart' + (ic + 1);
        var chart = new apexChart(document.querySelector(name), chartOptions);
        chart.render();
      }
    }
    );
    this.service.datapost().subscribe(data => {
      this.DateTime = data;
      console.log('27 > ' + this.DateTime.reportAt);
    });
    console.log('30 > ' + this.DateTime);
    //mapContainer
    this.service.apicallLocation(this.inputs).subscribe(data => {
      this.Locations = data
      var locName = [], locArray = [], locLon = [];
      var lat1 = "17.4295865";// this._commanService.getDefaultLat();
      var lon1 = "78.3709647";// this._commanService.getDefaultLng();
      var centerLatLng = new google.maps.LatLng(Number(lat1), Number(lon1));
      this.mapContainer = new google.maps.Map(this.gmap.nativeElement,
        {
          center: centerLatLng,
          zoom: 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          gestureHandling: 'greedy',
          mapTypeControl: false,
          streetViewControl: false,
        }
      );
      var image ={
        url: "https://cdn-0.emojis.wiki/emoji-pics/microsoft/blue-circle-microsoft.png",
        scaledSize:new google.maps.Size(10, 10),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 10),
      }; 
      this.Regions = this.Locations.length;
      for (var loi = 0; loi < this.Locations.length; loi++) {
        const titleLoc = this.Locations[loi].name;
        this.marker = new google.maps.Marker({ icon: image, position: {lat:Number(this.Locations[loi].location.split(',')[0]),lng:Number(this.Locations[loi].location.split(',')[1]) }, map: this.mapContainer,title:titleLoc });
      }
    });
  }
}
