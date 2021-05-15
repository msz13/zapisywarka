﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using Zapisywarka.API.Common.Infrastructure.Infrastructure;

namespace OffersBD.Data
{
    public class OffersContextFactory : IDesignTimeDbContextFactory<OffersDbContext>
    {
        public OffersDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<OffersDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Database=Offers;Username=postgres;Password=Password_01", 
                o => o.UseNodaTime());
            var userServie = new UserService();
            return new OffersDbContext(optionsBuilder.Options, userServie);
        }
    }
}