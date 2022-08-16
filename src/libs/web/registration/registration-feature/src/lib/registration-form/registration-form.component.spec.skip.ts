import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { byTestId, createComponentFactory, Spectator } from "@ngneat/spectator/jest";
import { RegistrationFeatureModule } from "../registration-feature.module";
import { ReservationInput } from "../reservation.model";
import { RegistrationFormService } from "./registration-form-service.service";
import { RegistrationFormComponent } from "./registration-form.component";

describe("registration form", ()=>{
    let spectator: Spectator<RegistrationFormComponent>;
    const createComponent = createComponentFactory({
    component: RegistrationFormComponent,
    imports: [RegistrationFeatureModule], 
    mocks: [RegistrationFormService],
    detectChanges: false
    
  });

  beforeEach(()=>{
    spectator = createComponent()
  })

  it("should create form group on init", ()=>{
    const service = spectator.inject(RegistrationFormService)
    const formGroup = new FormGroup({
        receptionPassword: new FormControl<string | null>(""),
        comments: new FormControl<string|null>(""),       
    })

    service.aGroup.mockImplementation((offerDetails) => formGroup)

    spectator.detectChanges()

    spectator.typeInElement("test comments", '[data-testid=comments] input')
    spectator.typeInElement("testowe", '[data-testid=reception-password] input')    

    let reservation

    spectator.output('reservation').subscribe(result => reservation = result)

    spectator.click(byTestId("confirm-button")) 

    const expectedReservation = {
        receptionPassword: "testowe",
        comments: "test comments",
        reservedItems: [{}]
    }

    expect(reservation).toStrictEqual(expectedReservation)
  })
  

})