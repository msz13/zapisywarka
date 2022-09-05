
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.UnitTestProvider;
using TechTalk.SpecFlow.Infrastructure;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  public abstract class StepsBaseClass
  {

    protected ISpecFlowOutputHelper _specFlowOutputHelper;

    protected ScenarioContext _scenarioContext;

    protected readonly IUnitTestRuntimeProvider _unitTestRuntimeProvider;



    public StepsBaseClass(ScenarioContext scenarioContext, ISpecFlowOutputHelper specFlowOutputHelper, IUnitTestRuntimeProvider unitTestRuntimeProvider = null)
    {
      _specFlowOutputHelper = specFlowOutputHelper;
      _scenarioContext = scenarioContext;
      _unitTestRuntimeProvider = unitTestRuntimeProvider;
    }

  }
}
