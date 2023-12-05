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
  userName?: string;
  tlfNumber?: number;
  email?: string;
  password?: string;
}
