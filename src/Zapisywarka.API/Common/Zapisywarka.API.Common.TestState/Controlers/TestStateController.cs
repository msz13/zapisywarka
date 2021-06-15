using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Npgsql;
using Respawn;
using System.Threading.Tasks;

namespace Zapisywarka.API.Common.TestState.Controlers
{
    [Route("/test-state")]
    [ApiController]
    public class TestStateController: ControllerBase
    {
        ILogger _logger;

        public TestStateController(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger("Test State");
        }

        [HttpPost]
        public async Task<IActionResult> ResetDatabase()
        {
            var checkpoint = new Checkpoint
            {
                TablesToIgnore = new[] { "__EFMigrationsHistory" },
                SchemasToInclude = new[]
                    {
                        "offers",
                        "identity"
                    },
                DbAdapter = DbAdapter.Postgres
            };

            using (var conn = new NpgsqlConnection("Host=localhost,1433;Database=Zapisywarka;User=postgres;Password=Password_01"))
            {
                await conn.OpenAsync();

                await checkpoint.Reset(conn);
            }

            _logger.LogInformation("Database reseted");

            return Ok();
        }

        [HttpGet]
        public IActionResult Check()
        {
            return Ok("test state ok");
        }
    }
}
