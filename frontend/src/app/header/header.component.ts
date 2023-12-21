import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserHandler} from '../userHandler';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private subscription: Subscription;
  dynamicText: string = '';
  private subscriptionForLoginOut: Subscription;
  loginOut: string = 'login';

  constructor(private userHandler: UserHandler) {
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
  }

  ngOnInit() {
  }

}
