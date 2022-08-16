import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { OfferItem } from '../registration-form.model';
import { ReservedItem } from '../reservation.model';
import { RegistrationFormService } from './registration-form-service.service';


//TODO Rozdzielić interfejs servisu, na inicjacje w konstruktorze, aGroup - getter form group, addOfferItems 
//TODO dodać typy do form group

const offerItems: OfferItem[] = [
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
  },
]

describe('RegistrationFormServiceService', () => {
  let spectator: SpectatorService<RegistrationFormService>;
  let sut: RegistrationFormService
  const createService = createServiceFactory({
    service: RegistrationFormService,
    imports: [ReactiveFormsModule]
  });

  beforeEach(() => {
    spectator = createService()
    sut = spectator.service
  });

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should create form array from offer items', ()=>{

    sut.setReservetItemsControl(offerItems) 

    const offerItemsArray = sut.aFormGroup.get("reservedItems") as FormArray
   
    expect(offerItemsArray).toHaveLength(3)
    expect(offerItemsArray.at(0).get("offerItemId")?.disabled).toBeTruthy()
    
  })

  it("should transform form value to reservation input", ()=>{
     
    sut.setReservetItemsControl(offerItems)

    const form = sut.aFormGroup

    
    form.get("receptionPassword")?.setValue("testowe")
    form.get("comments")?.setValue("przykładowy komentarz")
    const offerItemsArray = form.get("reservedItems") as FormArray
    offerItemsArray.at(0).get("quantity")?.setValue("3")
    offerItemsArray.at(2).get("quantity")?.setValue("1")


    const reservationInput = sut.getReservationInput()

    expect(reservationInput).toStrictEqual({
      receptionPassword: "testowe",
      comments: "przykładowy komentarz",
      reservedItems: [
        {
          offerItemId: "1",
          quantity: 3
        },
        { 
          offerItemId: "3",
          quantity: 1
        }
      ]    
  })    

  })

  it('should get reserved item control on specyfic index', ()=>{
            
      sut.setReservetItemsControl(offerItems)
      const secondItem = sut.getReservedItemAt(1).getRawValue() as ReservedItem 

      expect(secondItem.offerItemId).toBe("2")

  })

  
});