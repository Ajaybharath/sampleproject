import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DgtrackserviceService } from 'src/app/dgtrackservice.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private Router: Router, private service: DgtrackserviceService) { }
  username: any=""; password: any=""; Massage: any; accesskey: any="";
  log: any; UserId: any = "";
  isLoading = false;
  mainkey: string;
  inputs = { "uid": "idea", "pwd": "bytes" };
  cookie: string = "IOT#49";
  ngOnInit() {
    // this.isLoading = true;
    // this.service.apicall(this.inputs).subscribe(data => {
    //   //this.Details = data
    //   if (data) {
    //     this.isLoading = false;
    //   }
    // });

    
    var cs = [];

    // //const cookieValue = document.cookie.split('; ').find(row => row.startsWith('summary=')).split('=')[1];
    cs = document.cookie.split('; ');
    var key = cs.forEach(element => {
      if (element.startsWith("summarykey=")) {
        this.mainkey = element.split("=")[1];
      }
     });
    if (this.mainkey == "summary%23ibiot.com") {
      var login = "true";
      localStorage.setItem('login', login)
      localStorage.setItem('centralLogin',"central")
      this.Router.navigate(['./DgTrakmis']);
    }
    //document.cookie = "user=Jack; path=/; expires=Mon, 11 Apr 2020 04:25:18 GMT"
  }
  //fileUpload
  // shortLink: string = "";
  // loading: boolean = false; // Flag variable
  // file: File = null;
  // data : any;
  // // On file Select
  // onChange(event) {
  //   this.file = event.target.files[0];
  // }
 

  // // OnClick of button Upload
  // onUpload() {
  //   debugger
  //   this.loading = !this.loading;
  //   console.log(this.file);
  //   this.service.apifileupload(this.file).subscribe(data => {
  //     this.data = data;
  //     console.log(data);
  //   }
  //       // (event: any) => {
  //       //     if (typeof (event) === 'object') {

  //       //         // Short link via api response
  //       //         this.shortLink = event.link;

  //       //         this.loading = false; // Flag variable 
  //       //     }
  //       // }
  //   );
  // }



  fieldTextType: boolean;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  login() {
    debugger
    this.service.apiaccess().subscribe(data => {
      debugger
      this.log = data;
      this.accesskey = this.log.Password;
      this.UserId = this.log.UserId;
      //console.log(this.accesskey);
      //console.log(this.UserId);
      if (this.username.toLowerCase() == this.UserId.toLowerCase() && this.accesskey == this.password) {//support@ideabytesiot.com
        var login = "true";
        localStorage.setItem('login', login)
        this.Router.navigate(['./DgTrakmis']);
      }
      else if (this.username == "" && this.password == "" || this.username == undefined && this.password == undefined) {
        alert("Please Enter All Required Fields");
      }
      else if (this.username == "" || this.username == undefined) {
        alert("UserId is Required");
      }
      else if (this.password == "" || this.password == undefined) {
        alert("Password is Required");
      }
      else {
        alert("Invalid Credentials");
      }
    });

  }
}
