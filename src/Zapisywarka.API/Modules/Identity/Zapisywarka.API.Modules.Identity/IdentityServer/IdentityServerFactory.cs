using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zapisywarka.API.Modules.Identity.IdentityServer
{
    public static class IdentityServerFactory
    {
        public static void AddIdentityServerConfiguration(this IServiceCollection services)
        {

            var builder = services.AddIdentityServer(options =>
            {
                // see https://identityserver4.readthedocs.io/en/latest/topics/resources.html
                options.EmitStaticAudienceClaim = true;
                options.UserInteraction.LoginUrl = "/login";              
            });
               

            // in-memory, code config
            builder.AddInMemoryIdentityResources(Config.IdentityResources);
            builder.AddInMemoryApiScopes(Config.ApiScopes);
            builder.AddInMemoryClients(Config.Clients);
            builder.AddTestUsers(TestUsers.Users);
            
            

            // not recommended for production - you need to store your key material somewhere secure
            builder.AddDeveloperSigningCredential();

           services.Configure<CookiePolicyOptions>(options => {
                options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
                options.OnAppendCookie = context => context.CookieOptions.SameSite = SameSiteMode.Unspecified;
                options.OnDeleteCookie = context => context.CookieOptions.SameSite = SameSiteMode.Unspecified;
            }); 

        }
    }
}
