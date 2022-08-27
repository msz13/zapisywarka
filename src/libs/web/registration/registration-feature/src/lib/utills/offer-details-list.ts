import { OfferDetails } from "../domain/offers/offer.model"

export const offerDetatilsListFixture: OfferDetails[] = [   
 {
    id: "1",
    name: "Oferta testowa",
    offerItems: [
    {
      offerItemId: "1",
      name: 'Bochenek tradycyjny'
    },
    {
      offerItemId: "2",
      name: 'Bochenek francuski'
    },
    {
      offerItemId: "3",
      name: "Foremkowy"
    }
    ]
  },
  {
    id: "2",
    name: "Oferta testowa2",
    offerItems: [
    {
      offerItemId: "1",
      name: 'Bochenek tradycyjny'
    },
    {
      offerItemId: "2",
      name: 'Bochenek francuski'
    }
  ]
  }
]