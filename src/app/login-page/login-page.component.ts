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
  
  login(){
     debugger
     this.service.apiaccess().subscribe(data => {
      this.accesskey = data;
      //console.log(this.accesskey);
      if(this.username == "superadmin@iotsolution.net" && this.accesskey == this.password){
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
