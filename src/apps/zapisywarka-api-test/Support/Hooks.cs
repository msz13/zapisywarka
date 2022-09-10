using Microsoft.AspNetCore.Mvc.Testing;
using TechTalk.SpecFlow;
using Boa.Constrictor.Screenplay;
using TechTalk.SpecFlow.Infrastructure;
using Boa.Constrictor.RestSharp;
using Boa.Constrictor.Memory;

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
  [Binding]
  public class Hooks
  {

    static WebApplicationFactory<Program> _factory;

    private ScenarioContext _scenarioContext;
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

    public Hooks(ScenarioContext scenarioContext, ISpecFlowOutputHelper specFlowOutputHelper)
    {
      _scenarioContext = scenarioContext;
      _specFlowOutputHelper = specFlowOutputHelper;
    }


    [BeforeTestRun]
    public static void DbUp()
    {
      // TestDatabase.Start();
    }

    [AfterTestRun]
    public static void DbDown()
    {
      //  TestDatabase.StopDb();
    }

    [BeforeScenario(Order = 0)]
    void SetUpActor() 
    {
      var logger = new BoaSpecFlowLogger(_specFlowOutputHelper);
      var client = RestSharpClientFactory.WithCookieAuthentication("http://localhost:5000", logger);
       var cast = new Cast(logger, new IAbility[] {CanCallRestApi.Using(client), new MemoryAbility()});
      _scenarioContext.ScenarioContainer.RegisterInstanceAs(cast);
    }

  }
}
