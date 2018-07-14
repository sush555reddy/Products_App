import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProductsService {

  products: any = [];

  constructor(private _http: HttpClient,
              private _authService: AuthService) { }

  getProducts() {
    return this._http.get('http://localhost:3000/getProducts');
  }

  addProduct(data){
     this._http.post('http://localhost:3000/addProducts' , data)
     .subscribe((data)=>{

     });
  }

}
