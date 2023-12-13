import {Component, inject} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {State} from 'src/state';
import {firstValueFrom} from 'rxjs';
import {TaxiDTO, TaxInfo, ConfirmPriceDTO, Address, AddressAPIJsonResponseModel, Position} from 'src/models'
import {environment} from 'src/environments/environment';
import {ModalController} from "@ionic/angular";
import {ConfirmPriceComponent} from '../confirm-price/confirm-price.component';
import {DataContainer} from './../data.service'
import {FormControl} from '@angular/forms';
import {GEOCODEAPIKEY, GOOGLEAPIKEY} from '../maps/apikey';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  date: string | undefined;
  datetimeValue: string | undefined;
  persons: number | undefined;
  addressSuggestions: Address[] = [];
  addressField = new FormControl('');


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

  async destinationSuggestion(): Promise<void> {
    if (this.addressField.value?.length! < 3) return;
    const address = "https://api.geoapify.com/v1/geocode/autocomplete";
    const params: any = {
      text: this.addressField.value,
      format: "json",
      apiKey: GEOCODEAPIKEY
    };
    const observable = this.http.get<AddressAPIJsonResponseModel>(address, {params: params});
    const addressResult = await firstValueFrom<AddressAPIJsonResponseModel>(observable);
    this.addressSuggestions = addressResult.results;
  }

  placePos(pos: Address) {
    const posLat = pos.lat;
    const posLon = pos.lon;
    this.state.setPosition(posLat, posLon)
  }

  placeDes(des: Address) {
    const desLat = des.lat;
    const desLon = des.lon;
    this.state.setDestination(desLat, desLon)

  }

  async positionSuggestion() {
    if (this.addressField.value?.length! < 3) return;
    const address = "https://api.geoapify.com/v1/geocode/autocomplete";
    const params: any = {
      text: this.addressField.value,
      format: "json",
      apiKey: GEOCODEAPIKEY
    };
    const observable = this.http.get<AddressAPIJsonResponseModel>(address, {params: params});
    const addressResult = await firstValueFrom<AddressAPIJsonResponseModel>(observable);
    this.addressSuggestions = addressResult.results;
  }

  selectPositionSuggestion() {
    // Get the selected suggestion based on the input value
    const selectedValue = this.addressField.value;
    const selectedPosition = this.addressSuggestions.find(suggestion => suggestion.formatted === selectedValue);

    if (selectedPosition) {
      // Handle the selected suggestion, for example, call the placePos function
      this.placePos(selectedPosition);
    }
  }


  selectDestinationSuggestion() {
    // Get the selected suggestion based on the input value
    const selectedValue = this.addressField.value;
    const selectedDestination = this.addressSuggestions.find(suggestion => suggestion.formatted === selectedValue);

    if (selectedDestination) {
      // Handle the selected suggestion, for example, call the placePos function
      this.placeDes(selectedDestination);
    }

  }
}
