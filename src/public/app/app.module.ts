import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {HttpModule} from "@angular/http";
import {StocksListComponent} from "./stock.list.component";
import {SearchStockComponent} from "./search.stock.component";
import {PoolingService} from "./pooling.service";
import {StockFetcherService} from "./stock.fetcher.service";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login.component";
import {PrivateComponent} from "./private.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthenticationService} from "./auth.service";
import {AuthGuard} from "./auth.guard";
import {HomeComponent} from "./home.component";
import {RegisterComponent} from "./register.component";
import {UserService} from "./user.service";
import {AlertService} from "./alert.service";


const appRoutes: Routes = [
    { path: '', component: AppComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes)],
  declarations: [
      AppComponent, HomeComponent, StocksListComponent, SearchStockComponent, LoginComponent, PrivateComponent, RegisterComponent
  ], providers : [PoolingService, StockFetcherService, AuthenticationService, AuthGuard, UserService, AlertService],
  bootstrap:    [ AppComponent],
})
export class AppModule { }
