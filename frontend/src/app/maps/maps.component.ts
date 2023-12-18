import {Component, OnInit, OnDestroy} from "@angular/core";
import {GOOGLEAPIKEY} from "./apikey";
import {first, firstValueFrom, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {State} from "src/state";
import {Destination, Position, ResponseDto, Routes, TimeAndDistance} from "src/models";
import {environment} from "src/environments/environment";

@Component({
  template: `
    <google-map *ngIf="apiLoaded" height="400px" width="750px" [center]="center" [zoom]="zoom">
      <map-marker *ngIf="pos" [position]="pos" [options]="markerOptions"/>
      <map-marker *ngIf="des" [position]="des" [options]="markerOptions"/>
      <map-directions
        *ngIf="pos && des"
        [origin]="pos"
        [destination]="des"
        [travelMode]='"DRIVING"'></map-directions>
    </google-map>
  `,
  selector: 'app-maps',
})
export class MapsComponent implements OnInit, OnDestroy {
  private desMarkerSub: Subscription;
  private posMarkerSub: Subscription;
  pos = new Position();
  des = new Destination();
  apiLoaded = false;

  // Separate arrays for position and destination markers
  posMarkerPositions: google.maps.LatLngLiteral[] = [];
  desMarkerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private httpClient: HttpClient, public state: State) {
    this.loadMap();

    this.posMarkerSub = this.state.posSub$.subscribe((value) => {
      this.pos = value;
      this.updateMarkers();
    });

    this.desMarkerSub = this.state.desSub$.subscribe((value) => {
      this.des = value;
      this.updateMarkers();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.posMarkerSub.unsubscribe();
    this.desMarkerSub.unsubscribe();
  }

  async loadMap() {
    await firstValueFrom(
      this.httpClient.jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' + GOOGLEAPIKEY,
        'callback'
      )
    );
    this.apiLoaded = true;
  }

  center: google.maps.LatLngLiteral = {
    lat: 55.48773485445012,
    lng: 8.446890874949103,
  };
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = {draggable: false};

  updateMarkers() {
    // Clear existing markers
    this.posMarkerPositions.pop();
    this.desMarkerPositions.pop();

    if (this.pos.lat != null) {
      this.addMarker(this.posMarkerPositions, this.pos);
    }

    if (this.des.lat != null) {
      this.addMarker(this.desMarkerPositions, this.des);
      this.calculateRoute(this.des, this.pos);
    }
  }


  addMarker(markerPositions: google.maps.LatLngLiteral[], position: Position) {
    const newPosition = {lat: position.lat!, lng: position.lng!};
    markerPositions.push(newPosition);
  }

  async calculateRoute(destination: Destination, position: Position): Promise<void> {
    const url = environment.baseURL + '/google/routes/' + position.lat + ',' + position.lng + ',' + destination.lat + ',' + destination.lng
    const observable = this.httpClient.get<ResponseDto<TimeAndDistance>>(url);
    const response = await firstValueFrom<ResponseDto<TimeAndDistance>>(observable);
    this.state.setTimeAndDistance(response.responseData!.km!, response.responseData!.min!)
  }
}
