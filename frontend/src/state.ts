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
  oldPos: Position = new Position;
  oldDes: Destination = new Destination
  public newPosition = new Subject<Position>();
  public newDestination = new Subject<Destination>();
  public oldPosition = new Subject<Position>();
  public oldDestination = new Subject<Destination>();
  newPosition$ = this.newPosition.asObservable();
  newDestination$ = this.newDestination.asObservable();
  oldPosition$ = this.oldPosition.asObservable();
  oldDestination$ = this.oldDestination.asObservable();

  getCurrentUser(): User {
    return this.currentuser;
  }
  setCurrentUser(user: User):void {
    this.currentuser = user;
  }

  setDestination(lat: number, lon: number){
    this.oldDes.lat = this.des.lat
    this.oldDes.lng = this.des.lng
    this.oldDestination.next(this.oldDes);
    this.des.lat = lat;
    this.des.lng = lon;
    this.newDestination.next(this.des);
  }

  getDestination(): Destination {
    return this.des;
  }

  setPosition(lat: number, lon: number) {
    this.oldPos.lat = this.pos.lat
    this.oldPos.lng = this.pos.lng
    this.oldPosition.next(this.oldPos);
    this.pos.lat = lat;
    this.pos.lng = lon;
    this.newPosition.next(this.pos);
  }

  getPosition(): Position {
    return this.pos;
  }


}
