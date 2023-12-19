export type TaxiDTO = TaxInfo[]

export interface TaxInfo {
  companyName: string
  taxiPrice: number
  companyLogo: any
}

export interface TimeAndDistance {
  km?: number;
  min?: number;
}
export interface ConfirmPriceDTO {
  companyName: string
  km?: number
  min?: number
  persons: number | undefined,
  price: number
}

export class ResponseDto<T> {
  responseData?: T;
  messageToClient?: string;
}

export class User {
  username?: string;
  tlfnumber?: number;
  email?: string;
  password?: string;
}

export interface Results {
  results: Address[]
  status: string
}

export interface Address {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: Geometry
  place_id: string
  types: string[]
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface Geometry {
  bounds: Bounds1
  location: Location
  location_type: string
  viewport: Viewport
}

export interface Bounds1 {
  northeast: Northeast1
  southwest: Southwest1
}

export interface Northeast1 {
  lat: number
  lng: number
}

export interface Southwest1 {
  lat: number
  lng: number
}

export interface Location {
  lat: number
  lng: number
}

export interface Viewport {
  northeast: Northeast2
  southwest: Southwest2
}

export interface Northeast2 {
  lat: number
  lng: number
}

export interface Southwest2 {
  lat: number
  lng: number
}

export class Position {
  lat: number | undefined
  lng: number | undefined

}
export class Destination {
  lat: number | undefined
  lng: number | undefined
}

export interface Routes {
  geocoded_waypoints: GeocodedWaypoint[]
  routes: Route[]
  status: string
}

export interface GeocodedWaypoint {
  geocoder_status: string
  place_id: string
  types: string[]
}

export interface Route {
  bounds: Bounds2
  copyrights: string
  legs: Leg[]
  overview_polyline: OverviewPolyline
  summary: string
  warnings: any[]
  waypoint_order: any[]
}

export interface Bounds2 {
  northeast: Northeast3
  southwest: Southwest3
}

export interface Northeast3 {
  lat: number
  lng: number
}

export interface Southwest3 {
  lat: number
  lng: number
}

export interface Leg {
  distance: Distance
  duration: Duration
  end_address: string
  end_location: EndLocation
  start_address: string
  start_location: StartLocation
  steps: Step[]
  traffic_speed_entry: any[]
  via_waypoint: any[]
}

export interface Distance {
  text: string
  value: number
}

export interface Duration {
  text: string
  value: number
}

export interface EndLocation {
  lat: number
  lng: number
}

export interface StartLocation {
  lat: number
  lng: number
}

export interface Step {
  distance: Distance2
  duration: Duration2
  end_location: EndLocation2
  html_instructions: string
  polyline: Polyline
  start_location: StartLocation2
  travel_mode: string
  maneuver?: string
}

export interface Distance2 {
  text: string
  value: number
}

export interface Duration2 {
  text: string
  value: number
}

export interface EndLocation2 {
  lat: number
  lng: number
}

export interface Polyline {
  points: string
}

export interface StartLocation2 {
  lat: number
  lng: number
}

export interface OverviewPolyline {
  points: string
}

