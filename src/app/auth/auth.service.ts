import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  $authObservable : Subject<any> = new Subject();

 constructor(private _http : HttpClient,
            private _router : Router,
            private _cookieService : CookieService) { }

  login(authDetails : any){
    this._http.post('http://localhost:3000/authenticate' , authDetails)
    .subscribe((data : any)=>{
      if(data.isLoggedIn){
        this._cookieService.set('token', data.token);
        this.$authObservable.next(data.token);
        this._router.navigate(['/home']);
      }
      else{
        alert("Invalid credentials");
      }
    });
  }

  logout(){
    this._cookieService.delete('token');
    this.$authObservable.next(false);
    this._router.navigate(['/login']);
  }

  checkUserStatus(){
    return this._cookieService.get('token');
  }
}
