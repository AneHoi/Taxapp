export type TaxiDTO = TaxInfo[]

export interface TaxInfo {
  companyName: string
  taxiPrice: number
  companyLogo: any
}

export interface ConfirmPriceDTO {
  companyName: string
  km: number
  min: number
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

export interface AddressAPIJsonResponseModel {
  results: Address[]
}
export interface Address {
  country: string
  country_code: string
  state: string
  city: string
  village: string
  postcode: string
  district: string
  suburb: string
  street: string
  housenumber: string
  lon: number
  lat: number
  formatted: string
  address_line1: string
  address_line2: string
  plus_code: string
  plus_code_short: string
  result_type: string
  place_id: string
}
