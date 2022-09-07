
using Boa.Constrictor.Logging;
using TechTalk.SpecFlow.Infrastructure;

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
  public class BoaSpecFlowLogger : AbstractLogger, HttpTracer.Logger.ILogger
  {
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

    public BoaSpecFlowLogger(ISpecFlowOutputHelper specFlowOutputHelper)
    {
      _specFlowOutputHelper = specFlowOutputHelper;
    }

    public override void Close()
    {

    }

    public void Log(string message)
    {
      base.Log(message);
    }

    protected override void LogRaw(string message, LogSeverity severity = LogSeverity.Info)
    {
      _specFlowOutputHelper.WriteLine($"[{severity.ToString()}] {message}");
    }
  }
}
