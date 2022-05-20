
using Boa.Constrictor.Logging;
using TechTalk.SpecFlow.Infrastructure;

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
  public class BoaSpecFlowLogger : AbstractLogger
  {
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

    public BoaSpecFlowLogger(ISpecFlowOutputHelper specFlowOutputHelper)
    {
      _specFlowOutputHelper = specFlowOutputHelper;
    }

    public override void Close()
    {

    }

    protected override void LogRaw(string message, LogSeverity severity = LogSeverity.Info)
    {
      _specFlowOutputHelper.WriteLine($"[{severity.ToString()}] {message}");
    }
  }
}
