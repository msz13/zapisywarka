using AutoMapper;
using MediatR;
using OffersBD.Data;
using OffersBD.Models;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Zapisywarka.API.Common.Infrastructure.Infrastructure;

namespace OffersBD.Features.Categories
{
    public class CreateCategory
    {
        public class CreateCategoryCommand: IRequest<CatalogCategoryDTO>
        {
            public  string Name { get; set; }
            [JsonIgnore]
            public string Tenant { get; set; }
        }


        class CreateCategoryHandler : IRequestHandler<CreateCategoryCommand, CatalogCategoryDTO> { 

            OffersDbContext dbContext;
            IUsercontextService userService;
            
            public CreateCategoryHandler(OffersDbContext dbContext, IUsercontextService userService)
        {
                this.dbContext = dbContext;
                this.userService = userService;
                
        }
            public async Task<CatalogCategoryDTO> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
            {                
                var category = new CatalogCategory { Name = request.Name, TenantId = request.Tenant };
                
                this.dbContext.CatalogCategories.Add(category); 
                
                await dbContext.SaveChangesAsync();

                return new CatalogCategoryDTO { Id = category.Id, Name = category.Name };

            }
        }



    }
}
