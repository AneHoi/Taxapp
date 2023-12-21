import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserHandler} from '../userHandler';
import {Subscription} from "rxjs";
import {logIn} from "ionicons/icons";
import { State } from 'src/state';
import { LoginPage } from '../login/login.page';
import { TokenService } from 'src/TokenService';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private subscription: Subscription;
  dynamicText: string = '';
  private subscriptionForLoginOut: Subscription;
  loginOut: string = 'Login';

  constructor(private userHandler: UserHandler, private state: State, private tokenService : TokenService, private toastcontroller: ToastController) {
    //Subscribe to this userhandler, so this reacts, when it is changed
    this.subscription = this.userHandler.textValue$.subscribe((value) => {
      if (value == '') {
        this.dynamicText = value;
      } else {
        this.dynamicText = 'Welcome ' + value;
      }
    })
    this.subscriptionForLoginOut = this.userHandler.logInOutValue$.subscribe((value) => {
      this.loginOut = value;
    })
    this.userHandler.logInOutValue$;
  }

  ngOnInit() {
  }

  async loginoutUser() {
    if (this.state.getCurrentUser().username !== undefined) {
      this.tokenService.clearToken();

      (await this.toastcontroller.create({
        message: 'Successfully logged out',
        duration: 5000,
        color: 'success',
      })).present()

      this.userHandler.updateLoginOut("Login");
      this.userHandler.updateCurrentUser('');
    }
  }
}
