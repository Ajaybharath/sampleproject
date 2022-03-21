import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DgtrackserviceService } from 'src/app/dgtrackservice.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private Router:Router,private service: DgtrackserviceService) { }
  username: any; password: any;Massage:any;accesskey:any;
  log : any; UserId :any;
  isLoading = false;
  inputs = { "uid": "idea", "pwd": "bytes" };
  ngOnInit() {
    this.isLoading = true;
    this.service.apicall(this.inputs).subscribe(data => {
      //this.Details = data
      if (data) {
        this.isLoading = false;
      }
    });
  }
  fieldTextType: boolean;
  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
  }
  login(){
     debugger
     this.service.apiaccess().subscribe(data => {
      debugger
      this.log = data;
      this.accesskey = this.log.Password;
      this.UserId = this.log.UserId;
      console.log(this.accesskey);
      console.log(this.UserId);
      if(this.username.toLowerCase() == this.UserId.toLowerCase() && this.accesskey == this.password){//support@ideabytesiot.com
        this.Router.navigate(['./DgTrakmis']);
      }
      else if(this.username == "" && this.password == "" || this.username == undefined && this.password == undefined){
        alert("Please Enter All Required Fields");
      }
      else if(this.username == "" || this.username == undefined){
        alert("UserId is Required");
      }
      else if(this.password == "" || this.password == undefined){
        alert("Password is Required");
      }
      else{
        alert("Invalid Credentials");
      }
    }); 

  }
}
