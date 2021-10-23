using Zapisywarka.API.Common.Application;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using NodaTime;
using Zapisywarka.API.Common.Infrastructure.Infrastructure;

namespace Zapisywarka.API.Common.Infrastructure
{
    public static class InfrastructureModule
    {
        public static void AddCommonInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IUsercontextService, UserContextService>();
            services.AddSingleton<IClock>(sp => SystemClock.Instance);

            services.AddScoped(
                typeof(IPipelineBehavior<,>),
                typeof(LoggingBehaviour<,>));
            services.AddScoped(
                typeof(IPipelineBehavior<,>),
                typeof(ValidationBehaviour<,>));

        }
    }
}
