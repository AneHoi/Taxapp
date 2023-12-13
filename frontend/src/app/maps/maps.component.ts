import {Component, OnInit} from "@angular/core";
import {GOOGLEAPIKEY} from "./apikey";
import {firstValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {State} from "src/state";

@Component({
  template: `
    <google-map *ngIf="apiLoaded"
                height="400px"
                width="750px"
                [center]="center"
                [zoom]="zoom">
      <map-marker *ngFor="let position of markerPositions" [position]="position" [options]="markerOptions"/>
    </google-map>`,
  selector: 'app-maps',
})
export class MapsComponent implements OnInit {
  private positionSub!: Subscription;
  private destinationSub!: Subscription;
  private oldDesSub!: Subscription;
  private oldPosSub!: Subscription;
  apiLoaded = false;

  constructor(private httpClient: HttpClient, public state: State) {
    this.loadMap()
  }

  ngOnInit(): void {
    this.removeOldDes();
    this.removeOldPos();
    this.addPositon();
    this.addDestination();

  }


  async loadMap() {
    await firstValueFrom(this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + GOOGLEAPIKEY, 'callback'));
    this.apiLoaded = true;
  }

  center: google.maps.LatLngLiteral = {lat: 55.48773485445012, lng: 8.446890874949103}; //her er easv fx
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(eventOrPosition: google.maps.LatLngLiteral) {
    const position = eventOrPosition;
    // Add the new marker
    this.markerPositions.push(position);
    console.log("Hey taxapp, der er nu en marker på kortet");
  }

  addPositon() {
    this.positionSub = this.state.newPosition$.subscribe((value) => {
      this.addMarker(value)
    })
  }

  addDestination() {
    this.destinationSub = this.state.newDestination$.subscribe((value) => {
      this.addMarker(value)
    })
  }

  removeOldPos() {
    this.oldPosSub = this.state.oldPosition$.subscribe((value) => {
      this.removeMarker(value);
    });
  }

  removeOldDes() {
    this.oldDesSub = this.state.oldDestination$.subscribe((value) => {
      this.removeMarker(value);
    });
  }


  removeMarker(remove: google.maps.LatLngLiteral) {
    console.log('Removing marker:', remove);
    this.markerPositions = this.markerPositions.filter(
      (marker) => marker.lat !== remove.lat || marker.lng !== remove.lng
    );
  }
}
