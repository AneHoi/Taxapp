import {Component, OnInit} from '@angular/core';
import {State} from 'src/state';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { ResponseDto, User } from 'src/models';
import {FormBuilder, Validators} from "@angular/forms";
import { environment } from 'src/environments/environment';
import {ToastController} from "@ionic/angular";

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

    constructor(public state: State, public http: HttpClient, public fb: FormBuilder, public toastcontroller: ToastController) {
    }

    ngOnInit() {
    }

    async login() {

        try {
            const observable = this.http.post<ResponseDto<User>>(environment.baseURL + '/account/login', this.loginForm.getRawValue())

            const response = await firstValueFrom(observable);
            //Setting the current user.
            this.currentUser = response.responseData;
            //Securing that the logged in user accually has the information, and not just an empty object
            if (this.currentUser !== undefined) {
                this.state.setCurrentUser(this.currentUser);
            }
            const toast = await this.toastcontroller.create({
                message: 'Login was sucessfull',
                duration: 1233,
                color: "success"
            })
            toast.present();
        } catch (e) {
        }


        var user = this.state.getCurrentUser();
        if (user !== undefined) {
            console.log("Current user " + user.username)
            console.log("Current user " + this.state.getCurrentUser().username)
        }
        console.log("That was the current user :-)")
    }

}
