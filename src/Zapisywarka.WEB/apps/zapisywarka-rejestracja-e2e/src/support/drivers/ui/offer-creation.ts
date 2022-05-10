interface OfferData {
    name: string,
    items: OfferItem[]
}

interface OfferItem {
    name: string
}

interface Offer {
    id: string
    name: string
    items: OfferItem[]
}

export class OfferCreationDriver {
   
    GetOfferDetails(offerName: string): Offer {
        console.log(offerName)
        return {} as Offer
    }

    CreateOffer(offerData: OfferData) {
        console.log(offerData)
        
    }

}
