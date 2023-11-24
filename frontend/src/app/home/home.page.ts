import {Component} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {State} from 'src/state';
import { firstValueFrom } from 'rxjs';
import {TaxiFare, ResponseDto, TaxiPricesDto } from 'src/models'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  date: string | undefined;
  datetimeValue: string | undefined;


  constructor(public state: State, public http: HttpClient) {
  }

  async searchForPrices() {
   const result = await firstValueFrom(this.http.get<ResponseDto<TaxiPricesDto>>("http://localhost:5081/TaxaApis/GetTaxaPrices/5,10,1"))
   this.state.TaxiPrices = result.responseData!;

  }

  clickedCard(taxiPrice: any) {

  }
}
