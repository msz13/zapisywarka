
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
    public abstract class StepsBaseClass
    {
        
        protected ISpecFlowOutputHelper _specFlowOutputHelper;

        protected ScenarioContext _scenarioContext;                
            
            

    public StepsBaseClass(ScenarioContext scenarioContext, ISpecFlowOutputHelper specFlowOutputHelper)
    {         
      _specFlowOutputHelper = specFlowOutputHelper;
      _scenarioContext = scenarioContext;
    }

    }
}