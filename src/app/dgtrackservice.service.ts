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
    return this._http.post('https://adminiot.iotsolution.net/summarydetails/API/Client/getDateTime', obj);
  }
  apicallLocation(inputs: any) {
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/regions';
    // let url = 'https://localhost:44308/API/Client/regions';

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(inputs);

    console.log(body);
    return this._http.post(url, body, { 'headers': headers });
  }
  apicall(inputs: any) {
    let url='https://adminiot.iotsolution.net/summarydetails/API/Client/ClientData';
     //let url = 'https://localhost:44308/API/Client/ClientData';

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(inputs);

    console.log(body);
    return this._http.post(url, body, { 'headers': headers });
  }
  apimail(mailInputs: any) {
    //https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail';

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(mailInputs);

    console.log(body);
    return this._http.post(url, body, { 'headers': headers });
  }
  apimailconfig(mailConfigInputs) {
    //let url = 'https://localhost:44308/API/Client/MailConfig';
    let url =  'https://adminiot.iotsolution.net/summarydetails/API/Client/MailConfig';

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(mailConfigInputs);

    console.log(body);
    return this._http.post(url, body, { 'headers': headers });
  }
  apiaccess(){
    var obj: any = [];
    //let url = 'https://localhost:44308/API/Client/Access'
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/Access';
    return this._http.post(url, obj);
  }
  apicpuloadgetMethod() {
    let url =  'https://adminiot.iotsolution.net/summarydetails/API/Client/memory';
    return this._http.get(url);
  }
  api91msgtokens(){
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/SMSTOKEN';
    //let url =  'https://localhost:44308/API/Client/SMSTOKEN';
    return this._http.get(url);
  }
  apiSSLCertificateDetails(){
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/SSLExpDate';
    return this._http.get(url);
  }

//   apifileupload(file){
//     let url = 'https://adminiot.iotsolution.net/CocacolaSyrupFileUpload/Api/Load/Upload';
// debugger
//     // Create form data
//     const formData = new FormData(); 
        
//     // Store form name as "file" with file data
//     formData.append("file", file, file.name);
      
//     // Make http post request over api
//     // with formData as req
//     //return this.http.post(this.baseApiUrl, formData)
//     return this._http.post(url,formData);
//   }
}