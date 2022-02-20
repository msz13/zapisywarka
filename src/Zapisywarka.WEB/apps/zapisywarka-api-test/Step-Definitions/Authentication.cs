
using System.Net.Http;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;
using Zapisywarka.API.AcceptanceTests.Helpers;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using ZapisywarkaApi.AcceptanceTests.Helpers;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class AuthenticationStepDefinitons : StepsBaseClass
  {
    IActor john;   

    public AuthenticationStepDefinitons(ScenarioContext scenarioContext, ISpecFlowOutputHelper specFlowOutputHelper) : base(scenarioContext, specFlowOutputHelper)
    {
    }

    [BeforeScenario]
    void SetUpActor()
    {
      john = new Actor(name: "Jan", logger: new BoaSpecFlowLogger(_specFlowOutputHelper));
      john.Can(new MemoryAbility());
      john.Can(new ItentityTestServerAbility(_scenarioContext.ScenarioContainer.Resolve<HttpClient>()));
    }


    [Given(@"Organizator zapisów zarejestrował konto jako użytkownik ""(.*)"" z hasłem ""(.*)""")]
    public async Task GivenOrganizatorZapisowZarejestrowalKontoJakoUzytkownikZHaslem(string userName, string pasword)
    {

      await john.AttemptsToAsync(
        CreateUserAccount.WithName(userName).WithPassword(pasword).WithPasswordConfirmation(pasword)
        );
      john.AttemptsTo(Remember.Fact("credentials", new UserCredentials { UserName = userName, Password = pasword }));

    }

    [Given(@"Podaje poprawne dane logowania")]
    public void GivenPodajePoprawneDaneLogowania()
    {

    }

    [When(@"Próbuje się zalogować")]
    public async Task WhenProbujeSieZalogowac()
    {
      var credentals = john.AskingFor<dynamic>(Recall.Fact("credentials")) as UserCredentials;
      await john.AttemptsToAsync(Login.WithName(credentals.UserName).WithPassword(credentals.Password));
    }

    [Then(@"Powinien otrzymać dostęp do swojego konta w aplikacji")]
    public async Task ThenPowinienOtrzymacDostepDoSwojegoKontaWAplikacji()
    {
      // await john.AttemptsToAsync()
    }

  }
}