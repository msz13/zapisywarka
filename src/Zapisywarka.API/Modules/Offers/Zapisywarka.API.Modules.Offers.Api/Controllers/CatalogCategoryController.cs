using MediatR;
using Microsoft.AspNetCore.Mvc;
using OffersBD.Features.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zapisywarka.API.Common.Infrastructure.Infrastructure;
using static OffersBD.Features.Categories.CreateCategory;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WEB_API.Controllers
{
    [Route("api/catalog-categories")]
    [ApiController]
    public class CatalogCategoryController : ControllerBase
    {
        readonly IMediator mediator;
        readonly IUserService _userService;
        public CatalogCategoryController(IMediator mediator, IUserService userService)
        {
            this.mediator = mediator;
            _userService = userService;
        }

        // GET: api/<CatalogCategory>
        [HttpGet]
        public async Task<IEnumerable<CatalogCategoryDTO>> Get()
        {
            return await this.mediator.Send(new GetAll.Query());
        }

        // GET api/<CatalogCategory>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CatalogCategory>
        [HttpPost]
        public async Task<ActionResult<CatalogCategoryDTO>> Post([FromBody] CreateCategory.CreateCategoryCommand command)
        {
            command.Tenant = _userService.GetTenantId();
            var category = await this.mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }
                

        // PUT api/<CatalogCategory>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Update.Command command)
        {
            command.Id = id;
            await this.mediator.Send(command);
            return NoContent();
        }

        // DELETE api/<CatalogCategory>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
