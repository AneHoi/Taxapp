import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {State} from 'src/state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  date: string | undefined;
  datetimeValue: string | undefined;


  constructor(public state: State) {
  }

  async searchForPrices() {


  }

  clickedCard(taxiPrice: any) {

  }
}
