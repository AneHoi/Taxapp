import {Injectable} from "@angular/core";
import {TaxiDTO, TaxInfo, User} from "./models";

@Injectable({
  providedIn: 'root'
})

export class State {
  taxinfos: TaxInfo[] = [];
  // this "{}" means: Empty object
  currentuser: User = {};

  getCurrentUser(): User {
    return this.currentuser;
  }
  setCurrentUser(user: User):void {
    this.currentuser = user;
  }

}
