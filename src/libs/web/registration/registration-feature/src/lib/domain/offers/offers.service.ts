import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs' 
import { map, tap } from "rxjs/operators";
import { OfferDetails, OffersState } from "./offer.model";
import { OffersApiService } from "./offers-api.service";


@Injectable()
export class OffersService {
    
        
    offersState: OffersState = { offers: new Map([]),}
    dispach = new BehaviorSubject<OffersState>(this.offersState)
    
    constructor(private offersApiService: OffersApiService) {       

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

    
    private select() {
        return this.dispach.asObservable()
    }
    
}