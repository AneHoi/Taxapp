import {Component, Input, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmPriceDTO} from 'src/models';
import {DataContainer} from '../data.service'
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {firstValueFrom} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-confirm-price',
  template: `
      <ion-content>

              <img style="max-height: 150px;" [src]="'./assets/' + dataContainer.data.companyName + '.png'"
                   alt="logo of {{dataContainer.data.companyName}}" fill="">
              <p>Distance: {{ dataContainer.data.km }} km</p>
              <p>Duration: {{ dataContainer.data.min }} min</p>
              <p>Persons: {{ dataContainer.data.persons }}</p>
              <p>Price: {{ dataContainer.data.price }} DKK </p>
              <ion-input label="Email" type="text" [(ngModel)]="emailOfUser" label-placement="floating" fill="outline"
                         placeholder="Email">Email
              </ion-input>
              <ion-input label="Phone Number" label-placement="floating" fill="outline" placeholder="Phone Number">Phone
                  Number
              </ion-input>
              <ion-button (click)="sendConfirmationEmail()">Confirm</ion-button>

      </ion-content>
  `,
  styleUrls: ['./confirm-price.component.scss'],
})
export class ConfirmPriceComponent implements OnInit {
  emailOfUser: string | undefined;

  @Input()
  data!: ConfirmPriceDTO;


  dataContainer = inject(DataContainer);

  constructor(private route: ActivatedRoute, public http: HttpClient) {
  }

  ngOnInit() {
  }

  protected readonly ConfirmPriceDTO: any;

  public async sendConfirmationEmail() {
    const observable = this.http.post<any>(environment.baseURL + '/TaxaApis/ConfirmationEmail', {
      distance: this.dataContainer.data.km,
      duration: this.dataContainer.data.min,
      persons: this.dataContainer.data.persons,
      price: this.dataContainer.data.price,
      company: this.dataContainer.data.companyName,
      toemail: this.emailOfUser,
    });
    var result = await firstValueFrom<any>(observable);


  }
}
