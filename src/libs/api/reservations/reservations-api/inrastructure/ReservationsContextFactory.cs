using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Zapisywarka.Api.Reservations.Reservations.Features;

namespace Zapisywarka.Api.Reservations.ReservationsApi
{
  class ReservationsContextFactory : IDesignTimeDbContextFactory<ReservationsContext>
  { 
    ReservationsContext IDesignTimeDbContextFactory<ReservationsContext>.CreateDbContext(string[] args)
    {
      var optionsBuilder = new DbContextOptionsBuilder<ReservationsContext>();
      optionsBuilder.UseNpgsql("Host=localhost;Database=zapisywarka;Username=postgres;Password=Password_01",
          o => o.UseNodaTime());

        return new ReservationsContext(optionsBuilder.Options);
    }
  }
}
