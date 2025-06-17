import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../token/token';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = inject(Token).getAppToken();
  if (token) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }
  return next(req);
};
