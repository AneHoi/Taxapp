import {Injectable} from "@angular/core";
import {Destination, Position, TaxInfo, User} from "./models";
import {EMPTY, first, firstValueFrom, map, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class State {

  taxinfos: TaxInfo[] = [];
  // this "{}" means: Empty object
  currentuser: User = {};
  pos = new Position;
  des = new Destination;
  posSub = new Subject<Position>();
  desSub = new Subject<Destination>();
  posSub$ = this.posSub.asObservable();
  desSub$ = this.desSub.asObservable();

  getCurrentUser(): User {
    return this.currentuser;
  }

  setCurrentUser(user: User): void {
    this.currentuser = user;
  }

  setPosition(posLat: number, posLon: number) {
    this.pos.lat = posLat;
    this.pos.lng = posLon;
    this.posSub.next(this.pos)
  }

  setDestination(desLat: number, desLon: number) {
    this.des.lat = desLat;
    this.des.lng = desLon;
    this.desSub.next(this.des)
  }
}



