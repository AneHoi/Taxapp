import {Component, OnInit} from '@angular/core';
import {State} from 'src/state';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(public state: State) {
    }

    ngOnInit() {
    }

    showUser() {
        var user = this.state.getCurrentUser();
        if (user !== undefined) {
            console.log("Current user " + user.username)
            console.log("Current user " + this.state.getCurrentUser().username)
        }
        console.log("That was the current user :-)")
    }

}
