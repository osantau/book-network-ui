import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Token {

  constructor() { }

  set token(token:string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string ;
  }

  getAppToken():string {
    return localStorage.getItem('token') as string ;
  }
}
