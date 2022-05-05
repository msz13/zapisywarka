export interface Offer {
  name: string;
  endOfferDate?: Date;
  startCollectionDate: Date;
  endCollectionDate: Date;
  offerItems: OfferItem[];
}

export interface OfferItem {
  id: string;
  catalogItemId: string;
  price: number;
  avaibleQuantity: number;
}

interface OfferListView {
  offerName: string;
  endOfRegistration: Date;
  isActive: boolean;
}

export interface OfferItemInput {
  id: string;
  catalogItemId: string;
  price: number;
  initialAvaibleQuantity: number;
}

interface OfferItemView {
  id: string;
  catalogName: string;
  category: string;
  price: number;
  avaibleQuantity: number;
}

interface OfferDetailView {
  offerName: string;
  endOfRegistration: Date;
  isActive: boolean;
  collectionDates: object;
  offerItems: OfferItemView[];
}

interface offerItemStatsView {
  id: string;
  catalogName: string;
  category: string;
  registerdItems: number;
  collectedItems: number;
  purchaseValue: number;
}

interface OfferSummary {
  offerName: string;
  endOfRegistration: Date;
  isActive: boolean;
  collectionDates: object;
  offerItems: offerItemStatsView[];
}
