import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-mailconfig-model',
  templateUrl: './mailconfig-model.component.html',
  styleUrls: ['./mailconfig-model.component.css']
})
export class MailconfigModelComponent implements OnInit {

  @ViewChild('myModal') modal: ElementRef;

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
  constructor() { }

  ngOnInit() {
  }

}
