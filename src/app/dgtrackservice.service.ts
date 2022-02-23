import { HttpClient } from '@angular/common/http';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DgtrackserviceService {

  constructor(private _http: HttpClient) { }
  datapost() {
    var obj: any = [];
    // return this._http.post('https://adminiot.iotsolution.net/summarydetails/API/Client/getDateTime', obj)
    // return this._http.post('https://localhost:44308/API/Client/getDateTime', obj)
    return this._http.post('https://adminiot.iotsolution.net/summaryAPI2/API/Client/getDateTime', obj);
  }
  apicallLocation(inputs: any) {
    let url = 'https://adminiot.iotsolution.net/summaryAPI2/API/Client/regions';
    // let url = 'https://localhost:44308/API/Client/regions';

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(inputs);

    console.log(body);
    return this._http.post(url, body, { 'headers': headers });
  }
  apicall(inputs: any) {

<<<<<<< HEAD
    let url='https://adminiot.iotsolution.net/summaryAPI2/API/Client/ClientData';
    // let url = 'https://localhost:44308/API/Client/ClientData';
=======
    //let url='http://adminiot.iotsolution.net/summarydetails/API/Client/ClientData';
    let url = 'http://adminiot.iotsolution.net/summarydetails/API/Client/ClientData';
>>>>>>> 636173ce57ec9e08c71caabb911afd432b2e9a79

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(inputs);

    console.log(body);
    return this._http.post(url, body, { 'headers': headers });
  }
<<<<<<< HEAD
  apimail(mailInputs: any) {
    //https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail
    let url = 'https://adminiot.iotsolution.net/summaryAPI2/API/Client/SendMail';
=======
  apimail(mailInputs:any){
    //https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail 
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail';
>>>>>>> 636173ce57ec9e08c71caabb911afd432b2e9a79

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(mailInputs);

    console.log(body);
    return this._http.post(url, body, { 'headers': headers });
  }
  apimailconfig(mailConfigInputs) {
    //let url = 'https://localhost:44308/API/Client/MailConfig';
    let url =  'https://adminiot.iotsolution.net/summaryAPI2/API/Client/MailConfig';

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(mailConfigInputs);

    console.log(body);
    return this._http.post(url, body, { 'headers': headers });
  }
  apicpuloadgetMethod() {
    let url =  'https://adminiot.iotsolution.net/summaryAPI2/API/Client/memory';
    return this._http.get(url);
  }
}
