import {Component} from "@angular/core";
import {GOOGLEAPIKEY} from "./apikey";
import {firstValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {State} from "src/state";
import {Destination, Position} from "src/models"

@Component({
    template: `
        <google-map *ngIf="apiLoaded"
                    height="400px"
                    width="750px"
                    [center]="center"
                    [zoom]="zoom"
                    (mapClick)="addMarker($event)">
            <map-marker *ngFor="let position of markerPositions" [position]="position" [options]="markerOptions"/>
        </google-map>`,
    selector: 'app-maps',
})
export class MapsComponent {
    positionSub!: Subscription;
    destinationSub!: Subscription;
    apiLoaded = false;

    constructor(private httpClient: HttpClient, public state: State) {
        this.loadMap()
    }

    async loadMap() {
        await firstValueFrom(this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + GOOGLEAPIKEY, 'callback'));
        this.apiLoaded = true;
    }

    center: google.maps.LatLngLiteral = {lat: 55.48773485445012, lng: 8.446890874949103}; //her er easv fx
    zoom = 16;
    markerOptions: google.maps.MarkerOptions = {draggable: false};
    markerPositions: google.maps.LatLngLiteral[] = [];

    addMarker(eventOrPosition: google.maps.MapMouseEvent | google.maps.LatLngLiteral) {
        // Clear old markers
        this.markerPositions = [];

        // Extract the position from the argument
        const position = ('latLng' in eventOrPosition)
            ? eventOrPosition.latLng!.toJSON()
            : eventOrPosition;

        // Add the new marker
        this.markerPositions.push(position);

        console.log("Hey taxapp, der er nu en marker på kortet");
    }

    addPositon() {
        this.positionSub = this.state.position$.subscribe((value) => {
            this.markerPositions.push(value)
        })
    }
    addDestination() {
        this.destinationSub = this.state.destination$.subscribe((value) => {
            this.markerPositions.push(value)
        })
    }

}
