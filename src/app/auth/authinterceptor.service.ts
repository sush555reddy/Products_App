import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpHeaders } from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private _authService : AuthService) { }

  intercept(req, next){
    var token = this._authService.checkUserStatus();
    // console.log("token value" ,token)
    var authRequest = req.clone({
      headers : new HttpHeaders().set('authtoken',token)
    });
    // console.log("auth req" , authRequest)
    return next.handle(authRequest);
  }
}
