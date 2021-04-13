using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OffersBD.Models;

namespace OffersBD.Persistance
{
    class OffersConfiguration : IEntityTypeConfiguration<Offer>
    {
        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder.HasKey(o => new { o.Id, o.TenantId });                     
           

        }
    }
}
