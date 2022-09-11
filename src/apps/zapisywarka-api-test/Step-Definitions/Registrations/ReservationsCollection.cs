using TechTalk.SpecFlow;
using TechTalk.SpecFlow.UnitTestProvider;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class ReservationsCollection
  {

    private readonly IUnitTestRuntimeProvider unitTestRuntimeProvider;

    public ReservationsCollection(IUnitTestRuntimeProvider _unitTestRuntimeProvider)
    {
      unitTestRuntimeProvider = _unitTestRuntimeProvider;
    }

    [Given(@"Dostępny jest formularz zapisów, na ofertę ""(.*)"" zawierającą następujące pozycje:")]
    public void GivenDostepnyJestFormularzZapisowNaOferteZawierajacaNastepujacePozycje(string poniedziałek0, Table table)
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
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