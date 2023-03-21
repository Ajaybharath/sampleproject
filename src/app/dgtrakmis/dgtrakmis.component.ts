import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DgtrackserviceService } from '../dgtrackservice.service';
import * as apexChart from '../js/apexchart.js';
import { MailconfigModelComponent } from '../Modals/mailconfig-model/mailconfig-model.component';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
@Component({
  selector: 'app-dgtrakmis',
  templateUrl: './dgtrakmis.component.html',
  styleUrls: ['./dgtrakmis.component.css']
})
export class DGTRAKMISComponent implements OnInit {
  ram: any = []; cpu: any = []; servername: any = [];
  SSLCertificateData: any;
  domainname: any = []; severity: any = []; ExpiryDate: any = [];
  servername1: any; servername2: any; servername3: any; servername4: any; servername5: any;
  DateTime: any = []; Locations: any = []; Details: any = [];
  FilteredDetails: any = []; reporting: any = []; domain: any = [];
  subDomain: any = []; tempReporting: any = []; searchText: any = "";
  Devices: any = []; smscredits: any;
  cpuload: any; logkey: any;
  ResponseData: any;
  //hideData = false;
  selectValue: any; topval: any;
  @ViewChild('map') gmap: any;
  @ViewChild('modal') Modals: MailconfigModelComponent
  mapContainer: google.maps.Map;
  marker: google.maps.Marker;
  public totalDevice = 0;
  public totalReporting = 0; public totalNotReporting = 0; public totalDomain = 0; public totalSubDomain = 0; public Regions = 0;
  constructor(private service: DgtrackserviceService,
    private Router: Router,
    private _location: Location,
  ) { }
  message: any;
  ishideData = false;
  licenseTableDetails:any;
  isLoading = false;
  hidelogout: boolean = false;
  //formattedDt = formatDate(new Date(), 'yyyy-MM-dd hh mm', 'en_US')//yyyy-MM-dd hh:mm:ssZZZZZ,private location:Location

  inputs = { "uid": "idea", "pwd": "bytes" };
  //mailInputs: any;
  selectValue1 = 3;
  ngOnInit() {
    this.hidelogout = Boolean(localStorage.getItem('login'));

    this._location.back();
    //cookies expiry
    // var cookie = document.cookie.split(';');

    // for (var i = 0; i < cookie.length; i++) {
    //   
    //   var chip = cookie[i],
    //     entry = chip.split("="),
    //     name = entry[0];

    //   document.cookie = name + '=;expires=' + new Date(0).toUTCString();
    // }


    this.windowsclose();

    this.isLoading = true;

    this.service.apicall(this.inputs).subscribe(data => {
      this.ResponseData = data;
      this.Details = this.ResponseData.CData;
      this.SSLCertificateData = this.ResponseData.ssl;
      this.DateTime = this.ResponseData.ReportTime;
      this.Locations = this.ResponseData.Regions;
      this.smscredits = this.ResponseData.SMSToken;
      if (data) {
        this.isLoading = false;
      }
      this.sslCertificatDetails();
      this.getTotalDetails();
      this.LocationData();
    },
      (error: any) => {
        console.log(error.url);
        this.isLoading = false;
        // this.ngOnInit();
      }

    );


    // this.service.apiSSLCertificateDetails().subscribe(data => {
    //   // 
    //   this.SSLCertificateData = data;
    //   for (var sd = 0; sd < this.SSLCertificateData.length; sd++) {
    //     this.domainname.push(this.SSLCertificateData[sd].domain);
    //     this.ExpiryDate.push(this.SSLCertificateData[sd].expTime);
    //     this.severity.push(this.SSLCertificateData[sd].severity);
    //   }

    // },
    // (error:any)=>
    // {
    //   console.log(error.url);
    //   //this.ngOnInit();
    // }
    // );

    // this.service.api91msgtokens().subscribe(data => {
    //   
    //   if (data == "" || data == undefined || data == null) {
    //     this.smscredits = "N.A"
    //   }
    //   else{
    //     this.smscredits = data;
    //   }
    // },
    // (error:any)=>
    // {
    //   console.log(error.url);
    //   //this.ngOnInit();
    // }
    // );
    // // this.service.apicpuloadgetMethod().subscribe(data => {
    // //   this.cpuload = data;
    // //   console.log(data);
    // // });
    // // this.service.apicpuloadgetMethod().subscribe(data =>{

    // //   this.cpuload = data;
    // //   for(var cp = 0; cp < this.cpuload.length; cp++){

    // //     this.servername.push(this.cpuload[cp].DomainName);
    // //     if(this.cpuload[cp].cpu_used ==null){
    // //       this.cpu.push("None");
    // //     }
    // //     else{
    // //       this.cpu.push(this.cpuload[cp].cpu_used);
    // //     }
    // //     this.ram.push(this.cpuload[cp].memoryused);
    // //   }
    // //   console.log(this.cpuload);
    // // });
    // this.service.datapost().subscribe(data => {
    //   

    //   this.DateTime = data;

    //   //console.log('27 > ' + this.DateTime.reportAt);
    // }, (error:any)=>
    // {
    //   console.log(error.url);
    //   //this.ngOnInit();
    // });
    // //console.log('30 > ' + this.DateTime);

    // this.service.apicallLocation(this.inputs).subscribe(data => {
    //   
    //   this.Locations = data
    //   var locName = [], locArray = [], locLon = [];
    //   var lat1 = "17.4295865";// this._commanService.getDefaultLat();
    //   var lon1 = "78.3709647";// this._commanService.getDefaultLng();
    //   var centerLatLng = new google.maps.LatLng(Number(lat1), Number(lon1));
    //   //
    //   this.mapContainer = new google.maps.Map(this.gmap.nativeElement,
    //     {
    //       center: centerLatLng,
    //       zoom: 1,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP,
    //       gestureHandling: 'greedy',
    //       mapTypeControl: false,
    //       streetViewControl: false,
    //     }
    //   );
    //   var image = {
    //     url: "https://cdn-0.emojis.wiki/emoji-pics/microsoft/blue-circle-microsoft.png",
    //     scaledSize: new google.maps.Size(10, 10),
    //     origin: new google.maps.Point(0, 0),
    //     anchor: new google.maps.Point(0, 10),
    //   };
    //   this.Regions = this.Locations.length;
    //   for (var loi = 0; loi < this.Locations.length; loi++) {
    //     const titleLoc = this.Locations[loi].name;
    //     this.marker = new google.maps.Marker({ icon: image, position: { lat: Number(this.Locations[loi].location.split(',')[0]), lng: Number(this.Locations[loi].location.split(',')[1]) }, map: this.mapContainer, title: titleLoc });
    //   }
    // },
    // (error:any)=>
    // {
    //   console.log(error.url);
    //   //this.ngOnInit();
    // }
    // );

  }
  //customerMobileNumber:any;
  customerName:any;
  customerEmailId:any;
  customerId:any;
  licenseTable:any;
  fromDateTime:any;
  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth();
  currentDay: number = this.today.getDate();
  currentTime: number = this.today.getHours();
  currentMinute:number = this.today.getMinutes();
  minDate: any;// =  new Date(this.currentYear, this.currentMonth, this.currentDay);
  getClientId(clientId:any){
    debugger
    this.minDate = this.today.getFullYear() + "-0" +  (this.today.getMonth() + 1).toString() + "-" + this.today.getDate();
    //this.minDate = "2023-03-21";
    this.customerId = clientId;
    this.licenseTable = this.licenseTableDetails.filter(value => value.clientId.toLowerCase().includes(this.customerId));
  }
  generateLicense(){
    if(!this.customerEmailId){
      alert('Please Enter Customer EmailId');
    }
    else if(!this.customerName){
      alert('Please Enter Customer Name');
    }
    // else if(!this.customerMobileNumber){
    //   alert('Please Enter Customer Mobile Number');
    // }
    else {
      debugger
      //ilter(value => value.clientId.toLowerCase().includes(this.customerId)to
      var count = this.licenseTable.filter(value => value.customerName.toLowerCase().includes(this.customerName.toLowerCase())&&value.customerMailId.toLowerCase().includes(this.customerEmailId.toLowerCase())).length;//&&value.customerMobileNumber.toLowerCase().includes(this.customerMobileNumber.toLowerCase())
      if(count == 1){
        alert('Customer already Exist!!');
      }
      else {
        var send = { "customerId": this.customerId ,"customerName":this.customerName, "customerMailId":this.customerEmailId};//, "customerMobileNumber":this.customerMobileNumber    
        this.service.apiinsertLicense(send).subscribe(data => {
          if(data == "updated"){
            alert('License Generated Sucessfully!!');
            this.customerEmailId = "";
            //this.customerMobileNumber = "";
            this.customerName = "";
            this.getTotalDetails();
          }
        });
      }
    }
  }
  Search() {
    this.windowsclose();
    //this.FilteredDetails = this.Details.filter(value => value.domain.toLowerCase().includes(this.searchText.toLowerCase()) || value.subDomain.toLowerCase().includes(this.searchText.toLowerCase()) || value.C_CID.includes(this.searchText.toLowerCase()));
    this.FilteredDetails = this.TableDetails.filter(value => value.domain.toLowerCase().includes(this.searchText.toLowerCase()) || value.subDomain.toLowerCase().includes(this.searchText.toLowerCase()) || value.C_CID.includes(this.searchText.toLowerCase()));
  }
  mailConfig() {
    this.windowsclose();
    this.Modals.open();
  }
  select() {
    this.windowsclose();
    var value = this.selectValue;
    if (value == "Top Five subDomain") {
      this.selectValue1 = 5;
      this.chartdata(this.selectValue1);
    }
    else if (value == "Top Three subDomain") {
      this.selectValue1 = 3;
      this.chartdata(this.selectValue1);
    }
    else if (value == "Bottom Five subDomain") {
      this.selectValue1 = -5;
      this.chartdata(this.selectValue1);
    }
    else {
      this.selectValue1 = -3;
      this.chartdata(this.selectValue1);
    }
  }
  windowsclose() {
    var cs = [];
    cs = document.cookie.split('; ');
    //console.log(cs);
    var key = cs.forEach(element => {
      if (element.startsWith("logout=")) {
        this.logkey = element.split("=")[1];
      }
    });
    //console.log(this.logkey);
    if (this.logkey == "im_going") {
      localStorage.clear();
      window.location.reload()
    }
  }
  TableDetails = [];
  getTotalDetails() {
    this.service.apiGetLicenseTable().subscribe(data => {
      this.licenseTableDetails = data;
      var licenseCount: number = 0;
      this.TableDetails = [];
      this.Details.forEach(element => {

        licenseCount = this.licenseTableDetails.filter(value => value.clientId.toLowerCase().includes(element.C_CID)).length;
        let data = {"C_CID":element.C_CID,
        "domain" : element.domain,
        "portal": element.portal,
        "subDomain" : element.subDomain,
         "ReportingTot" : element.ReportingTot,
        "notReporting" : element.notReporting,
        "Good" : element.Good,
        "Warning" : element.Warning,
        "Critical" : element.Critical,
        "License":licenseCount
        }
        this.TableDetails.push(data);
      });
      this.licenseTable = this.licenseTableDetails.filter(value => value.clientId.toLowerCase().includes(this.customerId)); 
      this.FilteredDetails = this.TableDetails;
      for (var i = 0; i < this.Details.length; i++) {
        this.totalDevice += parseInt(this.Details[i].totalDevice);
        this.totalReporting += parseInt(this.Details[i].reporting);
        this.totalNotReporting += parseInt(this.Details[i].notReporting);
        this.subDomain.push(this.Details[i].subDomain);
        this.domain.push(this.Details[i].domain);
        this.totalSubDomain = parseInt(this.Details.length);
        this.Devices.push(this.Details[i].reporting + "/" + this.Details[i].totalDevice);
        if (parseInt(this.Details[i].reporting) == 0 || parseInt(this.Details[i].totalDevice) == 0) {
          this.reporting.push(0);
        }
        else {
          this.reporting.push(Math.round(parseInt(this.Details[i].reporting) / parseInt(this.Details[i].totalDevice) * 100));
        }
      }
      this.chartdata(this.selectValue1);
    });
  }
  Logout() {
    if (localStorage.getItem("centralLogin") == "central") {
      localStorage.clear();
      window.location.href = 'https://adminiot.iotsolution.net/Central_Dashboard/Dashboard'
      //this.Router.navigateByUrl("https://adminiot.iotsolution.net/ClientSummary/DgTrakmis");
    }
    else {
      localStorage.clear();
      this.Router.navigate(['./']);
    }
    //localStorage.clear();
    //this.Router.navigate(['./']);
  }
  chartdata(selectValue1: any) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    var unique = this.domain.filter(onlyUnique).sort();
    this.totalDomain = unique.length;

    for (var ic = 0; ic < unique.length; ic++) {

      // for(var cp = 0; cp < this.cpuload.length; cp++){
      //   
      //   if(unique[ic] == this.cpuload[cp].DomainName){
      //     //var legend = "Domain:" + this.cpuload[cp].DomainName +"   "+"CPU:"+this.cpuload[cp].cpu_used +"%"+"   "+"RAM:"+ this.cpuload[cp].memoryused+"%";
      //     // this.ram1 = this.cpuload[cp].memoryused;
      //     // this.cpu1 = this.cpuload[cp].cpu_used;
      //     this.ram.push(this.cpuload[cp].DomainName);
      //     if(this.cpuload[cp].cpu_used == null){
      //       this.cpu.push(0);
      //     }
      //     else{
      //       this.cpu.push(this.cpuload[cp].cpu_used);
      //     }
      //     this.servername.push(this.cpuload[cp].memoryused);
      //     break;
      //   }
      //   else{
      //     this.ram.push("subzeroiot.com");
      //     this.cpu.push("None");
      //     this.servername.push("None");
      //      //legend = "Domain:" + unique[ic]; 
      //   }
      // }
      // console.log(this.servername);
      // //console.log(this.cpu);
      var subDomainval1 = [], Reportingval = [], goodState = [], warningState = [], criticalState = [], TotalDevices = [], ReportingDevices = [];
      for (var id = 0; id < this.Details.length; id++) {
        if (this.Details[id].domain == unique[ic]) {
          subDomainval1.push(this.Details[id].subDomain)
          TotalDevices.push(parseInt(this.Details[id].totalDevice));
          ReportingDevices.push(parseInt(this.Details[id].reporting));
          goodState.push(parseInt(this.Details[id].Good));
          warningState.push(parseInt(this.Details[id].Warning));
          criticalState.push(parseInt(this.Details[id].Critical));
        }
      }
      var test = ReportingDevices.concat();
      var len = test.length;
      var indices = new Array(len);
      for (var i = 0; i < len; ++i) indices[i] = i;
      //indices.sort(function (a, b) { return test[b] < test[a] ? -1 : test[b] > test[a] ? 1 : 0; });
      // if(this.selectValue1 == 3 || this.selectValue1 == 5){
      //   var top3ReportingIndex = indices.slice(0,selectValue1);
      // }
      // else if(this.selectValue1 == -3){
      //   var top3ReportingIndex = indices.slice(indices.length-3,indices.length);
      // }
      // else{
      //   var top3ReportingIndex = indices.slice(indices.length-5,indices.length);
      // }
      if (this.selectValue1 == 3 || this.selectValue1 == 5) {
        indices.sort(function (a, b) { return test[b] < test[a] ? -1 : test[b] > test[a] ? 1 : 0; });
        var top3ReportingIndex = indices.slice(0, selectValue1);
      }
      else if (this.selectValue1 == -3 || this.selectValue1 == -5) {
        indices.sort(function (a, b) { return test[a] < test[b] ? -1 : test[a] > test[b] ? 1 : 0; });
        var top3ReportingIndex = indices.slice(0, Math.abs(selectValue1));
      }
      var top3subDomain = [], top3totdevices = [], top3good = [], top3warning = [], top3critical = [], top3Reporting = [];
      for (var ri = 0; ri < top3ReportingIndex.length; ri++) {
        top3Reporting.push(ReportingDevices[top3ReportingIndex[ri]]);
        top3subDomain.push(subDomainval1[top3ReportingIndex[ri]]);
        top3totdevices.push(TotalDevices[top3ReportingIndex[ri]]);
        top3good.push(goodState[top3ReportingIndex[ri]]);
        top3warning.push(warningState[top3ReportingIndex[ri]]);
        top3critical.push(criticalState[top3ReportingIndex[ri]]);
      }
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
        }, {
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
          //text: unique[ic],
          //text:legend,
          fontFamily: 'Times New Roman',
          align: "left"
        },
        fill: {
          opacity: 1
        },
        legend: {
          show: false
        },
      };
      var name = '#chart' + (ic + 1);
      document.querySelector(name).innerHTML = "";
      var chart = new apexChart(document.querySelector(name), chartOptions);
      chart.render();
    }
    // setTimeout (() => {
    //   this.download()
    // }, 5000);
  }
  sslCertificatDetails() {
    //
    for (var sd = 0; sd < this.SSLCertificateData.length; sd++) {
      this.domainname.push(this.SSLCertificateData[sd].domain);
      this.ExpiryDate.push(this.SSLCertificateData[sd].expTime);
      this.severity.push(this.SSLCertificateData[sd].severity);
    }
  }
  LocationData() {
    var locName = [], locArray = [], locLon = [];
    var lat1 = "17.4295865";// this._commanService.getDefaultLat();
    var lon1 = "78.3709647";// this._commanService.getDefaultLng();
    var centerLatLng = new google.maps.LatLng(Number(lat1), Number(lon1));
    //
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
    var image = {
      url: "https://cdn-0.emojis.wiki/emoji-pics/microsoft/blue-circle-microsoft.png",
      scaledSize: new google.maps.Size(10, 10),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 10),
    };
    this.Regions = this.Locations.length;
    for (var loi = 0; loi < this.Locations.length; loi++) {
      const titleLoc = this.Locations[loi].name;
      this.marker = new google.maps.Marker({ icon: image, position: { lat: Number(this.Locations[loi].location.split(',')[0]), lng: Number(this.Locations[loi].location.split(',')[1]) }, map: this.mapContainer, title: titleLoc });
    }
  }


}


