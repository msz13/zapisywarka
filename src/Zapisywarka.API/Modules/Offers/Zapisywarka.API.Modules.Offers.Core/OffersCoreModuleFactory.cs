using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OffersInfrastructure.Persistance;
using System.Reflection;
using OffersBD.Common;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Zapisywarka.API.Common.Infrastructure.IntegrationEvents;
using Zapisywarka.API.Common.Infrastructure.Persistance;

namespace Zapisywarka.API.Modules.Offers.Core
{
    public static class OffersCoreModuleFactory
    {
        public static void AddOffersCoreModule(this IServiceCollection services)
        {
            services.AddDatabase<OffersDbContext>();
            services.AddMediatR(typeof(OffersCoreModuleFactory));
            services.AddAutoMapper(typeof(OffersCoreModuleFactory));
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddScoped<OfferUniqueNameValidator>();
            services.AddScoped<EventBus>();



        }
    }
}
