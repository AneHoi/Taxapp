import {Component} from "@angular/core";
import {Apikey} from "./apikey";
import {catchError, firstValueFrom, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MapMarker} from "@angular/google-maps";


@Component({
  template: `
      <google-map *ngIf="apiLoaded"
              height="400px"
              width="750px"
              [center]="center"
              [zoom]="zoom"
              (mapClick)="addMarker($event)">
          <map-marker *ngFor="let position of markerPositions" [position]="position" [options]="markerOptions" />

      </google-map>
  `,
  selector: 'app-maps',
})
export class MapsComponent {

  apiLoaded = false;

  constructor(private httpClient: HttpClient) {
    this.loadMap()
  }


  async loadMap() {
    await firstValueFrom(this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key='+Apikey, 'callback'));
    this.apiLoaded = true;
  }


  center: google.maps.LatLngLiteral = {lat:55.48773485445012, lng:8.446890874949103}; //her er easv fx
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng!.toJSON());
    console.log("hey taxapp, der er nu en marker på kortet")
  }



}
