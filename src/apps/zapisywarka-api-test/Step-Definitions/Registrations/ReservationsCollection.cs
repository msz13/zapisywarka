using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boa.Constrictor.RestSharp;
using Boa.Constrictor.Screenplay;
using CSharpFunctionalExtensions;
using FluentAssertions;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using TechTalk.SpecFlow.Infrastructure;
using TechTalk.SpecFlow.UnitTestProvider;
using Zapisywarka.Api.Test.Interactions.Registrations;
using Zapisywarka.API.AcceptanceTests.Interactions.Registrations;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class ReservationsCollection
  {

    private readonly IUnitTestRuntimeProvider unitTestRuntimeProvider;
    private readonly ISpecFlowOutputHelper specFlowOutputHelper;
    private IActor john;
    private IEnumerable<CreateOffer.Response> _offers;
    private ReservationRequest _reservation;

    public object OfferItems { get; private set; }

    public ReservationsCollection(IUnitTestRuntimeProvider _unitTestRuntimeProvider, ISpecFlowOutputHelper _specFlowOutputHelper, Cast cast)
    {
      unitTestRuntimeProvider = _unitTestRuntimeProvider;
      specFlowOutputHelper = _specFlowOutputHelper;
      john = cast.actorNamed("John");

    }

    [Given(@"Dostępny jest formularz zapisów, na ofertę ""(.*)"" zawierającą następujące pozycje:")]
    public async Task GivenDostepnyJestFormularzZapisowNaOferteZawierajacaNastepujacePozycje(string offerName, Table offerItemsTable)
    {
      var offerData = new OfferData
      {
        Name = offerName,
        OfferItems = offerItemsTable.CreateSet<OfferData.OfferItem>()
      };
      
      /* await john.AttemptsToAsync(CreateOffer.With(offerData));
      var result = john.AskingFor<Result<IEnumerable<CreateOffer.Response>>>(LastResponse<Result<IEnumerable<CreateOffer.Response>>>.Result());
      result.IsSuccess.Should().BeTrue(); 
      _offers = result.Value; */ 

      _offers = new List<CreateOffer.Response> {
        new CreateOffer.Response{
            Name = "Test",
            OfferItems = new List<CreateOffer.Response.OfferItem> {
                new CreateOffer.Response.OfferItem {
                    Name = "testowy 1",
                    OfferItemId = "1"
                }
            }
        }
      };
     

    }

    [Given(@"Koordynator przyjmuje rezerwację dla klienta następujących pozycji:")]
    public void GivenKoordynatorPrzyjmujeRezerwacjeDlaKlientaNastepujacychPozycji(Table table)
    {
     // unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Given(@"Jan, przyjmujący zapisy, w ramach oferty {offerName} rezerwuje dla klienta następujące pozycje:")]
    public async Task GivenKoordynatorOznaczaRezerwacjeDlaKlientaNastepujacychPozycji(string offerName, Table reservationItems)
    {
       var offer = _offers.Where(offer => offer.Name == offerName).SingleOrDefault();
       _reservation = new ReservationRequest();
       _reservation.OfferId = offer.Id;  
       var data  = new ReservationData();
       data.Items = reservationItems.CreateSet<ReservationData.Item>(); 
       _reservation.ReservationItems = data.ReservationRequestItemsForOffer(offer);
      
    }

    [Given(@"wprowadza dane rezerwacji:")]
    public void GivenWprowadzaDaneRezerwacji(Table table)
    {
     _reservation.ReceptionPassword = table.Rows[0]["Hasło odbioru"];
     _reservation.Comments = table.Rows[0]["Hasło odbioru"];
    }

    [When(@"Zatwierdza rezerwację")]
    public async Task WhenZatwierdzaRezerwacje()
    {
        _reservation.Should().BeEquivalentTo<ReservationRequest>(new ReservationRequest());
      // await john.AttemptsToAsync(ConfirmReservation.With(_reservation));
    }

    [Then(@"Rezerwacja jest zapisana i zawiera powyższe informacje")]
    public void ThenRezerwacjaJestZapisanaIZawieraPowyzszeInformacje()
    {
      // unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Then(@"Dodatkowe dane:")]
    public void ThenDodatkoweDane(Table table)
    {
      // unitTestRuntimeProvider.TestIgnore("not implemented");
    }
  }
}