import { HttpClient } from '@angular/common/http';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DgtrackserviceService {
  
  constructor(private _http:HttpClient) { }
  datapost(){
    var obj: any = [];
     return this._http.post('https://adminiot.iotsolution.net/summarydetails/API/Client/getDateTime', obj)
    //return this._http.post('http://adminiot.iotsolution.net/summaryAPI2/API/Client/getDateTime', obj);
  }
  apicallLocation(inputs:any){
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/regions';

    const headers = {'Content-Type':'application/json'};  

    const body=JSON.stringify(inputs);

    console.log(body);
    return this._http.post(url,body,{'headers':headers}); 
  }
  apicall(inputs:any){

    //let url='http://adminiot.iotsolution.net/summaryAPI2/API/Client/Details';
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/ClientData';

    const headers = {'Content-Type':'application/json'};  

    const body=JSON.stringify(inputs);

    console.log(body);
    return this._http.post(url,body,{'headers':headers}); 
  }
  apimail(mailInputs:any){
    //https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail
    let url = 'https://adminiot.iotsolution.net/summarydetails/API/Client/SendMail';

    const headers = {'Content-Type':'application/json'};  

    const body=JSON.stringify(mailInputs);

    console.log(body);
    return this._http.post(url,body,{'headers':headers}); 
  }
  apimailconfig(mailConfigInputs){
    let url = 'https://localhost:44308/API/Client/MailConfig';

    const headers = {'Content-Type':'application/json'};  

    const body=JSON.stringify(mailConfigInputs);

    console.log(body);
    return this._http.post(url,body,{'headers':headers});
  }
}
