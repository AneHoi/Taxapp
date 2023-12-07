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

    constructor(private userHandler: UserHandler) {
        //Subscribe to this userhandler, so this reacts, when it is changed
        this.subscription = this.userHandler.textValue$.subscribe((value) => {
            this.dynamicText = 'Welcome ' + value;

        })
    }

    ngOnInit() {
    }

}
