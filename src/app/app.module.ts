import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './auth/home/home.component';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { ProductsComponent } from './products/products/products.component';
import { CreateComponent } from './products/create/create.component';
import { DetailComponent } from './products/detail/detail.component';
import { ProductsPipe } from './products/products.pipe';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { RatingComponent } from './products/rating/rating.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    ProductsComponent,
    CreateComponent,
    DetailComponent,
    ProductsPipe,
    AddProductsComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "products", component: ProductsComponent, canActivate: [AuthGuard],
        children: [
          { path: "create", component: CreateComponent }
        ]
      },
      { path: "products/:pcode", component: DetailComponent },
      {path: "addproducts" , component: AddProductsComponent},
      { path: "home", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home" }

    ])

  ],
  providers: [AuthService, CookieService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
