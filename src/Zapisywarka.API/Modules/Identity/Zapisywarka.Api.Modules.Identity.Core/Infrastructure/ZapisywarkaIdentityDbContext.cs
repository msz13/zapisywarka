using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

[assembly: InternalsVisibleTo("Zapisywarka.Api.Modules.Identity.IntegrationTests")]

namespace Zapisywarka.API.Modules.Identity.Core.Infrastructure
{

    internal class ZapisywarkaIdentityDbContext : IdentityDbContext
    {
        public ZapisywarkaIdentityDbContext(DbContextOptions options) : base(options)
        {
        }

      
    }

    
}
