
export type offerId = string

export interface OfferDetails {
    id: string,
    name: string,
    offerItems: OfferItem[]
  }
  
export interface OfferItem {
    offerItemId: string,
    name: string
}

export interface OffersState {
  offers: Map<string,OfferDetails>
  
}