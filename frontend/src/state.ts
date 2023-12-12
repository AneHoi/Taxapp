import {Injectable} from "@angular/core";
import {Destination, Position, TaxInfo, User} from "./models";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class State {
  taxinfos: TaxInfo[] = [];
  // this "{}" means: Empty object
  currentuser: User = {};
  pos: Position = new Position;
  des: Destination = new Destination;
  private position = new Subject<Position>();
  private destination = new Subject<Destination>();
  position$ = this.position.asObservable();
  destination$ = this.destination.asObservable();

  getCurrentUser(): User {
    return this.currentuser;
  }
  setCurrentUser(user: User):void {
    this.currentuser = user;
  }

  setDestination(lat: number, lon: number){
    this.des.lat = lat;
    this.des.lng = lon;
    this.updateDestination(this.des)
  }

  getDestination(): Destination {
    return this.des;
  }

  setPosition(lat: number, lon: number) {
    this.pos.lat = lat;
    this.pos.lng = lon;
    this.updatePosition(this.pos)
  }

  getPosition(): Position {
    return this.pos;
  }

  updatePosition(pos: Position): void {
    this.position.next(pos);
  }

  updateDestination(des: Destination): void {
    this.destination.next(des);
  }

}
