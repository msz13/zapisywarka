using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using Boa.Constrictor.Memory;
using Microsoft.AspNetCore.Mvc.Testing;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;
using System.Net;
using RestSharp;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using FluentAssertions;
using Boa.Constrictor.RestSharp;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class AuthenticationStepDefinitons 
  {
    Actor john;
    Cast _cast;
    UserCredentials _userCredentials;
   
    public AuthenticationStepDefinitons(Cast cast) 
    {
      _cast = cast;
      john = _cast.ActorNamed("John");
    }
   

    [Given(@"Organizator zapisów zarejestrował konto jako użytkownik ""(.*)"" z hasłem ""(.*)""")]
    public async Task GivenOrganizatorZapisowZarejestrowalKontoJakoUzytkownikZHaslem(string userName, string pasword)
    {
      _userCredentials = new UserCredentials { UserName = userName, Password = pasword };
      await john.AttemptsToAsync(CreateUserAccount.With(_userCredentials));
   
    }

    
    [When(@"Próbuje się zalogować podając poprawne dane")]
    public async Task WhenProbujeSieZalogowac()
    {
      await john.AttemptsToAsync(Login.WithCredentials(_userCredentials));
    }

    [When(@"Niezalogowany użytkownik chce otrzymać dostęp do swojego konta")]
    public async Task WhenNiezalogowanyUzytkownikChceOtrzymacDostepDoSwojegoKonta()
    {
      var anonymousUser = _cast.ActorNamed("anonymous");
      await anonymousUser.AttemptsToAsync(Login.WithCredentials(new UserCredentials()));    
    }

    [Then(@"Powinien otrzymać dostęp do swojego konta w aplikacji")]
    public async Task ThenPowinienOtrzymacDostepDoSwojegoKontaWAplikacji()
    {
        await john.AttemptsToAsync(GetUserInfo.OfLoggedUser());

        var result = john.AskingFor(LastResponse<UserInfo>.Result());
        result.IsSuccess.Should().BeTrue();
        result.Value.userName.Should().Be(_userCredentials.UserName);
        

    }

    [Then(@"Widzi komunikat błędu")]
    public async Task ThenWidziKomunikatBledu()
    {
      await john.AttemptsToAsync(GetUserInfo.OfLoggedUser());
      var result = john.AskingFor(LastResponse<UserInfo>.Result());
      result.IsFailure.Should().BeTrue();

    }

  }
}
