import { SpectatorRouting, createRoutingFactory } from '@ngneat/spectator/jest';
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



describe('RegistrationFormContainer', () => {
    let spectator: SpectatorRouting<RegistrationFormContainer>;
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
    })

    describe("registration form rendering", () => {

        it("should render registration form", () => {

            const offerDetatils: OfferDetails = offerDetatilsListFixture[0]

            const service = spectator.inject<OffersService>(OffersService)

            service.selectOfferById.mockReturnValue(of(offerDetatils))

            spectator.detectChanges()

            const offer = spectator.query(RegistrationFormComponent)?.offer

            expect(offer).toEqual(offerDetatils)


        })
    })

    describe("reserve items", () => {

        it("should call reservation service", () => {

            const offerDetatils: OfferDetails = offerDetatilsListFixture[0]


            const registrationService = spectator.inject(RegistrationService)

            const registrationForm = spectator.query(RegistrationFormComponent)
            const reservation: ReservationInput = {
                receptionPassword: "test",
                comments: "test comment",
                reservedItems: [
                    {
                        offerItemId: "1",
                        quantity: 1
                    }
                ]
            }

            registrationForm?.reservation.emit(reservation)

            expect(registrationService.submitReservation).toHaveBeenCalledWith(offerDetatils.id, reservation)
        })

        it('should show loader when reservation is submitting', () => {

            const offersService = spectator.inject<OffersService>(OffersService)

            offersService.selectOfferById.mockReturnValue(of(offerDetatilsListFixture[0]))

            const registrationService = spectator.inject(RegistrationService)

            const registrationForm = spectator.query(RegistrationFormComponent)
            registrationService.loading$ = of(true)

            spectator.detectChanges()

            expect(registrationForm?.submitting).toBe(true)

        })

        it('should hide loader when reservation is submitted', () => {

            const registrationService = spectator.inject(RegistrationService)

            const registrationForm = spectator.query(RegistrationFormComponent)
            registrationService.loading$ = of(false)

            spectator.detectChanges()

            expect(registrationForm?.submitting).toBe(false)

        })
    })
});

