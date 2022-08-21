export interface OfferDetails {
    id: string,
    name: string,
    offerItems: OfferItem[]
  }
  
export interface OfferItem {
    offerItemId: string,
    name: string
}