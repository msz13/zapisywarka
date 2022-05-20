using MediatR;
using OffersBD.Data;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OffersBD.Features.CatalogItems
{
    public class Delete
    {
        public class Command: IRequest
        {
            public Command(int id)
            {
                Id = id;
            }

            public int Id { get; set; }
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
                var item = await context.CatalogItems.FindAsync(request.Id);

                item.IsDeleted = true;

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
