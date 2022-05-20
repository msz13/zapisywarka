using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OffersBD.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OffersBD.Persistance
{
    class CategoryConfiguration : IEntityTypeConfiguration<CatalogCategory>
    {
        public void Configure(EntityTypeBuilder<CatalogCategory> builder)
        {
            builder.HasKey(c => new { c.Id, c.TenantId });
        }
    }
}
