using Microsoft.EntityFrameworkCore;

namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public class ReservationsContext : DbContext
  {
    public ReservationsContext(DbContextOptions<ReservationsContext> options) : base(options)
    {
    }

    public DbSet<Offer> Offers { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
      builder.HasDefaultSchema("reservations");

      builder.Entity<Offer>()
        .ToTable("offers")
        .OwnsMany(o => o.Items, i =>
        {
          i.ToTable("offer_items");
          i.Property<Guid>("offer_id");
          i.Property<string>("Name").HasColumnName("name");
          i.Property<int>("Position").HasColumnName("position");          
          i.WithOwner().HasForeignKey("offer_id");
          i.HasKey("Position", "offer_id");
        });
    }
  }
}