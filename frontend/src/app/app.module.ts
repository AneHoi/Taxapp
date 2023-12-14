import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withJsonpSupport} from "@angular/common/http";
import {AppComponent} from './app.component';
import {ConfirmPriceComponent} from './confirm-price/confirm-price.component'

import {MapsComponent} from "./maps/maps.component";
import {HomePage} from "./home/home.page";
import {LoginPage} from "./login/login.page";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {CommonModule} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule} from "@ionic/angular";
import { RegisterComponent } from "./register/register.component";
import { HeaderComponent } from "./header/header.component";
import { TokenService } from "src/TokenService";
import { AuthHttpInterceptor } from "src/interceptors/auth-http-interceptor";

const routes: Routes = [
  { component: HomePage,            path: 'home'      },
  { component: LoginPage,           path: 'login'     },
  { component: RegisterComponent,   path: 'register'  }
];

@NgModule({
  declarations: [AppComponent, MapsComponent, HomePage, LoginPage, HeaderComponent, ConfirmPriceComponent, RegisterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule.forRoot(routes), GoogleMapsModule, CommonModule, RouterModule, BrowserModule, IonicModule.forRoot({mode: 'ios'}), HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    provideHttpClient(withJsonpSupport()), TokenService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
