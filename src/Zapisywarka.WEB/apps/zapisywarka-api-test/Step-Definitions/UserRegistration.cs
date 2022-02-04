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

namespace MyNamespace
{
    [Binding]
    public class StepDefinitions
    {
        
        private readonly ScenarioContext _scenarioContext;

        private Actor actor;

       
        private Dictionary<string, dynamic> memory = new Dictionary<string, dynamic>(); 

        public StepDefinitions(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;         

        }

        [BeforeScenario]
        public void SetUpTest() 
        {
            actor = new Actor(name: "Jan", logger: new ConsoleLogger());
            actor.Can(new MemoryAbility());
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
            var client = new RestClient("http://zapisywarka.local");
            var name = actor.Using<MemoryAbility>().Recall("UserName") as string;
            var password = actor.Using<MemoryAbility>().Recall("Password") as string;
            var request = new RestRequest("users").AddJsonBody(new {UserName = name, Password = password });
            var result = await client.PostAsync(request);
             result.ErrorMessage.Should().BeNullOrEmpty();
             result.IsSuccessful.Should().BeTrue();
             
        }
        
        [Then(@"Baza użytkowników zawiera organizatora zapisów o imieniu ""(.*)""")]
        public void ThenBazaUzytkownikowZawieraOrganizatoraZapisowOImieniu(string userName)
        {
            var name = actor.Using<MemoryAbility>().Recall("UserName") as string;
            name.Should().Be(userName);
        }
        
        
      
    }
}