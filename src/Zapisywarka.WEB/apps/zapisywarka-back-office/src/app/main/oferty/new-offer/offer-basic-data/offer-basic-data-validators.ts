import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn, AsyncValidator } from '@angular/forms'
import { OffersService } from '@zapisywarka-client-aps/offers/domain';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


export const endCollectionGraterThanStart: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('startCollectionDate').value as Date
    const end = control.get('endCollectionDate').value as Date   
  
    return start && end && end.getTime() < start.getTime()? { endCollectionGraterThanStart: {message: 'Data zakończenia odbioru nie może być mniejsza niż rozpoczęcia'}} : null;
  };


  export const endCollectionEarlierThanEndOffer: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const endOffer = control.get('endOfferDate').value as Date
    const endCollection = control.get('endCollectionDate').value as Date   
  
    return endOffer && endCollection && endCollection.getTime() < endOffer.getTime()? { endCollectionGraterThanStart: {message: 'Data zakończenia odbioru nie może być wcześniejsza niż zakończenia zapisów'}} : null;
  };


  @Injectable({ providedIn: 'root' })
export class UniqueOfferNameValidator {
  constructor(private offersService: OffersService) {}

  validate(
    name: string
  ): Observable<ValidationErrors | null> {

    return this.offersService.isNameValid(name).pipe(
      map(isValid => (!isValid ? { uniqueOfferName: {message: `Nazwa oferty '${name}' została już użyta`} } : null)),
      catchError(() => of(null))
    );
    
  }
}