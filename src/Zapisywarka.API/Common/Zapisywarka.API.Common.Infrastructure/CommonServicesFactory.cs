using Zapisywarka.API.Common.Application;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;
using Zapisywarka.API.Common.Infrastructure.Infrastructure;

namespace Zapisywarka.API.Common.Infrastructure
{
    public static class CommonServicesFactory
    {
        public static void AddCommonServices(this IServiceCollection services)
        {
            services.AddScoped<UserContextService>();
            services.AddSingleton<IClock>(sp => SystemClock.Instance);
            services.AddScoped(
                typeof(IPipelineBehavior<,>),
                typeof(LoggingBehaviour<,>));
        }
    }
}
