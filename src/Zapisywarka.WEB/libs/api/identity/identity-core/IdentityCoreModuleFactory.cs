using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Zapisywarka.API.Common.Infrastructure.Persistance;
using Zapisywarka.API.Modules.Identity.Core.Infrastructure;
using Microsoft.AspNetCore.Identity;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Zapisywarka.API.Modules.Identity.Core
{
    public static class IdentityCoreModuleFactory
    {
        public static void AddIdentityCoreModule(this IServiceCollection services)
        {
            services.AddMediatR(typeof(IdentityCoreModuleFactory));
            services.AddDatabase<ZapisywarkaIdentityDbContext>();

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddUserValidator<AppUserValidator>()
                .AddEntityFrameworkStores<ZapisywarkaIdentityDbContext>();

            services.ConfigureApplicationCookie(options => {
              options.Cookie.Name = "Auth";
              options.Cookie.Domain = "zapisywarka.local";
              options.Cookie.SameSite = SameSiteMode.Strict;
              options.Cookie.HttpOnly = true;
              
            
             }); 

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;                
            });

           services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly(), includeInternalTypes: true);
        }


        public static void UseIdenityModule(this IApplicationBuilder app)
        {
           
        }
    }
}