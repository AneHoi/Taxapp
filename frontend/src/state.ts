import {Injectable} from "@angular/core";
import {TaxiDTO, TaxInfo} from "./models";

@Injectable({
  providedIn: 'root'
})
export class State {
    taxinfos: TaxInfo[] = [];
}
