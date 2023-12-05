import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { ResponseDto, User } from 'src/models';
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import { environment } from 'src/environments/environment';
import {firstValueFrom} from "rxjs";
import {ToastController} from "@ionic/angular";
import { State } from 'src/state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  createNewUserForm = this.fb.group({
    userName: ['', Validators.minLength(4)],
    tlfNumber: ['', Validators.min(10000000)],
    email: ['', Validators.minLength(2)],
    password: ['', Validators.minLength(8)],
  })
  constructor(public fb: FormBuilder, public http: HttpClient, public toastcontroller: ToastController, public state: State) {
  }

  ngOnInit() {
  }

  async submit() {
    try{
      const observable = this.http.post<ResponseDto<User>>(environment.baseURL + '/account/register', this.createNewUserForm.getRawValue())

      const response = await firstValueFrom(observable);
      this.state.currentuser = response.responseData;

      const toast = await this.toastcontroller.create({
        message: 'The registration was sucessfull',
        duration: 1233,
        color: "success"
      })
    }
    catch (e){
    }
  }
}
