using Microsoft.EntityFrameworkCore;
using OffersBD.Models;
using OffersBD.Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Zapisywarka.API.Common.Infrastructure.Infrastructure;

namespace OffersInfrastructure.Persistance
{
    //TODO: make internal
    public class OffersDbContext : DbContext
    {
        public OffersDbContext(DbContextOptions<OffersDbContext> options, IUsercontextService userService) : base(options) {

            this._userService = userService;
        }

        public OffersDbContext() { }

        IUsercontextService _userService;

        public IUsercontextService GetUserService() => this._userService;
        public DbSet<CatalogCategory> CatalogCategories { get; set; }
        public DbSet<CatalogItem> CatalogItems { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<OfferItem> OfferItems { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("offers");
            modelBuilder.ApplyConfiguration(new OffersConfiguration());
            modelBuilder.ApplyConfiguration(new CatalogItemConfiguration());
            modelBuilder.ApplyConfiguration(new OffersConfiguration());
            
            modelBuilder.Entity<CatalogItem>().HasQueryFilter(i => !i.IsDeleted);
        }

      

       


    }
}
