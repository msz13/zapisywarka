using Boa.Constrictor.Logging;
using TechTalk.SpecFlow.Infrastructure;

namespace ZapisywarkaApi.AcceptanceTests.Helpers
{
    public class BoaConstrictorFlowLogger : AbstractLogger
    {
        private readonly ISpecFlowOutputHelper _specFlowOutputHelper;

        public BoaConstrictorFlowLogger(ISpecFlowOutputHelper specFlowOutputHelper)
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