import { ThrowStmt } from '@angular/compiler';
import { mapToExpression } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit} from '@angular/core';
import { DgtrackserviceService } from '../dgtrackservice.service';
@Component({
  selector: 'app-dgtrakmis',
  template: `
    <div class="table1">
    <table>
    <tr>
    <td style="background-color:	rgb(100, 181, 246);" class="size">Total Devices<br/><div class="size1">{{totalDevice}}</div></td>&nbsp;
    <td style="background-color:	rgb(129, 199, 132);" class="size">Reporting<br/><div class="size1">{{totalReporting}}</div></td>&nbsp;
    <td style="background-color:	rgb(97, 97, 97);" class="size">Not Reporting<br/><div class="size1">{{totalNotReporting}}</div></td>&nbsp;
    <td style="background-color:	rgb(206, 147, 216);" class="size">Domain<br/><div class="size1">{{totalDomain}}</div></td>&nbsp;
    <td style="background-color:	rgb(240, 98, 146);" class="size">Sub Domain<br/><div class="size1">{{totalSubDomain}}</div></td>&nbsp;
    <td style="background-color:	rgb(76, 175, 80);" class="size">Regions/Loc.<br/><div class="size1">{{Regions}}</div></td>&nbsp;
    <td style="background-color:white;color:black;width:210px;height:80px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;font-family:Verdana;border-radius:5px"><div style="background-color:rgb(97, 97, 97);padding:5px;top: 0;color:white">Report At:</div><br/><div style="font-size:15px">{{DateTime.reportAt}}</div></td>
    </tr>
    </table>
    </div>
    <br/><br/>
    <div>
    <div>
    <th style="width:20px"></th><th style="width: 120px;">Domain</th><th style="width: 120px;">Sub Domain</th><th>Total Device</th><th>Reporting</th><th>Not Reporting</th><th>Reporting%</th>
    </div>
    <div style="overflow-y: scroll; height:400px; width: 775px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px; ">
    <table>
    <tr *ngFor="let user of Details;let i = index" [ngStyle]="{'background-color':i%2==0?' #FFFF':'#D8DFEE'}">
    <td style="width:20px">{{i+1}}.</td>
    <td style="width: 120px;">{{user.domain}}</td>
    <td style="width: 120px;"><a href="{{user.portal}}" target="_blank" rel="noopener noreferrer">{{user.subDomain}}</a></td>
    <td>{{user.totalDevice}}</td>
    <td>{{user.reporting}}</td>
    <td>{{user.notReporting}}</td>
    <td>{{reporting[i]}}</td>
    </tr>
    </table>
    </div>
    </div>
    
  `,
  styles: [
    `
    
    `
  ]
})
export class DGTRAKMISComponent implements OnInit {
  DateTime: any = [];
  Details: any = [];
  reporting: any = [];
  domain: any = [];
  
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
      console.log(unique);
      this.totalDomain = unique.length;
    }
    );
    this.service.datapost().subscribe(data => {
      this.DateTime = data;
      
      console.log('27 > ' + this.DateTime.reportAt);
    });
    console.log('30 > ' + this.DateTime);
    
  }
}
