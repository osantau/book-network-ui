import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../token/token-service';
import { inject } from '@angular/core';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.token;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(req);
  }
  return next(req);
};
