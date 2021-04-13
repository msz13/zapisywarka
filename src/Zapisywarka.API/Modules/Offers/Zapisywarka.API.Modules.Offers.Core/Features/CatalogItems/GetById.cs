using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
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
    public class GetById
    {
        public class Query: IRequest<CatalogItemDTO>
        {
            public Query(int id)
            {
                Id = id;
            }

            public int Id { get; set; }
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


         class QueryHandler : IRequestHandler<Query, CatalogItemDTO>
        {

            OffersDbContext context;
            IMapper mapper;

            public QueryHandler(OffersDbContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<CatalogItemDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var item = await context.CatalogItems.FindAsync(request.Id);

                return mapper.Map<CatalogItemDTO>(item);
            }
        }
    }
}
