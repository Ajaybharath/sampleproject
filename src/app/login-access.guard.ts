import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAccessGuard implements CanActivate {
  constructor(public rou:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(localStorage.getItem("login") == "true"){
        return true;
      }
      else{
        this.rou.navigate(["Login"]);
        return false;
      }
  }
}
