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
   
    public AuthenticationStepDefinitons(Actor actor) 
    {
      john = actor;
    }
   

    [Given(@"Organizator zapisów zarejestrował konto jako użytkownik ""(.*)"" z hasłem ""(.*)""")]
    public async Task GivenOrganizatorZapisowZarejestrowalKontoJakoUzytkownikZHaslem(string userName, string pasword)
    {

      var userCredentials = new UserCredentials { UserName = userName, Password = pasword };
      await john.AttemptsToAsync(CreateUserAccount.With(userCredentials));
      john.AttemptsTo(Remember.Fact("credentials", userCredentials));
    }

    
    [When(@"Próbuje się zalogować podając poprawne dane")]
    public async Task WhenProbujeSieZalogowac()
    {
      var credentials = john.AskingFor<UserCredentials>(Recall<UserCredentials>.Fact("credentials"));
      await john.AttemptsToAsync(Login.WithCredentials(credentials));
    }

    [When(@"Niezalogowany użytkownik chce otrzymać dostęp do swojego konta")]
    public async Task WhenNiezalogowanyUzytkownikChceOtrzymacDostepDoSwojegoKonta()
    {

    
    }

    [Then(@"Powinien otrzymać dostęp do swojego konta w aplikacji")]
    public async Task ThenPowinienOtrzymacDostepDoSwojegoKontaWAplikacji()
    {
        await john.AttemptsToAsync(GetUserInfo.OfLoggedUser());

        var result = john.AskingFor(LastResponse.Result());
        result.IsSuccess.Should().BeTrue();
        result.As<UserInfo>().UserName.Should().Be(Recall<UserCredentials>.Fact("credentials").RequestAs(john).UserName);
       /* result.IsSuccessful.Should().BeTrue();
        result.Content.As<UserInfo>().UserName.Should().Be(new UserCredentials().UserName); */
    }

    [Then(@"Widzi komunikat błędu")]
    public void ThenWidziKomunikatBledu()
    {
      
    }

  }
}
