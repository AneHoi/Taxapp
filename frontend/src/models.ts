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
