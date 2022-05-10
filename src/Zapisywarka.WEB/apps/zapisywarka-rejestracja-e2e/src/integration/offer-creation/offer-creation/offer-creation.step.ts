import { OfferCreationDriver } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/ui/offer-creation";
import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps/index";

let offerCreationDriver: OfferCreationDriver
let offerData: any
let offer: any

beforeEach(()=>{
 
})


Given('2021-12-18T15:13', ()=>{
    console.log('2021-12-18T15:13')
})

Given('Jan organizator zapisów wskazał nazwę oferty {string}', (offerName: string)=>{
    offerData.name = offerName
})

And('Wskazał pozycje oferty:', (positions: any)=>{
    offerData.positions = positions.hashes()
})

When('Zapisuje ofertę', ()=>{
    offerCreationDriver.CreateOffer(offerData)
})

Then('Oferta zapisów o nazwie {string} jest dostępna do zbierania zapisów:', (offerName: string, positions: any)=>{
   offer =  offerCreationDriver.GetOfferDetails(offerName)
})

And('Zawiera następujące pozycje', (positions: any)=>{
    offer.positions.shoult('equal', positions)
})


/* it('should create offer', ()=>{

    //Given
    const offerName = "Poniedziałek" 
    const offerItems = [
        {name: 'Bochenek' },
        {name: 'Foremkowy'}
    ]

    //When
    offerCreationDriver.CreateOffer({name: offerName, items: offerItems})

    //Then
    const offer = offerCreationDriver.GetOfferDetails(offerName)
    expect(offer.items).to.deep.equal(offerItems)
}) */



