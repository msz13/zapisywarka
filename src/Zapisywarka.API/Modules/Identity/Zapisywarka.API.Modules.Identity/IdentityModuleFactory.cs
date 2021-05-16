using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;
using Zapisywarka.API.Modules.Identity.IdentityServer;

namespace Zapisywarka.API.Modules.Identity
{
    public static class IdentityModuleFactory
    {
        public static void AddIdentityModule(this IServiceCollection services)
        {
            
            services.AddControllers().AddApplicationPart(Assembly.GetExecutingAssembly());
            services.AddIdentityServerConfiguration();
            

        }

        public static void UseIdenityModule(this IApplicationBuilder app)
        {
            app.UseIdentityServer();
            app.UseCookiePolicy();

            app.UseAuthentication();
        }
    }
}
