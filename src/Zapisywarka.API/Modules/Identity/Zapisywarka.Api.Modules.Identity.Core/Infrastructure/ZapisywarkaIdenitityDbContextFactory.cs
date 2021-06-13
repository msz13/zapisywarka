using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Zapisywarka.API.Modules.Identity.Core.Infrastructure
{
    class ZapisywarkaIdenitityDbContextFactory : IDesignTimeDbContextFactory<ZapisywarkaIdentityDbContext>
    {
       public ZapisywarkaIdentityDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ZapisywarkaIdentityDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Database=Offers;Username=postgres;Password=Password_01",
                o => o.UseNodaTime());
            
            return new ZapisywarkaIdentityDbContext(optionsBuilder.Options);
        }
    }
}
