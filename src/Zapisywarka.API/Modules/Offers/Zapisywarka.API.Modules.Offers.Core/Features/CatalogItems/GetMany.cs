using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OffersBD.Data;
using OffersBD.Models;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OffersBD.Features.CatalogItems
{
    public class GetMany
    {
        public class Query : IRequest<List<CatalogItemDTO>> 
        { 
            
        }

        public class CatalogItemDTO
        {
            public int Id { get; set; }

            public string Name { get; set; }

            public int? CategoryId { get; set; }

            public decimal? Price { get; set; }

            public int? AvaibleQuantity { get; set; }
        }

        class MappingProfile : Profile
        {
            public MappingProfile() => CreateMap<CatalogItem, CatalogItemDTO>();
        }




        class QueryHandler : IRequestHandler<Query, List<CatalogItemDTO>>
        {
            OffersDbContext context;
            IConfigurationProvider configuration;

            public QueryHandler(OffersDbContext context, IConfigurationProvider configuration)
            {
                this.context = context;
                this.configuration = configuration;
            }

            public async Task<List<CatalogItemDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.CatalogItems.ProjectTo<CatalogItemDTO>(configuration).ToListAsync();
            }
        }

    }


   
}
