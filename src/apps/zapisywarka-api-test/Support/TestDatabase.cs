using System;
using System.IO;
using System.Threading;
using Ductus.FluentDocker.Builders;
using Ductus.FluentDocker.Services;
using Microsoft.EntityFrameworkCore;

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
  public class TestDatabase
  {

    private static ICompositeService _dbContainer;
    /* public static void Start()
    {
     _dbContainer = new Builder().UseContainer()
    .UseImage("postgres:alpine")
    .WithEnvironment(
      "POSTGRES_USER=postgres",
      "POSTGRES_PASSWORD=Password_01",
      "POSTGRES_DB=zapisywarka"
      )
    .ExposePort(5432, 5432)        
    .WithName("postgres-ductus")
    .DeleteIfExists()
    .WaitForProcess("postgres", 3000)
    .Build()
    .Start();

    _dbContainer.RemoveOnDispose = false; 

    } */

    public static void Start()
    {
      //var path = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "..", "..", "/apps/zapisywarka-api-test/docker-compose-postgresql.yml");
      var path = Path.Combine(Directory.GetCurrentDirectory(), "docker-compose-postgresql.yml");

      _dbContainer = new Builder().UseContainer()
        .UseCompose()
        .FromFile(path)
        .Build()
        .Start();


    }

    public static void StopDb()
    {
      //  _dbContainer.Stop();
      _dbContainer.Dispose();

    }

  }

}
