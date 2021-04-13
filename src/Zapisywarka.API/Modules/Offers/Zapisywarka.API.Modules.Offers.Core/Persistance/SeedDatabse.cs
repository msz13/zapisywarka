using MediatR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Text.Json;
using OffersBD.Models;
using OffersInfrastructure.Persistance;

namespace OffersBD.Data
{
    public class SeedDatabase
    {
        public class Command : IRequest
        {

        }

        class ComandHandler : IRequestHandler<Command>
        {
            OffersDbContext context;

            public ComandHandler(OffersDbContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                context.CatalogItems.RemoveRange(context.CatalogItems);
                await context.SaveChangesAsync();

                var path = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "OffersBd", "Data", "seed.json");
                using FileStream jsonFileStream = File.OpenRead(path);

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var catalogItems = await JsonSerializer.DeserializeAsync<List<CatalogItem>>(jsonFileStream, options);
                                              

               context.CatalogItems.AddRange(catalogItems);
               await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
