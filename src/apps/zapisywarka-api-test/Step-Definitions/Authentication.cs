using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using Microsoft.AspNetCore.Mvc.Testing;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;
using System.Net;
using RestSharp;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using FluentAssertions;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class AuthenticationStepDefinitons 
  {
    Actor john;
   
    public AuthenticationStepDefinitons(Actor actor) 
    {
      john = actor;
    }
   

    [Given(@"Organizator zapisów zarejestrował konto jako użytkownik ""(.*)"" z hasłem ""(.*)""")]
    public async Task GivenOrganizatorZapisowZarejestrowalKontoJakoUzytkownikZHaslem(string userName, string pasword)
    {
      await john.AttemptsToAsync(CreateUserAccount.With(new UserCredentials{UserName = userName, Password = pasword}));
    }

    
    [When(@"Próbuje się zalogować podając poprawne dane")]
    public async Task WhenProbujeSieZalogowac()
    {
      await john.AttemptsToAsync(Login.WithCorrectCredentials());
    }

    [When(@"Niezalogowany użytkownik chce otrzymać dostęp do swojego konta")]
    public async Task WhenNiezalogowanyUzytkownikChceOtrzymacDostepDoSwojegoKonta()
    {

    
    }

    [Then(@"Powinien otrzymać dostęp do swojego konta w aplikacji")]
    public async Task ThenPowinienOtrzymacDostepDoSwojegoKontaWAplikacji()
    {
        await john.AttemptsToAsync(GetUserInfo.OfLoggedUser());

        var result = john.AskingFor(GetUserInfo.Result());
        result.StatusCode.Should().Be(HttpStatusCode.OK);
        result.IsSuccessful.Should().BeTrue();
        result.Content.As<UserInfo>().UserName.Should().Be(new UserCredentials().UserName);
    }

    [Then(@"Widzi komunikat błędu")]
    public void ThenWidziKomunikatBledu()
    {
      
    }

  }
}
