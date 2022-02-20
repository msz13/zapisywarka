
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TechTalk.SpecFlow;
using Zapisywarka.API.Modules.Identity.Core.Infrastructure;

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
    [Binding]
    public class Hooks 
    {

        static WebApplicationFactory<Program> _factory;

        private ScenarioContext _scenarioContext;

    public Hooks(ScenarioContext scenarioContext)
    {
      _scenarioContext = scenarioContext;
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

        [BeforeScenario]
        public static void SetUpTestServer()
        {
          _factory = new WebApplicationFactory<Program>().WithWebHostBuilder((host) =>
          {
            host.UseEnvironment(Microsoft.Extensions.Hosting.Environments.Development); 
            /* host.ConfigureServices(services => {
              var sp = services.BuildServiceProvider();
              var context = sp.GetRequiredService<ZapisywarkaIdentityDbContext>();
              context.Database.Migrate();
             
            }); */ 
          });       

        }

        [BeforeScenario]
        public void SetUpHttpclient()
        {
          _scenarioContext.ScenarioContainer.RegisterInstanceAs<HttpClient>(_factory.CreateClient());
        }
 
    }
}