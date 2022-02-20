using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Zapisywarka.API.Common.Infrastructure.Persistance
{
    public static class ConnectionStringFactory 
    {
        public static string GetPostgresConnectionString(this IConfiguration configuration)
        {
            var postgresConfig = configuration.GetSection("Postgresql");
                                                             
            return $"HOST={postgresConfig["HOST"]};DATABASE={postgresConfig["Db"]};USERNAME={postgresConfig["User"]};PASSWORD={postgresConfig["Password"]};";
        }
    }
    public static class AddDatabaseFactory
    {
        public static void AddDatabase<TDbContext>(this IServiceCollection services) where TDbContext: DbContext
        {
            services.AddDbContext<TDbContext>(options =>
            {
                var configuration = services.BuildServiceProvider().GetRequiredService<IConfiguration>();
                var postgresConfig = configuration.GetSection("Postgresql");
                
                                                
                //var connectionString = $"HOST={postgresConfig["HOST"]};DATABASE={postgresConfig["Db"]};USERNAME={postgresConfig["User"]};PASSWORD={postgresConfig["Password"]};SSLMode=Require;Trust Server Certificate=true";
                var connectionString = $"HOST={postgresConfig["HOST"]};DATABASE={postgresConfig["Db"]};USERNAME={postgresConfig["User"]};PASSWORD={postgresConfig["Password"]};";
                //TODO dodac osobna konfigurację na produkcji i w testach ssl connection           
                options.UseNpgsql(connectionString/* , o => o.UseNodaTime() */);
                options.EnableSensitiveDataLogging();

            });

            //var context = services.BuildServiceProvider().CreateScope().ServiceProvider.GetRequiredService<TDbContext>();
            //context.Database.Migrate();
        }
    }
}
