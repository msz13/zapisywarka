using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OffersBD.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OffersBD.Persistance.Configuration
{
    class OfferItemConfiguration : IEntityTypeConfiguration<OfferItem>
    {
        public void Configure(EntityTypeBuilder<OfferItem> builder)
        {
            builder.Property(i => i.Id).UseHiLo();

            builder.HasKey(i => new { i.Id });

            builder.HasOne<CatalogItem>()
                .WithMany()
                .HasForeignKey(i => new { i.CatalogItemId, i.TenantId })
                .HasPrincipalKey(i => new { i.Id, i.TenantId});
        }
    }
}
