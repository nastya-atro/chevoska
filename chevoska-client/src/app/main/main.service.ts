import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../core/services/api.service";

@Injectable({
  providedIn: 'root',
})
export class MainService implements OnDestroy {

  constructor(private api: ApiService) {}

  ngOnDestroy(): void {}

  getCurrentProfile(){
    return this.api.get(`/system/currentUser`);
  }

  login(params: any){
    return this.api.post(`/system/login`, { ...params });
  }

  logout(){
    return this.api.post(`/system/logout`);
  }

  getUsers(){
    return this.api.get(`/system/users`);
  }




}
