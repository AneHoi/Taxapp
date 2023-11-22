import {Injectable} from "@angular/core";
import {TaxiFare} from "./models";

@Injectable({
  providedIn: 'root'
})
export class State {
  TaxiPrices: TaxiFare[] = [];
}
