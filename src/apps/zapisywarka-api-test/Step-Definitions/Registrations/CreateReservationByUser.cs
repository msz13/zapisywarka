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

    [Given(@"Dostępny jest formularz zapisów, zawierającą następujące pozycje:")]
    public async Task GivenDostepnyJestFormularzZapisowNaOferteZawierajacaNastepujacePozycje(Table table)
    {     

      var offerRequest = new OfferData
      {      
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

    [Given(@"Jan, przyjmujący zapisy, za pomocą dostępnego formularza rezerwuje dla klienta następujące pozycje:")]
    public void GivenJanPrzyjmujacyZapisyWRamachOfertyRezerwujeDlaKlientaNastepujacePozycje(Table table)
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

    [Then(@"Rezerwacja jest zapisana i zawiera powyższe pozycje")]
    public void ThenRezerwacjaJestZapisanaIZawieraPowyzszeInformacje()
    {      
        var reservation = LastResponse<ReservationDetails>.Result().RequestAs(andrew);
        reservation.IsSuccess.Should().BeTrue();      
        _reservation = reservation.Value;
        var expectedReservaionItems = reservedItemsSpecyfication.CreateSet<ReservationDetails.ReservedItem>();
        _reservation.ReservedItems.Should().BeEquivalentTo(expectedReservaionItems); 
        
        //reservedItemsSpecyfication.CompareToSet(_reservation.ReservedItems);


     /*     var request = _request.Build();
         _reservation.Should().BeEquivalentTo(request, options => options
                                                                  .WithMapping<ReservationDetails>(request => request.ReservationItems,
                                                                                                  reservation => reservation.ReservedItems));
      */  
    }

    [Then(@"Dodatkowe dane:")]
    public void ThenDodatkoweDane(Table table)
    {       
       var expected = table.CreateInstance<ReservationDetails>();
       _reservation.ReservationNumber.Should().Be(expected.ReservationNumber);
       var createdDate = DateTime.Parse(_reservation.CreatedAt);
       createdDate.Should().BeCloseTo(DateTime.Parse(expected.CreatedAt), TimeSpan.FromSeconds(5));
       
    } 

  }

}