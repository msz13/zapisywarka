using FluentValidation;
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
    public class Edit
    {
        public class Command: IRequest
        {
            public int Id { get; set; }

            public string Name { get; set; }

            public int? CategoryId { get; set; }

            public decimal? Price { get; set; }

            public int? AvaibleQuantity { get; set; }
        }

        class CommandValidator: AbstractValidator<Command>
        {

            public CommandValidator()
            {
                
                RuleFor(command => command.Name).NotNull().NotEmpty();
                RuleFor(command => command.Price).GreaterThanOrEqualTo(0);
                RuleFor(commnad => commnad.AvaibleQuantity).GreaterThanOrEqualTo(0);
            }
           
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

                item.Name = request.Name;
                item.CategoryId = request.CategoryId;
                item.Price = request.Price;
                item.AvaibleQuantity = request.AvaibleQuantity;

                await context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}
