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
  private desMarkerSub: Subscription;
  private posMarkerSub: Subscription;
  // prøv med at lægge Pos og Des herinde i stedet
  apiLoaded = false;

  constructor(private httpClient: HttpClient, public state: State) {
    this.loadMap()
    this.posMarkerSub= this.state.posSub$.subscribe((value) => {
      this.markerPositions = [];
      this.addMarker(value)
      if(this.state.des) {
        this.addMarker(this.state.des)
      }
    });
    this.desMarkerSub= this.state.desSub$.subscribe((value) => {
      this.markerPositions = []
      this.addMarker(value)
      if(this.state.pos != null) {
        this.addMarker(this.state.pos)
      }
    });



  }

  ngOnInit(): void {
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


  removeMarker(remove: google.maps.LatLngLiteral) {
    console.log('Removing marker:', remove);
    this.markerPositions = this.markerPositions.filter(
      (marker) => marker.lat !== remove.lat || marker.lng !== remove.lng
    );
  }
}
