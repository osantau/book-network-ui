import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Token } from '../token/token';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: Token) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.tokenService.token;

    if (token) {
      const authReq: HttpRequest<any> = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      });    
      console.log(authReq);
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
