import {Component, Input, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmPriceDTO, ResponseDto} from 'src/models';
import {DataContainer} from '../data.service'
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {firstValueFrom} from "rxjs";
import {FormControl, FormsModule, Validators} from "@angular/forms";
import {ModalController, ToastController} from "@ionic/angular";
import { State } from 'src/state';

@Component({
  selector: 'app-confirm-price',
  template: `
      <ion-content data-target="#modal">

              <img style="max-height: 150px;" [src]="'./assets/' + dataContainer.data.companyName + '.png'"
                   alt="logo of {{dataContainer.data.companyName}}" fill="">
              <p>Distance: {{ dataContainer.data.km }} km</p>
              <p>Duration: {{ dataContainer.data.min }} min</p>
              <p>Persons: {{ dataContainer.data.persons }}</p>
              <p>Price: {{ dataContainer.data.price }} DKK </p>
              <ion-input label="Email" labelPlacement="stacked" type="text" [formControl]="emailForm" [(ngModel)]="emailOfUser" fill="outline"
                         placeholder="Enter Email">
              </ion-input>
              <ion-input label="Phone Number" label-placement="stacked" fill="outline" placeholder="Enter Number">Phone
                  Number
              </ion-input>
              <ion-button data-dismiss="modal" [disabled]="emailForm.invalid" (click)="sendConfirmationEmail()">Confirm</ion-button>

      </ion-content>
  `,
  styleUrls: ['./confirm-price.component.scss'],
})
export class ConfirmPriceComponent implements OnInit {
  emailOfUser: string | undefined;
  emailForm = new FormControl('', [Validators.required, Validators.minLength(3)]);


  @Input()
  data!: ConfirmPriceDTO;

  dataContainer = inject(DataContainer);
  constructor(private route: ActivatedRoute, public state: State, public http: HttpClient, public toastcontroller: ToastController, public modalController: ModalController) {
  }

  ngOnInit() {
    if(this.state.getCurrentUser().email !== undefined){
      this.emailOfUser = this.state.getCurrentUser().email;
    }
    else {
    }
  }

  protected readonly ConfirmPriceDTO: any;

  async sendConfirmationEmail() {
    const obs = this.http.post<ResponseDto<string>>(environment.baseURL + '/TaxaApis/ConfirmationEmail', {
      distance: this.dataContainer.data.km,
      duration: this.dataContainer.data.min,
      persons: this.dataContainer.data.persons,
      price: this.dataContainer.data.price,
      company: this.dataContainer.data.companyName,
      toemail: this.emailOfUser,
    });
    const response =  await firstValueFrom(obs);
    var responceString = response.responseData;
    const toast = await this.toastcontroller.create({
      message: responceString,
      duration: 5000,
      color: "success"
    })
    toast.present();
    this.modalController.dismiss()
  }

}
