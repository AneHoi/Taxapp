import { Component, OnInit, OnDestroy } from "@angular/core";
import { GOOGLEAPIKEY } from "./apikey";
import { firstValueFrom, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { State } from "src/state";
import { Destination, Position } from "src/models";

@Component({
  template: `
    <google-map id="map" *ngIf="apiLoaded" height="400px" width="750px" [center]="center" [zoom]="zoom">
      <map-marker *ngIf="isValidCoordinate(pos)" [position]="pos" [options]="markerOptions"></map-marker>
      <map-marker *ngIf="isValidCoordinate(des)" [position]="des" [options]="markerOptions"></map-marker>
      <map-directions
        *ngIf="isValidCoordinate(pos) && isValidCoordinate(des)"
        [origin]="{ lat: pos.lat!, lng: pos.lng! }"
        [destination]="{ lat: des.lat!, lng: des.lng! }"
        [travelMode]="'DRIVING'"
      ></map-directions>
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

  // Flag to track whether both pos and des have been updated
  private bothMarkersUpdated = false;

  // Separate arrays for position and destination markers
  posMarkerPositions: google.maps.LatLngLiteral[] = [];
  desMarkerPositions: google.maps.LatLngLiteral[] = [];
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();

  constructor(private httpClient: HttpClient, public state: State) {
    this.loadMap();

    this.posMarkerSub = this.state.posSub$.subscribe((value) => {
      this.pos = value;
      this.updateMarkers();
      this.checkMarkersUpdated();
    });

    this.desMarkerSub = this.state.desSub$.subscribe((value) => {
      this.des = value;
      this.updateMarkers();
      this.checkMarkersUpdated();
    });
  }

  checkMarkersUpdated() {
    // Set the flag to true if both pos and des have been updated
    this.bothMarkersUpdated = this.pos.lat != 0 && this.pos.lng != 0 && this.des.lng != 0 && this.des.lat != 0;

    // Trigger route calculation only when both markers are updated
    if (this.bothMarkersUpdated) {
      this.calculateRoute();
    }
  }

  calculateRoute() {
    const origin = new google.maps.LatLng(this.pos.lat!, this.pos.lng!);
    const destination = new google.maps.LatLng(this.des.lat!, this.des.lng!);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    });

    this.bothMarkersUpdated = false;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.posMarkerSub.unsubscribe();
    this.desMarkerSub.unsubscribe();
  }

  loadMap() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLEAPIKEY}`;
    script.onload = () => {
      this.apiLoaded = true;
      this.initDirectionsRenderer();
    };

    // Use addDomListenerOnce to ensure that the code is executed only once when the API is loaded
    google.maps.event.addDomListenerOnce(window, 'load', () => {
      document.head.appendChild(script);
    });
  }

  initDirectionsRenderer() {
    // Assuming you have a reference to your google-map component
    const googleMapElement: HTMLElement | null = document.getElementById('map');
    if (googleMapElement) {
      this.directionsRenderer.setMap(new google.maps.Map(googleMapElement));
    }
  }

  center: google.maps.LatLngLiteral = {
    lat: 55.48773485445012,
    lng: 8.446890874949103,
  };
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: true };

  updateMarkers() {
    // Clear existing markers
    this.posMarkerPositions.pop();
    this.desMarkerPositions.pop();

    if (this.pos.lat != null) {
      this.addMarker(this.posMarkerPositions, this.pos);
    }

    if (this.des.lat != null) {
      this.addMarker(this.desMarkerPositions, this.des);
    }
  }

  addMarker(markerPositions: google.maps.LatLngLiteral[], position: Position) {
    const newPosition = { lat: position.lat!, lng: position.lng! };
    markerPositions.push(newPosition);
    console.log("Hey taxapp, der er nu en marker på kortet");
  }

  isValidCoordinate(position: Position): boolean {
    return position.lat != null && position.lng != null && position.lat !== 0 && position.lng !== 0;
  }
}
