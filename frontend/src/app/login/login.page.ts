import {Component, OnInit} from '@angular/core';
import {State} from 'src/state';
import {firstValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ResponseDto, User} from 'src/models';
import {FormBuilder, Validators} from "@angular/forms";
import {environment} from 'src/environments/environment';
import {ToastController} from "@ionic/angular";
import {UserHandler} from '../userHandler';
import {TokenService} from 'src/TokenService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  currentUser: User | undefined;
  //This is the formbuilder, it is important to SPELL the items as they are spelled in the dto in the API
  loginForm = this.fb.group({
    email: ['', Validators.minLength(2)],
    password: ['', Validators.minLength(8)],
  })

  private subscription: Subscription;
  dynamicLogInOutText: string = 'login';

  constructor(public state: State, private tokenService: TokenService, private userHandler: UserHandler, public http: HttpClient, public fb: FormBuilder, public toastcontroller: ToastController) {
    this.subscription = this.userHandler.logInOutValue$.subscribe((value) => {
      this.dynamicLogInOutText = value;
    })
  }

  ngOnInit() {
  }


  //check if we should login ot logout
  loginOut() {
    if (this.dynamicLogInOutText == 'login'){
      this.login()
    }else {
      this.logout()
    }

  }

  async login() {
    try {
      const observable = this.http.post<ResponseDto<{
        token: string
      }>>(environment.baseURL + '/account/login', this.loginForm.getRawValue())
      const response = await firstValueFrom(observable);
      this.tokenService.setToken(response.responseData!.token)

      const toast = await this.toastcontroller.create({
        message: 'Login was sucessfull',
        duration: 5000,
        color: "success"
      })
      toast.present();
    } catch (e) {
    }
    //Setting the current user.
    const observable = this.http.get<ResponseDto<User>>(environment.baseURL + '/account/whoami');
    const response = await firstValueFrom(observable);
    this.currentUser = response.responseData;
    //Securing that the logged in user accually has the information, and not just an empty object
    if (this.currentUser !== undefined) {
      this.state.setCurrentUser(this.currentUser);
      this.changeNameOfCurrentUser(this.state.getCurrentUser().username);
      this.userHandler.updateLoginOut("logout");
    }
  }

  async logout() {
    this.tokenService.clearToken();

    (await this.toastcontroller.create({
      message: 'Successfully logged out',
      duration: 5000,
      color: 'success',
    })).present()

    this.userHandler.updateLoginOut("login");
    this.userHandler.updateCurrentUser('');
  }

  changeNameOfCurrentUser(name: any): void {
    this.userHandler.updateCurrentUser(name);
  }

}
