import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPriceDTO } from 'src/models';
import {DataContainer} from '../data.service'

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
          <ion-button>Confirm</ion-button>
      </ion-content>
  `,
  styleUrls: ['./confirm-price.component.scss'],
})
export class ConfirmPriceComponent  implements OnInit {

  @Input()
  data!: ConfirmPriceDTO;

  dataContainer = inject(DataContainer);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  protected readonly ConfirmPriceDTO = ConfirmPriceDTO;
}
