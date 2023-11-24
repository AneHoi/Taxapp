import {Injectable} from "@angular/core";
import {TaxiPricesDto} from "./models";

@Injectable({
  providedIn: 'root'
})
export class State {
  TaxiPrices: TaxiPricesDto | null = null;
}
