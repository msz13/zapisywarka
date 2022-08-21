import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OfferDetails } from "./offer.model";
import { OffersApiService } from "./offers-api.service";


@Injectable()
export class OffersService {
    
    selectedOffer$!: Observable<OfferDetails> 

    constructor(private offersApiService: OffersApiService) {
        this.selectedOffer$ = of({id: "0", name: "", offerItems: []})
    }

    getSelectedOfferId(): string {
        throw new Error('Method not implemented')
    }

    loadOfferDetails(id: string)  {
        this.offersApiService.getById(id)
    }

    
    
}