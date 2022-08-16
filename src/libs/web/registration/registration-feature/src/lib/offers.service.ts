import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OfferDetails } from "./registration-form.model";


@Injectable()
export class OffersService {
    
    constructor(private httpClient: HttpClient) {}

    getOne()  {
        return this.httpClient.get<OfferDetails>('offers/1')
    }
}