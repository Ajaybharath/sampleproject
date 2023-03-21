import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DgtrackserviceService {

  constructor(private _http: HttpClient) { }
 // url = 'https://adminiot.iotsolution.net/summarydetails/API/TotalClientData/';
 url = 'https://localhost:44308/API/TotalClientData/';
  apicall(inputs: any) {
    debugger
    //let url='https://adminiot.iotsolution.net/summarydetails/API/TotalClientData/ClientData';
    //let url = 'https://localhost:44308/API/TotalClientData/ClientData';

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(inputs);

    //console.log(body);
    return this._http.post(this.url + 'ClientData', body, { 'headers': headers });
  }
  // apimail(mailInputs: any) {
  //   //https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail
  //   let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail';

  //   const headers = { 'Content-Type': 'application/json' };

  //   const body = JSON.stringify(mailInputs);

  //   //console.log(body);
  //   return this._http.post(url, body, { 'headers': headers });
  // }
  apimailconfig(mailConfigInputs) {
    debugger
    //let url = 'https://localhost:44323/API/Client/MailConfig';
    //let url =  'https://adminiot.iotsolution.net/summarydetails/API/TotalClientData/MailConfig';

    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(mailConfigInputs);

    //console.log(body);
    return this._http.post(this.url + 'MailConfig', body, { 'headers': headers });
  }
  apiaccess(){
    debugger
    var obj: any = [];
    //let url = 'https://localhost:44323/API/Client/Access'
    //let url = 'https://adminiot.iotsolution.net/summarydetails/API/TotalClientData/Access';
    return this._http.post(this.url + 'Access', obj);
  }
  apiGetLicenseTable(){
    
    return this._http.get(this.url + 'GetLicenseTable');
  }
  apiinsertLicense(licenseDetails){
    const headers = { 'Content-Type': 'application/json' };

    const body = JSON.stringify(licenseDetails);

    //console.log(body);
    return this._http.post(this.url + 'InsertLicense', body, { 'headers': headers });
  }
  getacceskey() {

    debugger

    const HTTPOPTIONS = {



      headers: new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': 'auth-token',

        'Access-Control-Allow-origin': '*'



      })    

        };



    return this._http.get("https://adminiot.iotsolution.net/Central_Dashboard_api/api/supportkey");

  }
  // datapost() {
  //   debugger
  //   var obj: any = [];
  //    //return this._http.post('https://adminiot.iotsolution.net/summarydetails/API/Client/getDateTime', obj)
  //  //return this._http.post('https://localhost:44323/API/Client/getDateTime', obj)
  //   return this._http.post('https://adminiot.iotsolution.net/summarydetails/API/Client/getDateTime', obj);
  // }
  // apicallLocation(inputs: any) {
  //   debugger
  //   let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/regions';
  //   //let url = 'https://localhost:44323/API/Client/regions';

  //   const headers = { 'Content-Type': 'application/json' };

  //   const body = JSON.stringify(inputs);

  //   //console.log(body);
  //   return this._http.post(url, body, { 'headers': headers });
  // }
  // apicpuloadgetMethod() {
  //   let url =  'https://localhost:44308/API/Client/memory';//https://adminiot.iotsolution.net/summarydetails/API/Client/memory
  //   return this._http.get(url);
  // }
  // api91msgtokens(){
  //   debugger
  //   let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/SMSTOKEN';
  //   //let url =  'https://localhost:44323/API/Client/SMSTOKEN';
  //   return this._http.get(url);
  // }
  // apiSSLCertificateDetails(){
  //   debugger
  //   //let url =  'https://localhost:44323/API/Client/SSLExpDate';
  //   let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/SSLExpDate';
  //   return this._http.get(url);
  // }

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