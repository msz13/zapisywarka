using System;
using System.Collections.Generic;
using Boa.Constrictor.Screenplay;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using TechTalk.SpecFlow.Infrastructure;
using Zapisywarka.Api.Test.Interactions.Registrations;
using Zapisywarka.API.AcceptanceTests.Interactions.Registrations;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using System.Threading.Tasks;
using Boa.Constrictor.RestSharp;
using CSharpFunctionalExtensions;
using FluentAssertions;
using System.Linq;

namespace MyNamespace
{
  [Binding]
  public class StepDefinitions
  {

    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;
    private IActor andrew;
    private CreateOffer.Response _offer;

    private Table reservedItemsSpecyfication;
    private ReservationRequestBuilder _request;
    private ReservationDetails _reservation;
    

    public StepDefinitions(ISpecFlowOutputHelper specFlowOutputHelper, Cast cast)
    {
      _specFlowOutputHelper = specFlowOutputHelper;
      andrew = cast.actorNamed("Andrew");

    }

     [Given(@"Koordynator zapisów ""(.*)"" jest zalogowany")]
    public async Task GivenKoordynatorZapisowJestZalogowanyAsync(string andrzej0)
    {
        var credentials = new UserCredentials();
        await andrew.AttemptsToAsync(CreateUserAccount.With(credentials));
        await andrew.AttemptsToAsync(Login.WithCredentials(credentials));
    } 

    [Given(@"Dostępny jest formularz zapisów, na ofertę ""(.*)"" zawierającą następujące pozycje:")]
    public async Task GivenDostepnyJestFormularzZapisowNaOferteZawierajacaNastepujacePozycje(string offerName, Table table)
    {     

      var offerRequest = new OfferData
      {
        Name = offerName,
        OfferItems = table.CreateSet<OfferData.OfferItem>()
      };

        await andrew.AttemptsToAsync(CreateOffer.With(offerRequest));
        _offer = LastResponse<CreateOffer.Response>.Result().RequestAs(andrew).Value;
        _offer.Should().BeEquivalentTo(offerRequest);    
      
    }

   /*   [Given(@"Jest ""(.*)""")]
    public void GivenJest(string p0)
    {

    } */

    [Given(@"Jan, przyjmujący zapisy, w ramach oferty ""(.*)"" rezerwuje dla klienta następujące pozycje:")]
    public void GivenJanPrzyjmujacyZapisyWRamachOfertyRezerwujeDlaKlientaNastepujacePozycje(string poniedziałek0, Table table)
    {
        reservedItemsSpecyfication = table;
     
        _request = new ReservationRequestBuilder()
            .ForOffer(_offer)           
            .WithItems(reservedItemsSpecyfication.CreateSet<ReservationRequestBuilder.Item>());
           
       
    }


    [Given(@"wprowadza dane rezerwacji:")]
    public void GivenWprowadzaDaneRezerwacji(Table table)
    {
        _request.WithPassword(table.Rows[0]["Hasło odbioru"]);
        _request.WithComments(table.Rows[0]["Uwagi"]);
        
    }

    [When(@"Zatwierdza rezerwację")]
    public async Task WhenZatwierdzaRezerwacje()
    {
        await andrew.AttemptsToAsync(ReserveItems.With(_offer.Id, _request.Build()));
        
    }

    [Then(@"Rezerwacja jest zapisana i zawiera powyższe informacje")]
    public void ThenRezerwacjaJestZapisanaIZawieraPowyzszeInformacje()
    {      
        var reservation = LastResponse<ReservationDetails>.Result().RequestAs(andrew);
        reservation.IsSuccess.Should().BeTrue();
        
     /*    reservedItemsSpecyfication.CompareToSet<ReservationDetails.ReservedItem>(_reservation.Value.ReservedItems);
        _reservation.Value.ReceptionPassword.Should().Be(_request.Build().ReceptionPassword);
         _reservation.Value.Comments.Should().Be(_request.Build().Comments); */

         _reservation = reservation.Value;
         var request = _request.Build();
         _reservation.Should().BeEquivalentTo(request, options => options
                                                                  .WithMapping<ReservationDetails>(request => request.ReservationItems,
                                                                                                  reservation => reservation.ReservedItems));
       
    }

    [Then(@"Dodatkowe dane:")]
    public void ThenDodatkoweDane(Table table)
    {       
       var expected = table.CreateInstance<ReservationDetails>();
       _reservation.ReservationNumber.Should().Be(expected.ReservationNumber);
       _reservation.CreatedAt.Should().Be(expected.CreatedAt); 
    } 

  }

}