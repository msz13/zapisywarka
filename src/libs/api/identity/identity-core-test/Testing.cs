using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using NUnit.Framework;
using Respawn;
using System.IO;
using System.Threading.Tasks;
using Zapisywarka.API.Common.Application;
using Zapisywarka.API.Modules.Identity.Core;
using Zapisywarka.API.Modules.Identity.Core.Infrastructure;
using Zapisywarka.API.Common.Infrastructure.Persistance;
using Microsoft.AspNetCore.Http;
using Moq;
using Ductus.FluentDocker.Builders;
using Ductus.FluentDocker.Services;

namespace Zapisywarka.Api.Modules.Identity.IntegrationTests
{
  [SetUpFixture]
  public class Testing
  {
    private static IConfigurationRoot _configuration;
    private static IServiceScopeFactory _scopeFactory;
    private static Checkpoint _checkpoint;

    private static ICompositeService _dbContainer;


    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
      BuildConfiguration();

      var services = new ServiceCollection();

      ConfigureCommonServices(services);

      services.AddIdentityCoreModule();


      _scopeFactory = services.BuildServiceProvider().GetService<IServiceScopeFactory>();

      ConfigureRespawn();

      EnsureDatabase();


    }

    private static void ConfigureRespawn()
    {
      _checkpoint = new Checkpoint
      {
        TablesToIgnore = new[] { "__EFMigrationsHistory" },
        SchemasToInclude = new[]
              {
                        "identity"
                    },
        DbAdapter = DbAdapter.Postgres
      };
    }
   
    private void ConfigureCommonServices(IServiceCollection services)
    {
      services.AddScoped(
           typeof(IPipelineBehavior<,>),
           typeof(LoggingBehaviour<,>));

      services.AddScoped(
        typeof(IPipelineBehavior<,>),
        typeof(ValidationBehaviour<,>));
      services.AddSingleton<IConfiguration>(_configuration);
      services.AddLogging();

      var httpContext = new Mock<HttpContext>();

    }

    private void StartDatabase() 
    {
      var path = Path.Combine(Directory.GetCurrentDirectory(), "docker-compose-postgresql.yml");

      _dbContainer = new Builder().UseContainer()
        .UseCompose()
        .FromFile(path)
        .Build()
        .Start();

    }

    private void EnsureDatabase()
    {
      using var scope = _scopeFactory.CreateScope();

      // var context = scope.ServiceProvider.GetService<OffersDbContext>();

      // context.Database.Migrate();

    }

    public static async Task ResetState()
    {

      using (var conn = new NpgsqlConnection(_configuration.GetPostgresConnectionString()))
      {
        await conn.OpenAsync();

        await _checkpoint.Reset(conn);
      }
    }

    /*  public static async Task<TEntity> FindAsync<TEntity>(int id)
          where TEntity : class
      {
          using var scope = _scopeFactory.CreateScope();

       //   var context = scope.ServiceProvider.GetService<OffersDbContext>();

        //  return await context.FindAsync<TEntity>(id);
      }
    */
    public static async Task<IdentityUser> FindUser(string userName)
    {
      using var scope = _scopeFactory.CreateScope();

      var context = scope.ServiceProvider.GetService<ZapisywarkaIdentityDbContext>();

      return await context.Users.FirstOrDefaultAsync(user => user.UserName == userName);
    }

    /*
     public static async Task AddAsync<TEntity>(TEntity entity)
         where TEntity : class
     {
         using var scope = _scopeFactory.CreateScope();

        // var context = scope.ServiceProvider.GetService<OffersDbContext>();

        // context.Add(entity);

       //  await context.SaveChangesAsync();
     }

     public static async Task AddRangeAsync<TEntity>(IEnumerable<TEntity> entities)
         where TEntity : class
     {
         using var scope = _scopeFactory.CreateScope();

       //  var context = scope.ServiceProvider.GetService<OffersDbContext>();

       //  context.AddRange(entities);

       //  await context.SaveChangesAsync();
     }
   */
    public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
    {
      using var scope = _scopeFactory.CreateScope();

      var mediator = scope.ServiceProvider.GetService<IMediator>();

      return await mediator.Send(request);
    }

    public static HttpContext GetHttpContext()
    {
      var scope = _scopeFactory.CreateScope();
      var context = scope.ServiceProvider.GetService<HttpContext>();
      return context as HttpContext;
    }



  }
}
