
export interface ReservationInput {
    receptionPassword: string
    comments: string
    reservedItems: ReservedItem[]
}

export interface ReservedItem {
    offerItemId: string
    quantity: number
}

type reservationId = string

export interface ReservationDetails {
   reservationNumber: reservationId
}

export interface RegistrationsState {
    loading: boolean
}