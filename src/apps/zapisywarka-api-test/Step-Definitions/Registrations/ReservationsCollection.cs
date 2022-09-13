using Boa.Constrictor.Screenplay;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using TechTalk.SpecFlow.UnitTestProvider;
using Zapisywarka.Api.Test.Interactions.Registrations;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class ReservationsCollection
  {

    private readonly IUnitTestRuntimeProvider unitTestRuntimeProvider;
    private IActor john;
    private OfferData _offer;

    public ReservationsCollection(IUnitTestRuntimeProvider _unitTestRuntimeProvider, Cast cast)
    {
      unitTestRuntimeProvider = _unitTestRuntimeProvider;
      john = cast.actorNamed("John");

    }

    [Given(@"Dostępny jest formularz zapisów, na ofertę ""(.*)"" zawierającą następujące pozycje:")]
    public async Task GivenDostepnyJestFormularzZapisowNaOferteZawierajacaNastepujacePozycje(string offerName, Table offerItemsTable)
    {
      var offerItems = offerItemsTable.CreateSet<OfferData.OfferItem>();
      _offer = new OfferData 
      {
        Name = offerName,
        OfferItems = offerItems
      };
      
    }

    [Given(@"Koordynator przyjmuje rezerwację dla klienta następujących pozycji:")]
    public void GivenKoordynatorPrzyjmujeRezerwacjeDlaKlientaNastepujacychPozycji(Table table)
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Given(@"Koordynator oznacza rezerwację dla klienta następujących pozycji:")]
    public void GivenKoordynatorOznaczaRezerwacjeDlaKlientaNastepujacychPozycji(Table table)
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Given(@"wprowadza dane rezerwacji:")]
    public void GivenWprowadzaDaneRezerwacji(Table table)
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [When(@"Zatwierdza rezerwację")]
    public void WhenZatwierdzaRezerwacje()
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Then(@"Rezerwacja jest zapisana i zawiera powyższe informacje")]
    public void ThenRezerwacjaJestZapisanaIZawieraPowyzszeInformacje()
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Then(@"Dodatkowe dane:")]
    public void ThenDodatkoweDane(Table table)
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }
  }
}