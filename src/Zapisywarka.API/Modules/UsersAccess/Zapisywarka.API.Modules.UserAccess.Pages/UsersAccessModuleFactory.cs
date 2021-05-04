using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Zapisywarka.API.UsersAccess.Pages
{
    public static class UsersAccessModuleFactory
    {
        public static void AddUserAccessModule(this IServiceCollection services)
        {
            services.AddControllersWithViews().AddApplicationPart(Assembly.GetExecutingAssembly());

            var builder = services.AddIdentityServer(options =>
            {
                // see https://identityserver4.readthedocs.io/en/latest/topics/resources.html
                options.EmitStaticAudienceClaim = true;

            });
               

            // in-memory, code config
            builder.AddInMemoryIdentityResources(Config.IdentityResources);
            builder.AddInMemoryApiScopes(Config.ApiScopes);
            builder.AddInMemoryClients(Config.Clients);

            // not recommended for production - you need to store your key material somewhere secure
            builder.AddDeveloperSigningCredential();

        }

        public static void UseUserAccessModule(this IApplicationBuilder app)
        {
            app.UseIdentityServer();
        }
    }
}
