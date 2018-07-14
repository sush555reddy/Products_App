import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
  providers:[ProductsService]
})
export class AddProductsComponent implements OnInit {

  product: any = {};

  constructor(private productService: ProductsService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  add() {
    console.log(this.product);
    this.productService.addProduct(this.product);
    // this.http.post('http://localhost:3000/addProducts' , this.product)
  }

}
