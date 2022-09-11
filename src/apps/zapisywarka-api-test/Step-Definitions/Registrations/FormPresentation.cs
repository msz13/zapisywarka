using System;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.UnitTestProvider;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class FormPresentation
  {

    private readonly IUnitTestRuntimeProvider unitTestRuntimeProvider;

    public FormPresentation(IUnitTestRuntimeProvider _unitTestRuntimeProvider)
    {
      unitTestRuntimeProvider = _unitTestRuntimeProvider;
    }

    [Given(@"Koordynator zapisów ""(.*)"" jest zalogowany")]
    public void GivenKoordynatorZapisowJestZalogowany(string andrzej0)
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Given(@"Organizator zapisów stworzył ofertę o nazwie ""(.*)"" zawierającą następujące pozycje:")]
    public void GivenOrganizatorZapisowStworzylOferteONazwieZawierajacaNastepujacePozycje(string poniedziałek0, Table table)
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Given(@"Jest ""(.*)""")]
    public void GivenJest(string p0)
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [When(@"Przegląda formularz rejestracji/formularz przyjmowania zapisów")]
    public void WhenPrzegladaFormularzRejestracjiFormularzPrzyjmowaniaZapisow()
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }

    [Then(@"Formularz zapisów, zawiera powyższe dane")]
    public void ThenFormularzZapisowZawieraPowyzszeDane()
    {
      unitTestRuntimeProvider.TestIgnore("not implemented");
    }
  }
}