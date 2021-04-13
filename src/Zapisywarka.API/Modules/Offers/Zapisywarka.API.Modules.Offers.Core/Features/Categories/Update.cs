using MediatR;
using OffersBD.Data;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OffersBD.Features.Categories
{
    public static class Update
    {
        public class Command: IRequest
        {
            public int Id;
            public string Name;
        }


        class CommandHandler : IRequestHandler<Command>
        {
            OffersDbContext context;

            public CommandHandler(OffersDbContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await this.context.CatalogCategories.FindAsync(request.Id);

                category.Name = request.Name;

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
