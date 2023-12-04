import {Component,inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IonicModule} from "@ionic/angular";
import {State} from 'src/state';
import {async, firstValueFrom, min} from 'rxjs';
import {CommonModule} from "@angular/common";
import {TaxiDTO, TaxInfo, ConfirmPriceDTO} from 'src/models'
import {environment} from 'src/environments/environment';
import {ModalController} from "@ionic/angular";
import {ConfirmPriceComponent} from '../confirm-price/confirm-price.component';
import {DataContainer} from './../data.service';

declare var google: { maps: { places: { Autocomplete: new () => any; }; Geocoder: new () => any; }; };
@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [IonicModule, CommonModule]
})
export class HomePage {
    date: string | undefined;
    datetimeValue: string | undefined;
    persons: number | undefined;
    places: any[] = [];
    query!: string;

    constructor(public state: State, public http: HttpClient, private zone: NgZone, public modalController: ModalController) {
    }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
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

  async onSearchChange(event: any) {
    console.log(event);
    this.query = event.detail.value;
    if(this.query.length > 0) await this.getPlaces()
  }

  async getPlaces(){
      try {
        let service = new google.maps.places.Autocomplete();
        service.getPlacePredictions({
          input: this.query,
          componentRestrictions: {
            country: 'DK'
          }
        }, (predictions: any[] | null) =>{
          let autoCompleteItems: any[] = [];
          this.zone.run(()=> {
            if (predictions != null){
              predictions.forEach(async(prediction)=>{
               console.log('prediction', prediction);
               let latLng: any = await this.geoCode(prediction.description);
               const places ={
                 title: prediction.structured_formatting.main_text,
                 address:prediction.description,
                 lat: latLng.lat,
                 lng: latLng.lng
               };
               console.log('places: ', places);
               autoCompleteItems.push(places);
              });
              this.places = autoCompleteItems;
              console.log('final places', this.places);
            }
          })
        });
      } catch (e){
        console.log(e)
      }
  }

  geoCode(address: any) {
      let latLng = {lat:'', lng: ''};
      return new Promise((resolve, reject) => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, (result: { geometry: { location: { lng: () => string; lat: () => string;}; }; }[]) =>{
          console.log('result: ', result);
          latLng.lat = result[0].geometry.location.lat();
          latLng.lng = result[0].geometry.location.lng();
          resolve(latLng)
        });
      });
    }
}

