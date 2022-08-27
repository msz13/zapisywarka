import { ReservationInput } from "../domain/registrations/reservation.model";

export const reservationInputFixture: ReservationInput = {        
    receptionPassword: "Kowalski",
    comments: "Odbierze żona",
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
  }