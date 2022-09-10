using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using TechTalk.SpecFlow.UnitTestProvider;
using Boa.Constrictor.Screenplay;
using System.Threading.Tasks;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using FluentAssertions;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class UserRegistrationSteps 
  {
    private IActor _actor;    


    public UserRegistrationSteps(IUnitTestRuntimeProvider _unitTestRuntimeProvider, Cast cast)    
    {
      _actor = cast.actorNamed("John");
    }

   
    
    [When(@"Koordynator zapisów próbuje się zarejestrować z poprawnymi danymi:")]
    public async Task WhenProbujeSieZarejestrowac(Table data)
    {
      await _actor.AttemptsToAsync(
        CreateUserAccount.With(data.CreateInstance<UserCredentials>())
      );
     
      
    }

    [Then(@"Rejestracja kończy się sukcesem")]
    public async Task ThenRejestracjaKonczySieSukcesem()
    {      
       _actor.AskingFor(
        UserRegistrationVeryfication.Result()
      ).IsSuccess.Should().BeTrue();

    }

  }
}
