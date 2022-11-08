using System.Threading.Tasks;
using TechTalk.SpecFlow;
using FluentAssertions;
using Boa.Constrictor.Screenplay;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using Boa.Constrictor.RestSharp;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class AuthenticationStepDefinitons 
  {
    IActor john;
    IActor anonymous;
    Cast _cast;

    UserCredentials _userCredentials;
   
    public AuthenticationStepDefinitons(Cast cast) 
    {
      _cast = cast;
      john = _cast.actorNamed("John");
    }
   

    [Given(@"Organizator zapisów zarejestrował konto jako użytkownik ""(.*)"" z hasłem ""(.*)""")]
    public async Task GivenOrganizatorZapisowZarejestrowalKontoJakoUzytkownikZHaslem(string userName, string pasword)
    {

      _userCredentials = new UserCredentials { UserName = userName, Password = pasword };
      await john.AttemptsToAsync(CreateUserAccount.With(_userCredentials));
      john.AttemptsTo(EnsureLastResponse.Succes());
      
    }

    
    [When(@"Próbuje się zalogować podając poprawne dane")]
    public async Task WhenProbujeSieZalogowac()
    {
      await john.AttemptsToAsync(Login.WithCredentials(_userCredentials));
      john.AttemptsTo(EnsureLastResponse.Succes());
    }

    [When(@"Niezalogowany użytkownik chce otrzymać dostęp do swojego konta")]
    public async Task WhenNiezalogowanyUzytkownikChceOtrzymacDostepDoSwojegoKonta()
    {
      anonymous = _cast.actorNamed("anonymoous"); 
      await anonymous.AttemptsToAsync(Login.WithCredentials(new UserCredentials()));
      anonymous.AttemptsTo(EnsureLastResponse.Failure());
    
    }

    [Then(@"Powinien otrzymać dostęp do swojego konta w aplikacji")]
    public async Task ThenPowinienOtrzymacDostepDoSwojegoKontaWAplikacji()
    {
        await john.AttemptsToAsync(GetUserInfo.OfLoggedUser());

        var result = john.AskingFor(LastResponse<UserInfo>.Result());
        result.IsSuccess.Should().BeTrue();       
        result.Value.UserName.Should().Be(_userCredentials.UserName);
 
    }

    [Then(@"Widzi komunikat błędu")]
    public async Task WidziKomunikatBledu()
    {
        await anonymous.AttemptsToAsync(GetUserInfo.OfLoggedUser());
        var result = anonymous.AskingFor(LastResponse<string>.Result()); 
        result.IsFailure.Should().BeTrue();
    }

  }
}
