using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using Boa.Constrictor.Screenplay;
using ZapisywarkaApi.AcceptanceTests.Helpers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using static Zapisywarka.API.AcceptanceTests.Interactions.Identity.GetUserAccount;
using Zapisywarka.API.AcceptanceTests.Helpers;
using TechTalk.SpecFlow.Infrastructure;
using NodaTime;
using FluentAssertions;
using System;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
    public class UserRegistrationSteps : StepsBaseClass
    {
       

        private Actor actor;             
              

    public UserRegistrationSteps(ScenarioContext scenarioContext, ISpecFlowOutputHelper specFlowOutputHelper) 
    : base(scenarioContext, specFlowOutputHelper) { }

        [BeforeScenario]
        public void SetUpTest() 
        {
            actor = new Actor(name: "Jan", logger: new BoaSpecFlowLogger(_specFlowOutputHelper));
            actor.Can(new MemoryAbility());
            actor.Can(new ItentityTestServerAbility(_scenarioContext.ScenarioContainer.Resolve<HttpClient>()));
            actor.Can(CallApi.WithClient(_scenarioContext.ScenarioContainer.Resolve<HttpClient>()));
        }

        [Given(@"Organizator zapisów wypełnił dane rejestracji konta")]
        public void GivenOrganizatorZapisowWypelnilDaneRejestracjiKonta(Table table)
        {               
           
           var registrationData = table.CreateInstance<UserCredentials>();           

             actor.AttemptsTo(
              Remember.Fact("credentials", registrationData)
              );

        }
        
        [When(@"Próbuję się zarejestrować")]
        public async Task WhenProbujeSieZarejestrowac()
        {
            var credentials = actor.AsksFor<object>(Recall.Fact("credentials")) as UserCredentials;
            
            await actor.AttemptsToAsync(CreateUserAccount.WithName(credentials.UserName)
                .WithPassword(credentials.Password).WithPasswordConfirmation(credentials.PasswordConfirmation));
        }
        
        [Then(@"Baza użytkowników zawiera organizatora zapisów o imieniu ""(.*)""")]
        public async Task ThenBazaUzytkownikowZawieraOrganizatoraZapisowOImieniu(string userName)
        {
           var credentials = actor.AskingFor<dynamic>(Recall.Fact("credentials")) as UserCredentials;
          
           var accaunt = await actor.AskingForAsync<UserInfo>(GetUserAccount.For(credentials.UserName));
           
           accaunt.UserName.Should().Be(credentials.UserName);

        }
        
      
      
    }
}