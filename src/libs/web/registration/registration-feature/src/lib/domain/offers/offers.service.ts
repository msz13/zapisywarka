import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, of } from 'rxjs' 
import { map, tap, throwIfEmpty } from "rxjs/operators";
import { offerDetatilsListFixture } from "../../utills/offer-details-list";
import { OfferDetails, OffersState } from "./offer.model";
import { OffersApiService } from "./offers-api.service";


@Injectable()
export class OffersService {
    
        
    offersState: OffersState = { offers: new Map([]),}
    dispach = new BehaviorSubject<OffersState>(this.offersState)
    
    constructor(private offersApiService: OffersApiService, private route: ActivatedRoute) {
       

    }
   

    selectOfferById(id: string): Observable<OfferDetails|undefined> {
         return this.select().pipe(
            map(state => state.offers),
            map(offers => offers.get(id))
        
        ) 
        
    }


    
    loadOfferDetails()  {
        this.offersApiService.getAll().pipe(
            tap(offers => {
               
             const offersMap = offers.reduce((offerMap, offer)=>{
                offerMap.set(offer.id, offer)
                return offerMap
             },new Map<string, OfferDetails>([]))  

             this.offersState = {
                ...this.offersState,
                offers: offersMap
             }
             this.dispach.next(this.offersState)
            })
        ).subscribe()
    }

    getOffers() {
        return this.offersState.offers.values()
    }

    private select() {
        return this.dispach.asObservable()
    }
    
}