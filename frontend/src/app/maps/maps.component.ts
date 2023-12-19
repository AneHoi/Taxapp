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
      <map-marker *ngIf="pos != undefined" [position]="convertToLatLngLiteral(pos)" [options]="markerOptions"/>
      <map-marker *ngIf="des != undefined" [position]="convertToLatLngLiteral(des)" [options]="markerOptions"/>
      <map-directions
        *ngIf="pos != undefined && des != undefined"
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
  pos: Position | undefined
  des: Destination | undefined
  apiLoaded = false;

  // Separate arrays for position and destination markers
  posMarkerPositions: google.maps.LatLngLiteral[] = [];
  desMarkerPositions: google.maps.LatLngLiteral[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 55.48773485445012,
    lng: 8.446890874949103,
  };
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = {draggable: false};

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

  setCenter(position: Position) {
    this.center = this.convertToLatLngLiteral(position);
    if (this.des != undefined && this.pos != undefined) {
      this.center = this.calculateMidpoint(this.pos, this.des);

    }

  }

  setZoom(distance: number): void {
      // Round up the distance to the nearest multiple of 5
      console.log(distance)
      const roundedDistance = Math.ceil(distance / 5) * 5;
      console.log(roundedDistance)
      const zoomLevels: { [key: number]: number } = {
        0: 16,
        5: 14,
        10: 12,
        15: 11,
        20: 11,
        25: 10,
        30: 10,
        35: 11,
        40: 11,
      };

      if (zoomLevels.hasOwnProperty(roundedDistance)) {
        // Set the zoom level
        this.zoom = zoomLevels[roundedDistance];
      }


  }


  calculateMidpoint(position: Position, destination: Destination): google.maps.LatLngLiteral {
    const lat1 = position.lat || 0;
    const lng1 = position.lng || 0;
    const lat2 = destination.lat || 0;
    const lng2 = destination.lng || 0;

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lng1Rad = (lng1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lng2Rad = (lng2 * Math.PI) / 180;

    // Calculate the midpoint coordinates
    const midLat = ((lat1Rad + lat2Rad) / 2) * (180 / Math.PI);
    let midLng =
      (((lng2Rad - lng1Rad + Math.PI) % (2 * Math.PI)) - Math.PI) / 2;
    midLng = ((lng1Rad + midLng + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
    midLng = (midLng * 180) / Math.PI;

    return {lat: midLat, lng: midLng};
  }

  convertToLatLngLiteral(destination: Destination): google.maps.LatLngLiteral {
    return {lat: destination.lat || 0, lng: destination.lng || 0};
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


  updateMarkers() {
    // Clear existing markers
    this.posMarkerPositions.pop();
    this.desMarkerPositions.pop();

    if (this.pos != undefined) {
      this.addMarker(this.posMarkerPositions, this.pos);
    }

    if (this.des != undefined) {
      this.addMarker(this.desMarkerPositions, this.des!);
      this.calculateRoute(this.des!, this.pos!);
    }
  }


  addMarker(markerPositions: google.maps.LatLngLiteral[], position: Position) {
    const newPosition = {lat: position.lat!, lng: position.lng!};
    markerPositions.push(newPosition);
    this.setCenter(newPosition)
  }

  async calculateRoute(destination: Destination, position: Position): Promise<void> {
    const url = environment.baseURL + '/google/routes/' + position.lat + ',' + position.lng + ',' + destination.lat + ',' + destination.lng
    const observable = this.httpClient.get<ResponseDto<TimeAndDistance>>(url);
    const response = await firstValueFrom<ResponseDto<TimeAndDistance>>(observable);
    this.state.setTimeAndDistance(response.responseData!.km!, response.responseData!.min!)
    this.setZoom(response.responseData!.km!)
  }
}
