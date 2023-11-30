export class TaxiFare {
  companyName?: string;
  price!: number;

}

export class ResponseDto<T> {
  responseData?: T;
  messageToClient?: string;
}

export interface TaxiPricesDto {
  taxiCompanies: TaxiCompany[]
  taxiPrices: TaxiPrices
}

export interface TaxiCompany {
  companyName: string
}

export type TaxiPrices = Record<string, number>;

export class ConfirmPriceDTO {
  companyName: string | undefined
  km: number | undefined
  min: number | undefined
  persons: number | undefined
  price: number | undefined

}
/*
export interface TaxiPrices {
  FalseTaxi: number
  MockTaxi: number
  DefinitelyNotATaxi: number
}
*/

