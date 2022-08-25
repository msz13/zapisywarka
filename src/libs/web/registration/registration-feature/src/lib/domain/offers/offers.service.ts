import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, of } from 'rxjs' 
import { map, tap, throwIfEmpty } from "rxjs/operators";
import { OfferDetails, OffersState } from "./offer.model";
import { OffersApiService } from "./offers-api.service";


@Injectable()
export class OffersService {
    
    selectedOffer$!: Observable<OfferDetails>     
    offersState: OffersState = { offers: [], selectedOfferId: ''}
    dispach = new BehaviorSubject<OffersState>(this.offersState)
    
    constructor(private offersApiService: OffersApiService, private route: ActivatedRoute) {
        this.selectedOffer$ = this.select().pipe(
            map(state => {
                const selectedId = state.selectedOfferId
                return state.offers.filter(offer => offer.id == selectedId)[0]
            })
        )
        
        this.route.paramMap.pipe(tap(params => {
            const id = params.get('offerId')
            if(id) {
                this.offersState.selectedOfferId = id
            }
            
        })).subscribe()

    }

    select() {
        return this.dispach.asObservable()
    }

    getSelectedOfferId(): string {
        return this.offersState.selectedOfferId
    }

    loadOfferDetails()  {
        this.offersApiService.getAll().pipe(
            tap(offers => {
                this.offersState.offers = offers
            })
        ).subscribe()
    }

    getOffers() {
        return this.offersState.offers
    }
    
}