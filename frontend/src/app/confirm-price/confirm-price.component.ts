import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPriceDTO } from 'src/models';

@Component({
  selector: 'app-confirm-price',
  template: `
    <ion-content>
      <p>Distance: {{ receivedData?.persons }} km</p>
    </ion-content>
  `,
  styleUrls: ['./confirm-price.component.scss'],
})
export class ConfirmPriceComponent  implements OnInit {
  receivedData!: ConfirmPriceDTO;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.receivedData = this.route.snapshot.data['data'];
  }

  protected readonly ConfirmPriceDTO = ConfirmPriceDTO;
}
