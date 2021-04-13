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
    public static class AddDatabaseFactory
    {
        public static void AddDatabase<TDbContext>(this IServiceCollection services) where TDbContext: DbContext
        {
            services.AddDbContext<TDbContext>(options =>
            {
                var configuration = services.BuildServiceProvider().GetRequiredService<IConfiguration>();

                options.UseNpgsql(configuration.GetConnectionString("Postgresql"), o => o.UseNodaTime());
                options.EnableSensitiveDataLogging();

            });

            var context = services.BuildServiceProvider().CreateScope().ServiceProvider.GetRequiredService<TDbContext>();
            context.Database.Migrate();
        }
    }
}
