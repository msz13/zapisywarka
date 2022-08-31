import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferDetails } from './offer.model';
import { ConfigurationService } from '@zapisywarka-web/web-shared-domain'

@Injectable({
  providedIn: 'root'
})
export class OffersApiService {

  constructor(private http: HttpClient, private config: ConfigurationService) { }
 
  getAll(): Observable<OfferDetails[]> {

    const url = this.config.getConfig().apiUrl + '/offers'
    console.log('from service: '+url)
    return this.http.get<OfferDetails[]>(url)
  }


  
  
  
}
