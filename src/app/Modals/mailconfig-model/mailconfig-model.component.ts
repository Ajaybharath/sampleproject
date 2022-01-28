import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DgtrackserviceService } from 'src/app/dgtrackservice.service';

@Component({
  selector: 'app-mailconfig-model',
  templateUrl: './mailconfig-model.component.html',
  styleUrls: ['./mailconfig-model.component.css']
})
export class MailconfigModelComponent implements OnInit {

  @ViewChild('myModal') modal: ElementRef;
  MultipleMail:any;
  Time:any;
  heroForm:FormGroup;
  mailConfigForm:FormGroup;  
  message:any;
  emailPattern = /^\w+([-+.']\w+)*@gmail.com(, ?\w+([-+.']\w+)*@gmail.com)*$/;

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
  // submit(){
  //   debugger
  //   var time = this.Time;
  //   var mail = this.MultipleMail;
  // }
  constructor(private fb: FormBuilder, private service: DgtrackserviceService) { }
  ngOnInit() {
    // this.mailConfigForm =this.fb.group({
    //   MultipleMail: ['', Validators.required],
    //   Time: ['',Validators.required]
    //   //Time: ['',Validators.required]
    // });
  }
  submit(){
    debugger
    var mailid = this.MultipleMail;
    var time = this.Time;
    if(mailid == undefined || mailid == ""){
      alert("Mailids is Required")
    }
    else if(!mailid.match(this.emailPattern)){
      alert("Mail ids should be in this format i.e;exampleemail@gmail.com with comma separated")
    }
    else if(time == undefined || time == ""){
      alert("Time is Required")
    }
    else{
      var send = { "Mails": mailid ,"Time":time};    
      this.service.apimailconfig(send).subscribe(data => {
      this.message = data;
      alert(this.message);
      this.MultipleMail = "";
      this.Time = "";
      //this.ishideData = false;
      });
    }  
  }
//get f(){return this.mailConfigForm.controls;}
}
