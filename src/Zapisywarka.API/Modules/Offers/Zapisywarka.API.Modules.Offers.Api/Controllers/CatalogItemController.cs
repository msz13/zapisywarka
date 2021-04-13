using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OffersBD.Features.CatalogItems;
using OffersBD.Data;
using MediatR;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WEB_API.Controllers
{
    [Route("api/catalog-items")]
    [ApiController]
    public class CatalogItemController : ControllerBase
    {
        IMediator mediator;

        public CatalogItemController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        // GET: api/<CatalogItemController>
        [HttpGet]
        public async Task<ActionResult<List<Create.CatalogItemDTO>>> Get()
        {
            return Ok(await mediator.Send(new GetMany.Query()));
        }

        // GET api/<CatalogItemController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetById.CatalogItemDTO>> Get(int id)
        {
            return Ok(await mediator.Send(new GetById.Query(id)));
        }

        // POST api/<CatalogItemController>
        [HttpPost]
        public async Task<ActionResult<Create.CatalogItemDTO>> Post([FromBody] Create.CreateCommand command)
        {
            var item = await mediator.Send(command);

            return Ok(item);
        }

        // PUT api/<CatalogItemController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Edit.Command command)
        {
            command.Id = id;
            await mediator.Send(command);
            return NoContent();

        }

        // DELETE api/<CatalogItemController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await mediator.Send(new Delete.Command(id));

            return NoContent();
        }

        [HttpPost("admin/seed-database")]
        public async Task<ActionResult> SeedDatabase()
        {
            await mediator.Send(new SeedDatabase.Command());
            return NoContent();

        }
    }
       
}
