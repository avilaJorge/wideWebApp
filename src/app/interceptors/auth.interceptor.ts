import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userInfo = this.authService.getUserInfo();
    // Always make a copy of the HttpRequest.  You can add more header data
    // by using the set method which doesn't override non-existent fields.
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer' + userInfo.token)
    });
    return next.handle(authRequest);
  }
}
