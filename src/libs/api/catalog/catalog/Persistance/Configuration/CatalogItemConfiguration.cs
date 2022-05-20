using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using OffersBD.Models;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace OffersBD.Persistance
{
    class TenantValueGenerator : ValueGenerator
    {
        public override bool GeneratesTemporaryValues => true;

        protected override object NextValue([NotNull] EntityEntry entry)
        {
            var context = entry.Context as OffersDbContext;
            return context.GetUserService().GetTenantId();
        }
    }

    class CatalogItemConfiguration : IEntityTypeConfiguration<CatalogItem>
    {
        public void Configure(EntityTypeBuilder<CatalogItem> builder)
        {
            builder.HasKey(i => new { i.Id, i.TenantId });
            builder.HasOne<CatalogCategory>()
                .WithMany()
                .HasForeignKey(i => new { i.CategoryId, i.TenantId})
                .HasPrincipalKey(c => new { c.Id, c.TenantId})
                .IsRequired(false);
        }
    }
}
