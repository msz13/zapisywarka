using System;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using FluentAssertions;
using System.Collections.Generic;
using Boa.Constrictor.Screenplay;
using ZapisywarkaApi.AcceptanceTests.Helpers;
using Boa.Constrictor.Logging;
using RestSharp;
using RestSharp.Extensions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Json;
using Zapisywarka.API.AcceptanceTests.Interactions;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;

namespace MyNamespace
{
    [Binding]
    public class StepDefinitions
    {
        private readonly ScenarioContext _scenarioContext;

        private Actor actor;

        private WebApplicationFactory<Program> _factory;
        private HttpClient _client;

       
        private Dictionary<string, dynamic> memory = new Dictionary<string, dynamic>(); 

        public StepDefinitions(ScenarioContext scenarioContext, WebApplicationFactory<Program> factory)
        {
            _scenarioContext = scenarioContext;
            _factory = factory;
            _client = _factory.WithWebHostBuilder((host)=> {
                host.UseEnvironment(Microsoft.Extensions.Hosting.Environments.Development);
            }).CreateClient();


        }

        [BeforeScenario]
        public void SetUpTest() 
        {
            actor = new Actor(name: "Jan", logger: new ConsoleLogger());
            actor.Can(new MemoryAbility());
            actor.Can(new ItentityTestServerAbility(_client));
        }

        [Given(@"Organizator zapisów wypełnił dane rejestracji konta")]
        public void GivenOrganizatorZapisowWypelnilDaneRejestracjiKonta(Table table)
        {
         
          dynamic registrationData = table.CreateDynamicInstance();
          
          actor.Using<MemoryAbility>().Remember("UserName", (string)registrationData.Nazwa);
          actor.Using<MemoryAbility>().Remember("Password", (string)registrationData.Haslo);
          actor.Using<MemoryAbility>().Remember("PasswordConfirmation", (string)registrationData.PotwierdzenieHasla);
        }
        
        [When(@"Próbuję się zarejestrować")]
        public async Task WhenProbujeSieZarejestrowac()
        {
            await actor.AttemptsToAsync(CreateUserAccount.ForThemselves());
        }
        
        [Then(@"Baza użytkowników zawiera organizatora zapisów o imieniu ""(.*)""")]
        public async Task ThenBazaUzytkownikowZawieraOrganizatoraZapisowOImieniu(string userName)
        {
           var acauntName = actor.AskingFor<object>(Recall.Fact("UserName")) as string;
           var accaunt = await actor.AskingForAsync<string>(GetUserAccount.For(acauntName));
           accaunt.Should().Be(acauntName);

        }
        
       /*  public async Task ThenBazaUzytkownikowZawieraOrganizatoraZapisowOImieniu(string userName)
        {
           identityDriver.CreateAndLogUser();
           offersdriver.CreateOfferBy(organiser: user, name: "test", startDate: startDate);
           registrationDriver.Register(offer, positions, receivecode);
           registrationDriver.GetRegistration(receivecode, user);
        }
         */
      
    }
}