import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {

  pageTitle: string = "Products List";
  products: any = [];
  addedProducts:any =[];
  filterBy : string ;

  showHideImage: boolean = true;

  constructor(private _productService: ProductsService) { }

  ngOnInit() {
    this._productService.getProducts()
    .subscribe((data)=>{
      this.products = data;
    });
  }


  toggleImage() {
    this.showHideImage = !this.showHideImage;
  }
  ratingFnParent(data: string) {
    this.pageTitle = data;
  }
}
