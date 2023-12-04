import {Component, inject} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {State} from 'src/state';
import {firstValueFrom} from 'rxjs';
import {TaxiDTO, TaxInfo, ConfirmPriceDTO} from 'src/models'
import {environment} from 'src/environments/environment';
import {ModalController} from "@ionic/angular";
import {ConfirmPriceComponent} from '../confirm-price/confirm-price.component';
import {DataContainer} from './../data.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  date: string | undefined;
  datetimeValue: string | undefined;
  persons: number | undefined;


  constructor(public state: State, public http: HttpClient, public modalController: ModalController) {
  }

  async searchForPrices(km: number, min: number, persons: number | undefined) {
    const result = await firstValueFrom(this.http.get<TaxiDTO>(environment.baseURL + "/TaxaApis/GetTaxaPrices/" + km + "," + min + "," + persons))
    this.state.taxinfos = result;

  }

  data = inject(DataContainer)

  async clickedCard(taxInfo: TaxInfo) {
    console.log(taxInfo)
    const confirmPriceDTO: ConfirmPriceDTO = this.convertToConfirmPriceDTO(taxInfo);
    this.data.data = confirmPriceDTO;
    const modal = await this.modalController.create({
      component: ConfirmPriceComponent,
    });
    modal.present();
  }

  convertToConfirmPriceDTO(taxInfo: TaxInfo): ConfirmPriceDTO {  //Konventere en TaxiFare til en ConfirmPriceDTO
    return {
      companyName: taxInfo.companyName,
      km: 5, //Skal ændres til googleAPI's distance
      min: 5, //Skal ændres til googleAPI's minutter
      persons: this.persons,
      price: taxInfo.taxiPrice,
    };
  }

}
