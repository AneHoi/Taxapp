import {Injectable} from "@angular/core";
import {Destination, Position, TaxInfo, User, TimeAndDistance} from "./models";
import {EMPTY, first, firstValueFrom, map, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class State {
    timeAndDistance!: TimeAndDistance;
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

    setTimeAndDistance(distance: number, duration: number) {
        var km = Math.round(distance / 1000);
        this.timeAndDistance.distance = km;
        var min = Math.round(duration / 60);
        this.timeAndDistance.time = min;
    }

    getTimeAndDistance() {
        return this.timeAndDistance;
    }

}



