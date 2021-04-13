using MediatR;
using Microsoft.EntityFrameworkCore;
using OffersBD.Data;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OffersBD.Features.Categories
{
    public class GetAll
    {
        public class Query : IRequest<IList<CatalogCategoryDTO>>
        {
            public Query() { }

        }

        class QueryHandler : IRequestHandler<Query, IList<CatalogCategoryDTO>>
        {
            OffersDbContext context;
            public QueryHandler(OffersDbContext context)
            {
                this.context = context;
            }
            public async Task<IList<CatalogCategoryDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.CatalogCategories.Select(c => new CatalogCategoryDTO { Id = c.Id, Name = c.Name }).ToListAsync();
            }
        }

    }           

       
}
