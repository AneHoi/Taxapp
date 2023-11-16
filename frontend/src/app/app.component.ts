import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {GOOGLEAPIKEY} from "../../../api/ApiKey/GoogleApiKey";


declare var google: any;

@Component({
  selector: 'app-root',
  template: `
<head>
  <meta charset="utf-8">
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  @ViewChild('mapContainer')
  mapContainer!: ElementRef;

  private  map: any;
  private directionService: any;
  private directionDisplay: any;
  constructor(private ngzone: NgZone) {}

  ngOnInit(){
    this.initializeMap();
  }

  private initializeMap() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLEAPIKEY + '&libraries=places&callback=initMap';
    script.async = true;
    document.head.appendChild(script);
  }

  public initeMap(){
    this.map = new google.map.Map(this.mapContainer.nativeElement, {
      center: {lat: 0, lng: 0},
      zoom: 2,
    });

    this.directionService = new google.maps.DirectionService();
    this.directionDisplay = new google.maps.DirectionsRenderer();
    this.directionDisplay.setMap(this.map);
  }

  showRoute() {
    const startLocation = 'Your Starting Address';
    const endLocation = 'Your Ending Address';

    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.ngzone.run(() => {
          this.directionDisplay.setDirections(result);
        });
      } else {
        console.error('Directions request failed:', status);
      }
    });
  }
}
