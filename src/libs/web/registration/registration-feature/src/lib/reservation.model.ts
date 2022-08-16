
export interface ReservationInput {
    receptionPassword: string
    comments: string
    reservedItems: ReservedItem[]
}

export interface ReservedItem {
    offerItemId: string
    quantity: number
}