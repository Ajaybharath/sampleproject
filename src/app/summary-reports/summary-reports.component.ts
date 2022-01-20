import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DgtrackserviceService } from '../dgtrackservice.service';

@Component({
  selector: 'app-summary-reports',
  templateUrl: './summary-reports.component.html',
  styleUrls: ['./summary-reports.component.css']
})
export class SummaryReportsComponent implements OnInit {

  DateTime: any = []; Locations: any = []; Details: any = [];
  FilteredDetails: any = []; reporting: any = []; domain: any = [];
  subDomain: any = []; tempReporting: any = []; searchText: any;
  //hideData = false;
  selectValue: any; topval: any;
  // @ViewChild('map') gmap: any;
  // mapContainer: google.maps.Map;
  // marker: google.maps.Marker;
  public totalDevice = 0;
  public totalReporting = 0; public totalNotReporting = 0; public totalDomain = 0; public totalSubDomain = 0; public Regions = 0;
  constructor(private service: DgtrackserviceService) { }
  message: any;
  ishideData = false;
  //formattedDt = formatDate(new Date(), 'yyyy-MM-dd hh mm', 'en_US')//yyyy-MM-dd hh:mm:ssZZZZZ
  
  inputs = { "uid": "idea", "pwd": "bytes" };
  //mailInputs: any;
  selectValue1 = 3;
  ngOnInit() {

    this.service.apicall(this.inputs).subscribe(data => {
      this.Details = data
      this.FilteredDetails = this.Details;
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
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      var unique = this.domain.filter(onlyUnique);
      this.totalDomain = unique.length;
  
      //this.chartdata(this.selectValue1);
      setTimeout (() => {
        this.download()
      }, 5000);
    }
    );

    this.service.datapost().subscribe(data => {
      this.DateTime = data;
      console.log('27 > ' + this.DateTime.reportAt);
    });
    console.log('30 > ' + this.DateTime);
      this.service.apicallLocation(this.inputs).subscribe(data => {
      this.Locations = data
      debugger
      this.Regions = this.Locations.length;
  //     var locName = [], locArray = [], locLon = [];
  //     var lat1 = "17.4295865";// this._commanService.getDefaultLat();
  //     var lon1 = "78.3709647";// this._commanService.getDefaultLng();
  //     var centerLatLng = new google.maps.LatLng(Number(lat1), Number(lon1));
  //     this.mapContainer = new google.maps.Map(this.gmap.nativeElement,
  //       {
  //         center: centerLatLng,
  //         zoom: 1,
  //         mapTypeId: google.maps.MapTypeId.ROADMAP,
  //         gestureHandling: 'greedy',
  //         mapTypeControl: false,
  //         streetViewControl: false,
  //       }
  //     );
  //     var image = {
  //       url: "https://cdn-0.emojis.wiki/emoji-pics/microsoft/blue-circle-microsoft.png",
  //       scaledSize: new google.maps.Size(10, 10),
  //       origin: new google.maps.Point(0, 0),
  //       anchor: new google.maps.Point(0, 10),
  //     };
  //     this.Regions = this.Locations.length;
  //     for (var loi = 0; loi < this.Locations.length; loi++) {
  //       const titleLoc = this.Locations[loi].name;
  //       this.marker = new google.maps.Marker({ icon: image, position: { lat: Number(this.Locations[loi].location.split(',')[0]), lng: Number(this.Locations[loi].location.split(',')[1]) }, map: this.mapContainer, title: titleLoc });
  //     }
    });
  }
  // Search() {
  //   this.FilteredDetails = this.Details.filter(value => value.domain.toLowerCase().includes(this.searchText.toLowerCase()) || value.subDomain.toLowerCase().includes(this.searchText.toLowerCase()) || value.C_CID.includes(this.searchText.toLowerCase()));
  // }
  // select() {
  //   var value = this.selectValue;
  //   if (value == "Top Five subDomain") {
  //     this.selectValue1 = 5;
  //     this.chartdata(this.selectValue1);
  //   }
  //   else if (value == "Top Three subDomain") {
  //     this.selectValue1 = 3;
  //     this.chartdata(this.selectValue1);
  //   }
  //   else if (value == "Bottom Five subDomain") {
  //     this.selectValue1 = -5;
  //     this.chartdata(this.selectValue1);
  //   }
  //   else {
  //     this.selectValue1 = -3;
  //     this.chartdata(this.selectValue1);
  //   }
  // }
  //}
  download() {
    debugger
    //this.ishideData = true;
    const input = document.getElementById('pdfGenerator');//Total Content pdfGenerator
    var epochNow = (new Date).getTime();
    var filename = "DGTRAK MIS REPORT"+ epochNow+".pdf";
    var HTML_Width = input.clientWidth;
    var HTML_Height = input.clientHeight;
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    html2canvas(input as any).then((canvas) => {
      //canvas.getContext('2d');
      console.log(canvas.height + "  " + canvas.width);
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin + 15, top_left_margin + 15, canvas_image_width, canvas_image_height);
      // var pageCount = pdf.internal.getNumberOfPages(); //Total Page Number
      // pdf.setFontSize(10);
      // pdf.text('Copyright © Ideabytes®', 500, PDF_Height - 60, { baseline: 'bottom' });
      // pdf.setFontSize(10);
	    // pdf.text('Checked By', 250, PDF_Height - 60, { baseline: 'bottom' });
      // pdf.text('Reviewed By', 50, PDF_Height - 60, { baseline: 'bottom' });
      // pdf.text('Page ' + 1 + ' of ' + String(pageCount) , PDF_Width - 180, PDF_Height - 60);
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage();
        pdf.addImage(imgData, 'JPG', top_left_margin + 15, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }
      pdf.save(filename);
      // var send = { "MailIds": "kanakaiahrapelli@gmail.com", "Message": "Summary Reports" ,"Filename":filename}; //,ranjithbudida@gmail.com,bharathnathala@gmail.com
      var send = { "Message": "Summary Reports" ,"Filename":filename};    
        this.service.apimail(send).subscribe(data => {
        this.message = data;
        alert(this.message);
        //this.ishideData = false;
      });
    });
  }
  // chartdata(selectValue1: any) {
  //   function onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  //   }
  //   var unique = this.domain.filter(onlyUnique);
  //   this.totalDomain = unique.length;
  //   for (var ic = 0; ic < unique.length; ic++) {

  //     var subDomainval1 = [], Reportingval = [], goodState = [], warningState = [], criticalState = [], TotalDevices = [], ReportingDevices = [];
  //     for (var id = 0; id < this.Details.length; id++) {
  //       if (this.Details[id].domain == unique[ic]) {
  //         subDomainval1.push(this.Details[id].subDomain)
  //         TotalDevices.push(parseInt(this.Details[id].totalDevice));
  //         ReportingDevices.push(parseInt(this.Details[id].reporting));
  //         goodState.push(parseInt(this.Details[id].Good));
  //         warningState.push(parseInt(this.Details[id].Warning));
  //         criticalState.push(parseInt(this.Details[id].Critical));
  //       }
  //     }
  //     var test = ReportingDevices.concat();
  //     var len = test.length;
  //     var indices = new Array(len);
  //     for (var i = 0; i < len; ++i) indices[i] = i;
  //     //indices.sort(function (a, b) { return test[b] < test[a] ? -1 : test[b] > test[a] ? 1 : 0; });
  //     // if(this.selectValue1 == 3 || this.selectValue1 == 5){
  //     //   var top3ReportingIndex = indices.slice(0,selectValue1);
  //     // }
  //     // else if(this.selectValue1 == -3){
  //     //   var top3ReportingIndex = indices.slice(indices.length-3,indices.length);
  //     // }
  //     // else{
  //     //   var top3ReportingIndex = indices.slice(indices.length-5,indices.length);
  //     // }
  //     if (this.selectValue1 == 3 || this.selectValue1 == 5) {
  //       indices.sort(function (a, b) { return test[b] < test[a] ? -1 : test[b] > test[a] ? 1 : 0; });
  //       var top3ReportingIndex = indices.slice(0, selectValue1);
  //     }
  //     else if (this.selectValue1 == -3 || this.selectValue1 == -5) {
  //       indices.sort(function (a, b) { return test[a] < test[b] ? -1 : test[a] > test[b] ? 1 : 0; });
  //       var top3ReportingIndex = indices.slice(0, Math.abs(selectValue1));
  //     }
  //     var top3subDomain = [], top3totdevices = [], top3good = [], top3warning = [], top3critical = [], top3Reporting = [];
  //     for (var ri = 0; ri < top3ReportingIndex.length; ri++) {
  //       top3Reporting.push(ReportingDevices[top3ReportingIndex[ri]]);
  //       top3subDomain.push(subDomainval1[top3ReportingIndex[ri]]);
  //       top3totdevices.push(TotalDevices[top3ReportingIndex[ri]]);
  //       top3good.push(goodState[top3ReportingIndex[ri]]);
  //       top3warning.push(warningState[top3ReportingIndex[ri]]);
  //       top3critical.push(criticalState[top3ReportingIndex[ri]]);
  //     }
  //     //debugger
  //     var chartOptions = {
  //       series: [{
  //         name: 'Total',
  //         data: top3totdevices
  //       },
  //       {
  //         name: 'Reporting',
  //         data: top3Reporting
  //       }, {
  //         name: 'Good',
  //         data: top3good
  //       }, {
  //         name: 'Warning',
  //         data: top3warning
  //       }, {
  //         name: 'Critical',
  //         data: top3critical
  //       }
  //       ],
  //       chart: {
  //         type: 'bar',
  //         height: 350
  //       },
  //       plotOptions: {
  //         bar: {
  //           horizontal: false,
  //           columnWidth: '55%',
  //           endingShape: 'rounded'
  //         },
  //       },
  //       dataLabels: {
  //         enabled: false
  //       },
  //       stroke: {
  //         show: true,
  //         width: 2,
  //         colors: ['transparent']
  //       },
  //       xaxis: {
  //         categories: top3subDomain,
  //       },
  //       title: {
  //         text: unique[ic],
  //         fontFamily: 'Times New Roman',
  //         align: "left"
  //       },
  //       fill: {
  //         opacity: 1
  //       },
  //       legend: {
  //         show: false
  //       },
  //     };
  //     var name = '#chart' + (ic + 1);
  //     document.querySelector(name).innerHTML = "";
  //     var chart = new apexChart(document.querySelector(name), chartOptions);
  //     chart.render();
  //   }
  //   
  // }

}
