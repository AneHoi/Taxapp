import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  date: string | undefined;
  datetimeValue: string | undefined;


  constructor() {
  }

  async searchForPrices() {
    
  }
}
