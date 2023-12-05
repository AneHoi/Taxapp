import {Injectable} from "@angular/core";
import {TaxiDTO, TaxInfo, User} from "./models";

@Injectable({
  providedIn: 'root'
})

export class State {
  taxinfos: TaxInfo[] = [];
  currentuser: User | undefined;
    
}