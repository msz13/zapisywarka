import { SpectatorRouting, createRoutingFactory, SpyObject } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { RegistrationFeatureModule } from '../registration-feature.module';
import { RegistrationFormContainer } from './registration-form.container';
import { MockComponent } from 'ng-mocks'
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { OfferDetails } from '../domain/offers/offer.model';
import { ReservationInput } from '../domain/registrations/reservation.model';
import { OffersService } from '../domain/offers/offers.service'
import { offerDetatilsListFixture } from '../utills/offer-details-list';
import { RegistrationService } from '../domain/registrations/registration.service';
import { cold, Scheduler } from 'jest-marbles'
import { reservationInputFixture } from '../utills/ReservationInputFixture';
import { Router } from '@angular/router';
import { reservationDetailsFixture } from '../utills/reservationDetailsFixture';



describe('RegistrationFormContainer', () => {
    let spectator: SpectatorRouting<RegistrationFormContainer>;
    let offersService: SpyObject<OffersService>
    let registrationService: SpyObject<RegistrationService>

    const createComponent = createRoutingFactory({
        component: RegistrationFormContainer,
        imports: [RegistrationFeatureModule],
        declarations: [MockComponent(RegistrationFormComponent)],
        mocks: [OffersService, RegistrationService],
        detectChanges: false,
        params: { offerId: "1" }

    });

    beforeEach(() => {
        spectator = createComponent()
        spectator.fixture.whenStable()
        registrationService = spectator.inject(RegistrationService)
        offersService = spectator.inject(OffersService)
    })

    describe("registration form rendering", () => {

        it("should render registration form", () => {

            const offerDetatils: OfferDetails = offerDetatilsListFixture[0]
                     
            offersService.selectOfferById.mockReturnValue(of(offerDetatils))

            spectator.detectChanges()

            const offer = spectator.query(RegistrationFormComponent)?.offer

            expect(offer).toEqual(offerDetatils)


        })
    })

    describe("reserve items", () => {

        const offerDetatils = offerDetatilsListFixture[0]
        const reservationInput: ReservationInput = reservationInputFixture

        beforeEach(()=>{
            offersService.selectOfferById.mockReturnValue(of(offerDetatils))
        })

        it("should call reservation service", () => {
           

            registrationService.submitReservation.mockReturnValue(of({reservationNumber: '001'}))
            
            const registrationForm = spectator.query(RegistrationFormComponent)            
            
            registrationForm?.reservation.emit(reservationInput)

            expect(registrationService.submitReservation).toHaveBeenCalledWith(offerDetatils.id, reservationInput)
        })

        it('should show loader when registration services emits loading', () => {
          
            registrationService.submitReservation.mockReturnValue(of({reservationNumber: '001'}))            

            const registrationForm = spectator.query(RegistrationFormComponent)
            registrationService.loading$ = of(true)

            spectator.detectChanges()

            expect(registrationForm?.submitting).toBe(true)

        })

        it('should hide loader when registration services emits not loading', () => {
          
            registrationService.submitReservation.mockReturnValue(of({reservationNumber: '001'}))
            
            registrationService.loading$ = of(false)
            
            spectator.detectChanges()

            const registrationForm = spectator.query(RegistrationFormComponent)

            expect(registrationForm?.submitting).toBe(false)

        })

        it('should redirect after succesful submit', ()=>{

            const reservationNumber = '001'
           
            registrationService.submitReservation.mockReturnValue(of({reservationNumber: reservationNumber}))

            spectator.detectChanges()                       
        
            const router = spectator.inject(Router)                      

            const registrationForm = spectator.query(RegistrationFormComponent)
            const reservation: ReservationInput = reservationInputFixture

            registrationForm?.reservation.emit(reservation)                      

            expect(router.navigate).toHaveBeenCalledWith(['oferty', offerDetatils.id, 'rezerwacje', reservationNumber])


        })
    })
});

