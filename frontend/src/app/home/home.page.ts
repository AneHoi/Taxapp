import {Component} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {State} from 'src/state';
import {firstValueFrom} from 'rxjs';
import {TaxiFare, ResponseDto, TaxiPricesDto} from 'src/models'
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    date: string | undefined;
    datetimeValue: string | undefined;
    persons: number | undefined;


    constructor(public state: State, public http: HttpClient) {
    }

    async searchForPrices(km: number, min: number, persons: number | undefined) {
        const result = await firstValueFrom(this.http.get<ResponseDto<TaxiPricesDto>>(environment.baseURL + "/TaxaApis/GetTaxaPrices/" + km + "," + min + "," + persons))
        this.state.TaxiPrices = result.responseData!;

    }

    clickedCard(taxiPrice: any) {

    }
}
