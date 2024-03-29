using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

[assembly: InternalsVisibleTo("ZapisywarkaClientAps.Api.Identity.IdentityCore.Test")]

namespace Zapisywarka.API.Modules.Identity.Core.Infrastructure
{


  internal class ZapisywarkaIdentityDbContext : IdentityDbContext
  {
    public ZapisywarkaIdentityDbContext(DbContextOptions<ZapisywarkaIdentityDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
      builder.HasDefaultSchema("identity");
    }

  }


}
