import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, handler: HttpHandler) {
    let token = localStorage.getItem('token');
    if (token) {
      let headers: HttpHeaders = new HttpHeaders().set('token', token);
      let requestClone = request.clone({ headers: headers });
      return handler.handle(requestClone);
    }
    return handler.handle(request);
  }
}
