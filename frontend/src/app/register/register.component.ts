import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ResponseDto, User} from 'src/models';
import {environment} from 'src/environments/environment';
import {firstValueFrom} from "rxjs";
import {ToastController} from "@ionic/angular";
import {State} from 'src/state';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    currentUser: User | undefined;
    //This is the formbuilder, it is important to SPELL the items as they are spelled in the dto in the API
    createNewUserForm = this.fb.group({
        username: ['', Validators.minLength(2)],
        tlfnumber: ['', Validators.min(10000000)],
        email: ['', Validators.minLength(2)],
        password: ['', Validators.minLength(8)],
    })

    constructor(public fb: FormBuilder, public http: HttpClient, public toastcontroller: ToastController, public state: State) {
    }

    ngOnInit() {
    }

    /**
     * While registering, the "Log in" part is also implemented here, by getting the response in form of the object "User"
     * The current user is stored inside the state-file
     */
    async submit() {
        try {
            const observable = this.http.post<ResponseDto<User>>(environment.baseURL + '/account/register', this.createNewUserForm.getRawValue())

            const response = await firstValueFrom(observable);
            //Setting the current user.
            this.currentUser = response.responseData;
            //Securing that the logged in user accually has the information, and not just an empty object
            if (this.currentUser !== undefined) {
                this.state.setCurrentUser(this.currentUser);
            }
            const toast = await this.toastcontroller.create({
                message: 'The registration was sucessfull',
                duration: 1233,
                color: "success"
            })
            toast.present();
        } catch (e) {
        }

    }
}
