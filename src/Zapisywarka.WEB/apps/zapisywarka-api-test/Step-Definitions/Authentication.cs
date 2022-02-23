
using System.Net.Http;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
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
    
    WebApplicationFactory<Program> _factory;

    public AuthenticationStepDefinitons(ScenarioContext scenarioContext, ISpecFlowOutputHelper specFlowOutputHelper) : base(scenarioContext, specFlowOutputHelper)
    {
    }

    [BeforeScenario]
    void SetUpActor()
    {
      _factory = new WebApplicationFactory<Program>().WithWebHostBuilder((host) =>
           {
            host.UseEnvironment(Microsoft.Extensions.Hosting.Environments.Development);           
          });
      var client = _factory.CreateClient();

      john = new Actor(name: "Jan", logger: new BoaSpecFlowLogger(_specFlowOutputHelper));
      john.Can(new MemoryAbility());    
      john.Can(new ItentityTestServerAbility(client));            
      john.Can(CallApi.WithClient(client));

    }


    [Given(@"Organizator zapisów zarejestrował konto jako użytkownik ""(.*)"" z hasłem ""(.*)""")]
    public async Task GivenOrganizatorZapisowZarejestrowalKontoJakoUzytkownikZHaslem(string userName, string pasword)
    {
      var credentals = new UserCredentials { UserName = userName, Password = pasword };

      await john.AttemptsToAsync(
        CreateUserAccount.WithName(credentals.UserName).WithPassword(credentals.Password).WithPasswordConfirmation(credentals.Password)
        );
      john.AttemptsTo(Remember.Fact("credentials", credentals));

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
      var userInfo =  await john.AskingForAsync<UserInfo>(GetUserInfo.Now());
      var credentals = john.AskingFor(Recall.Fact("credentials")) as UserCredentials;

      userInfo.UserName.Should().Be(credentals.UserName);
    }

  }
}