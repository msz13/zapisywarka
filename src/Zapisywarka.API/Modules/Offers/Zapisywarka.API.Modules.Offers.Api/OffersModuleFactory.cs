using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Zapisywarka.API.Modules.Offers.Core;

namespace Zapisywarka.API.Modules.Offers.Api
{
    public static class OffersModuleFactory
    {
        public static void AddOffersModule(this IServiceCollection services)
        {
            services.AddOffersCoreModule();
            services.AddControllers().AddApplicationPart(Assembly.GetExecutingAssembly());
        }
    }
}
