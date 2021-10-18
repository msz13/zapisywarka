using MediatR;
using OffersBD.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using OffersBD.Models;
using AutoMapper;
using FluentValidation;
using OffersInfrastructure.Persistance;
using System.Text.Json.Serialization;
using Zapisywarka.API.Common.Infrastructure.Application;
using Zapisywarka.API.Common.Infrastructure.Infrastructure;

namespace OffersBD.Features.CatalogItems
{
    public class Create
    {
        public class CreateCommand: ICommand, IRequest<CatalogItemDTO>
        {
            [JsonIgnore]
            public string TenantId { get; set; } 
            public string Name { get; set; }

            public int? CategoryId { get; set; }
                  
            public decimal? Price { get; set; }

            public int? AvaibleQuantity { get; set; }
        }

        public class CreateCommandValidator: AbstractValidator<CreateCommand>
        {
            public CreateCommandValidator()
            {
                RuleFor(command => command.Name).NotNull().NotEmpty();
                RuleFor(command => command.Price).GreaterThanOrEqualTo(0);
                RuleFor(commnad => commnad.AvaibleQuantity).GreaterThanOrEqualTo(0);
            }
        }

        class MappingProfile: Profile
        {
            public MappingProfile() => CreateMap<CatalogItem, CatalogItemDTO>();
            
        }


        class CreateCommandHandler : IRequestHandler<CreateCommand, CatalogItemDTO>
        {
            OffersDbContext context;

            IMapper mapper;

            IUsercontextService userService;

            public CreateCommandHandler(OffersDbContext context, IMapper mapper, IUsercontextService userService)
            {
                this.context = context;
                this.mapper = mapper;
                this.userService = userService;
            }

            public async Task<CatalogItemDTO> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var item = new CatalogItem { TenantId = userService.GetTenantId()};

                var entry = context.CatalogItems.Add(item);

                entry.CurrentValues.SetValues(request);

                await context.SaveChangesAsync();

                return  mapper.Map<CatalogItem, CatalogItemDTO>(item);               

            }
        }

        public class CatalogItemDTO
        {
            public int Id { get; set; }         
                        
            public string Name { get; set; }

            public int? CategoryId { get; set; }

            public decimal? Price { get; set; }

            public int? AvaibleQuantity { get; set; }
        }

    }

    
}
