using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Zapisywarka.API.Common.Infrastructure.Persistance;
using Zapisywarka.API.Modules.Identity.Core.Infrastructure;
using Microsoft.AspNetCore.Identity;
using FluentValidation;

namespace Zapisywarka.API.Modules.Identity.Core
{
    public static class IdentityCoreModuleFactory
    {
        public static void AddIdentityCoreModule(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddDatabase<ZapisywarkaIdentityDbContext>();

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddUserValidator<AppUserValidator>()
                .AddEntityFrameworkStores<ZapisywarkaIdentityDbContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                
            });

           services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        }


        public static void UseIdenityModule(this IApplicationBuilder app)
        {
           
        }
    }
}