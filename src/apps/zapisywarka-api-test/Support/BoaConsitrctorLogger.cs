using Boa.Constrictor.Logging;
using TechTalk.SpecFlow.Infrastructure;
using HttpTracer.Logger;

namespace Zapisywarka.Api.AcceptanceTests.Helpers
{
  public class BoaConstrictorFlowLogger : AbstractLogger, HttpTracer.Logger.ILogger
  {
    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

    public BoaConstrictorFlowLogger(ISpecFlowOutputHelper specFlowOutputHelper)
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
