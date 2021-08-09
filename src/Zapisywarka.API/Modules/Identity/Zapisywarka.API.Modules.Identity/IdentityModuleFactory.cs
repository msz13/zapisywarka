using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;
using Zapisywarka.API.Modules.Identity.IdentityServer;
using Zapisywarka.API.Modules.Identity.Core;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Zapisywarka.API.Modules.Identity
{
    public static class IdentityModuleFactory
    {
        public static void AddIdentityModule(this IServiceCollection services)
        {
            
            services.AddControllers().AddApplicationPart(Assembly.GetExecutingAssembly()).AddJsonOptions(options =>{
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
              
            });
            services.AddIdentityServerConfiguration();
            services.AddIdentityCoreModule();
                      

        }


        public static void UseIdenityModule(this IApplicationBuilder app)
        {
            app.UseIdentityServer();
            app.UseCookiePolicy();

            app.UseAuthentication();
        }
    }
}
