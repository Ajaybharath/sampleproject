import { ThrowStmt } from '@angular/compiler';
import { mapToExpression } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild } from '@angular/core';
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
      for (var ic = 0; ic < unique.length; ic++) {
        var subDomainval1 = [];
        var Reportingval = [];
        for (var id = 0; id < this.Details.length; id++) {
          if (this.Details[id].domain == unique[ic]) {
            subDomainval1.push(this.Details[id].subDomain)
            if (parseInt(this.Details[id].reporting) == 0 || parseInt(this.Details[id].totalDevice) == 0) {
              Reportingval.push(0);
            }
            else {
              Reportingval.push(Math.round(parseInt(this.Details[id].reporting) / parseInt(this.Details[id].totalDevice) * 100));
            }
          }
        }
        console.log(subDomainval1);
        console.log(Reportingval);
        var chartOptions = {
          series: [
            {
              name: "Reporting%",
              data: Reportingval
            }
          ],
          chart: {
            height: 180,
            //type: "area",
            type: "line",
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight",
            width: 2
            // curve:"smooth"
          },
          title: {
            text: unique[ic],
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
            categories: subDomainval1,
            labels: {
              trim: true,
              hideOverlappingLabels: false,
            }
          }

        };
        // var chart = new apexChart(document.querySelector('#chart'), chartOptions);
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
          streetViewControl: false
        }
      );
      this.marker = new google.maps.Marker({ position: centerLatLng, map: this.mapContainer });
      for (var loi = 0; loi < this.Locations.length; loi++) {
        var item: any = { lat: Number, lng: Number };
        item.lat = Number(this.Locations[loi].location.split(',')[0]);
        item.lng = Number(this.Locations[loi].location.split(',')[1]);
        locArray.push(item);
      }
      var image ={
        url: "https://cdn-0.emojis.wiki/emoji-pics/microsoft/blue-circle-microsoft.png",
        // size: new google.maps.Size(20, 32),
        // origin: new google.maps.Point(0, 0),
        // anchor: new google.maps.Point(0, 32),
      }; 
     
      for (var loi = 0; loi < this.Locations.length; loi++) {
        const loc = locArray[loi];
        // const image =
        //  {
        //   url: "https://cdn-0.emojis.wiki/emoji-pics/microsoft/blue-circle-microsoft.png",
        //   // This marker is 20 pixels wide by 32 pixels high.
        //   size: new google.maps.Size(20, 32),
        //   // The origin for this image is (0, 0).
        //   origin: new google.maps.Point(0, 0),
        //   // The anchor for this image is the base of the flagpole at (0, 32).
        //   anchor: new google.maps.Point(0, 32),
        // };
        this.marker = new google.maps.Marker({ icon: image, position: loc, map: this.mapContainer });
      }
    });
  }
}
