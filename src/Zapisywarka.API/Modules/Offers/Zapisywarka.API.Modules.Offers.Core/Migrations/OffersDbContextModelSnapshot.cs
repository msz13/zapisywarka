﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NodaTime;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using OffersInfrastructure.Persistance;

namespace OffersBD.Migrations
{
    [DbContext(typeof(OffersDbContext))]
    partial class OffersDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("offers")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("OffersBD.Models.CatalogCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("TenantId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("CatalogCategories");
                });

            modelBuilder.Entity("OffersBD.Models.CatalogItem", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<string>("TenantId")
                        .HasColumnType("text");

                    b.Property<int?>("AvaibleQuantity")
                        .HasColumnType("integer");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal?>("Price")
                        .HasColumnType("numeric");

                    b.HasKey("Id", "TenantId");

                    b.HasIndex("CategoryId", "TenantId");

                    b.ToTable("CatalogItems");
                });

            modelBuilder.Entity("OffersBD.Models.Offer", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("TenantId")
                        .HasColumnType("text");

                    b.Property<LocalDateTime>("EndCollectionDate")
                        .HasColumnType("timestamp");

                    b.Property<LocalDateTime>("EndRegistrationDate")
                        .HasColumnType("timestamp");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<LocalDateTime>("StartCollectionDate")
                        .HasColumnType("timestamp");

                    b.HasKey("Id", "TenantId");

                    b.ToTable("Offers");
                });

            modelBuilder.Entity("OffersBD.Models.OfferItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CatalogItemId")
                        .HasColumnType("integer");

                    b.Property<string>("OfferId")
                        .HasColumnType("text");

                    b.Property<string>("OfferTenantId")
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<string>("TenantId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("OfferId", "OfferTenantId");

                    b.ToTable("OfferItems");
                });

            modelBuilder.Entity("OffersBD.Models.CatalogItem", b =>
                {
                    b.HasOne("OffersBD.Models.CatalogCategory", null)
                        .WithMany()
                        .HasForeignKey("CategoryId", "TenantId")
                        .HasPrincipalKey("Id", "TenantId");
                });

            modelBuilder.Entity("OffersBD.Models.OfferItem", b =>
                {
                    b.HasOne("OffersBD.Models.Offer", null)
                        .WithMany("OfferItems")
                        .HasForeignKey("OfferId", "OfferTenantId");
                });
#pragma warning restore 612, 618
        }
    }
}
