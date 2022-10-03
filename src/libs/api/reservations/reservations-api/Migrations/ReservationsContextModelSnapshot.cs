﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Zapisywarka.Api.Reservations.Reservations.Features;

#nullable disable

namespace Zapisywarka.Api.Reservations.ReservationsApi.Migrations
{
    [DbContext(typeof(ReservationsContext))]
    partial class ReservationsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("reservations")
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Zapisywarka.Api.Reservations.Reservations.Features.Offer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("offers", "reservations");
                });

            modelBuilder.Entity("Zapisywarka.Api.Reservations.Reservations.Features.Offer", b =>
                {
                    b.OwnsMany("Zapisywarka.Api.Reservations.Reservations.Features.OfferItem", "Items", b1 =>
                        {
                            b1.Property<int>("Position")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("integer")
                                .HasColumnName("position");

                            NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b1.Property<int>("Position"));

                            b1.Property<Guid>("offer_id")
                                .HasColumnType("uuid");

                            b1.Property<string>("Name")
                                .IsRequired()
                                .HasColumnType("text")
                                .HasColumnName("name");

                            b1.HasKey("Position", "offer_id");

                            b1.HasIndex("offer_id");

                            b1.ToTable("offer_items", "reservations");

                            b1.WithOwner()
                                .HasForeignKey("offer_id");
                        });

                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}