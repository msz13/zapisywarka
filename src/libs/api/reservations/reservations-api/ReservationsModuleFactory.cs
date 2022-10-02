
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Zapisywarka.Api.Reservations.Reservations.Features;
using Zapisywarka.API.Common.Infrastructure.Persistance;

namespace Zapisywarka.Api.Reservations.Reservations
{
    
    public static class ReservationsModuleFactory
    {
      public static void AddReservationsModule(this IServiceCollection services)
    {
      services.AddDatabase<ReservationsContext>();
      services.AddTransient<IOffersRepository, OffersRepository>();
      services.AddTransient<ReserveItems.Handler>();
      services.AddTransient<CreateOffer.CreateOfferHandler>();
    }

    }


}


