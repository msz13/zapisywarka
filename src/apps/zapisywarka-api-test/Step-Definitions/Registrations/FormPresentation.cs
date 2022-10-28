using System.Threading.Tasks;
using Boa.Constrictor.RestSharp;
using Boa.Constrictor.Screenplay;
using FluentAssertions;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using Zapisywarka.Api.Test.Interactions.Registrations;
using Zapisywarka.API.AcceptanceTests.Interactions.Registrations;
using ZapisywarkaApi.Test.Interactions.Registrations;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class StepDefinitions
  {
    private IActor john;
    private string offerId;

    private OfferData offerData;

    public StepDefinitions(Cast cast)
    {
      john = cast.actorNamed("John");
    }
    [Given(@"Organizator zapisów stworzył ofertę o nazwie ""(.*)"" zawierającą następujące pozycje:")]
    public async Task GivenOrganizatorZapisowStworzylOferteONazwieZawierajacaNastepujacePozycjeAsync(string offerName, Table table)
    {
      offerData = new OfferData
      {
        Name = offerName,
        OfferItems = table.CreateSet<OfferData.OfferItem>()
      };
      await john.AttemptsToAsync(CreateOffer.With(offerData));
      offerId = LastResponse<CreateOffer.Response>.Result().RequestAs(john).Value.Id;

    }

    [When(@"Przegląda formularz rejestracji/formularz przyjmowania zapisów")]
    public void WhenPrzegladaFormularzRejestracjiFormularzPrzyjmowaniaZapisow()
    {
      john.AttemptsTo(
       LocateRegistrationForm.ViaURLForOfferId(offerId)
      );

     

    }

    [Then(@"Formularz zapisów, zawiera powyższe dane")]
    public void ThenFormularzZapisowZawieraPowyzszeDane()
    {
       var offerDataFromForm = john.AskingFor<OfferData>(OfferDetails.FromReservationsForm());

      offerDataFromForm.Should().BeEquivalentTo(offerData); 

    }
  }
}