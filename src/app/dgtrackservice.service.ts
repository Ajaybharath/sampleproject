import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DgtrackserviceService {
  
  constructor(private _http:HttpClient) { }
  datapost(){
    var obj: any = [];
     return this._http.post('https://localhost:44308/API/Client/getDateTime', obj)
    //return this._http.post('http://adminiot.iotsolution.net/summaryAPI2/API/Client/getDateTime', obj);
  }
  apicallLocation(inputs:any){
    let url = 'https://localhost:44308/API/Client/regions';

    const headers = {'Content-Type':'application/json'};  

    const body=JSON.stringify(inputs);

    console.log(body);
    return this._http.post(url,body,{'headers':headers}); 
  }
  apicall(inputs:any){

    //let url='http://adminiot.iotsolution.net/summaryAPI2/API/Client/Details';
    let url = 'https://localhost:44308/API/Client/ClientData';

    const headers = {'Content-Type':'application/json'};  

    const body=JSON.stringify(inputs);

    console.log(body);
    return this._http.post(url,body,{'headers':headers}); 
  }
}
