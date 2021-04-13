using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NodaTime;
using OffersBD.Models;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using OffersBD.Common;
using Zapisywarka.API.Common.Infrastructure;
using Zapisywarka.API.Common.Infrastructure.Application;
using Zapisywarka.API.Common.Infrastructure.IntegrationEvents;

namespace OffersBD.Features.Offers
{
    public class CreateOffer
    {
        public class Command: ICommand<OfferListDTO>
        {
            public string Name { get; set; }
            public LocalDateTime EndRegistrationDate { get; set; }
            public LocalDateTime StartCollectionDate { get; set; }
            public LocalDateTime EndCollectionDate { get; set; }

            public IList<OfferItemDTO> OfferItems { get; set; }
            public string TenantId { get; set; }

            public class OfferItemDTO
            {
                public int CatalogItemId { get; set; }

                public decimal Price { get; set; }

                public int Quantity { get; set; }
            }
        }
        

        public class CommandValidator: AbstractValidator<Command>, IValidator<Command>
        {
            private IClock clock;

            public CommandValidator(IClock clock)
            {
                this.clock = clock;

                RuleFor(o => o.Name).NotEmpty().MaximumLength(60).WithName("Nazwa oferty");

                RuleFor(o => o.TenantId).NotEmpty().WithName("TenantId");

                RuleFor(o => o.EndRegistrationDate)
                    .NotNull().NotEmpty().WithName("Data zakończenia zapisów")
                    .Must(date => BeInFeature(date)).WithMessage("Zakończenie zapisów nie może być w przeszłości");

                RuleFor(o => o.StartCollectionDate)
                   .NotEmpty().WithName("Data rozpoczęcia odbiorów");
                // .Must(date => BeInFeature(date)).WithMessage("Rozpoczęcie odbiorów nie może być w przeszłości");

                RuleFor(o => o.EndCollectionDate)
                    .Must(GreaterThanStart).When(o => !o.EndCollectionDate.Equals(new LocalDateTime()))
                        .WithMessage("Data zakończenia odbioru nie może być mniejsza niż rozpoczęcia");
                    //.Must(GreaterThanEndRegistration).When(o => !o.EndCollectionDate.Equals(new LocalDateTime()))
                      //  .WithMessage("Data zakończenia odbioru nie może być wcześniejsza niż zakończenia zapisów");

                RuleFor(o => o.OfferItems)
                    .NotEmpty().WithMessage("Oferta musi zawierać co najmniej jedną pozycję")
                    .Must(BeUnique).WithMessage("Pozycje oferty muszą być unikalne").When(o => o.OfferItems != null, ApplyConditionTo.CurrentValidator);

                RuleForEach(o => o.OfferItems).SetValidator(new OfferItemValidator());
            }


            private bool BeInFeature(LocalDateTime property)
            {
                return this.clock.InWarsaw().GetCurrentLocalDateTime().CompareTo(property) < 0;
            }

            private bool BeUnique(IList<Command.OfferItemDTO> offerItems)
            {
                var catalogItemsIds = new HashSet<int>();
                return offerItems.All(i => catalogItemsIds.Add(i.CatalogItemId));
            }

            private bool GreaterThanEndRegistration(Command command, LocalDateTime endCollection)
            {
                return endCollection.CompareTo(command.EndRegistrationDate) > 0;
            }

            bool GreaterThanStart(Command command, LocalDateTime endCollection)
            {
                return endCollection.CompareTo(command.StartCollectionDate) > 0;
            }

            class OfferItemValidator: AbstractValidator<Command.OfferItemDTO>
            {
                public OfferItemValidator()
                {
                    RuleFor(i => i.CatalogItemId).NotEmpty().NotNull().WithName("Id pozycji katalogu");
                }
            }
        }


        public class OfferListDTO
        {
            public string Id { get; internal set; }
            public string Name { get; internal set; }
        }

        public class MappingProfile: Profile
        {
            public MappingProfile() => CreateMap<Offer, OfferListDTO>();
        }

        class CommandHandler : IRequestHandler<Command, OfferListDTO>
        {
            OffersDbContext context;
            IMapper mapper;
            OfferUniqueNameValidator offerUniqueNameValidator;
            EventBus eventBus;

            public CommandHandler(OffersDbContext context, IMapper mapper, OfferUniqueNameValidator offerUniqueNameValidator, EventBus eventBus)
            {
                this.context = context;
                this.mapper = mapper;
                this.offerUniqueNameValidator = offerUniqueNameValidator;
                this.eventBus = eventBus;
            }

            public async Task<OfferListDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                await this.offerUniqueNameValidator.Validate(request.Name);
                
                var offer = new Offer
                {
                    Id = Guid.NewGuid().ToString(),
                    TenantId = request.TenantId,
                    OfferItems = request.OfferItems.Select(i => new OfferItem(i.CatalogItemId, i.Price, i.Quantity)).ToList()
                };

                var entry = context.Add(offer);

                entry.CurrentValues.SetValues(request);

               

                await context.SaveChangesAsync();

                return mapper.Map<OfferListDTO>(offer);
            }
        }
    }
}
