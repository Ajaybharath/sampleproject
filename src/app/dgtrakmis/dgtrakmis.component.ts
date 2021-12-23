import { ThrowStmt } from '@angular/compiler';
import { mapToExpression } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit,ViewChild} from '@angular/core';
import { debug } from 'console';
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
  Details: any = [];
  reporting: any = [];
  domain: any = [];
  subDomain: any = [];
  @ViewChild('map') gmap: any;
  mapContainer: google.maps.Map;
  marker: google.maps.Marker;
  // map: google.maps.Map;
  // @ViewChild('map', {static: false}) gmap: ElementRef;
  private totalDevice = 0;
  private totalReporting = 0; private totalNotReporting = 0; private totalDomain = 0; private totalSubDomain = 0; private Regions = 0;
  constructor(private service: DgtrackserviceService) { }
  inputs = { "uid": "idea", "pwd": "bytes" };
  ngOnInit() {
    this.service.apicall(this.inputs).subscribe(data => {
      
      this.Details = data
      console.log(data);
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
      //debugger
      
      //getting unique domain from domain list(property) 
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      var unique = this.domain.filter(onlyUnique);
      console.log(unique);
      this.totalDomain = unique.length;
      //chart
    // var yaxis = [1,3,5,6,7,8];
    // var xaxis = ["mon","tue","wed","thus","fri","sat"];
      var Reporting = this.reporting;
      var subDomainval = this.subDomain;
      debugger
      console.log(this.subDomain);
      console.log(this.reporting);
      var chartOptions = {
        series: [
          {
            name: "Reporting%",
            data: this.reporting
          }
        ],
        chart: {
          height: 180,
          //type: "area",
          type:"line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
          // curve:"smooth"
        },
        title: {
          text: "DG Trak Summary Graph",
          fontFamily: 'Times New Roman',
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories:this.subDomain
        }
        
      };
      var chart = new apexChart(document.querySelector('#chart'), chartOptions);
        chart.render();
    }
    );
    this.service.datapost().subscribe(data => {
      this.DateTime = data;
      
      console.log('27 > ' + this.DateTime.reportAt);
    });
    console.log('30 > ' + this.DateTime);
    //mapContainer
    var lat = "17.4330175";// this._commanService.getDefaultLat();
    var lon = "78.3728449";// this._commanService.getDefaultLng();
    var centerLatLng = new google.maps.LatLng(Number(lat), Number(lon));
    this.mapContainer = new google.maps.Map(this.gmap.nativeElement,
      {
        center: centerLatLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: 'greedy'
      }
    );
    this.marker = new google.maps.Marker({ position: centerLatLng, map: this.mapContainer });
  }
}
