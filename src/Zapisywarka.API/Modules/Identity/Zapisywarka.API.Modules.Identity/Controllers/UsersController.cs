
using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Zapisywarka.API.Modules.Identity.Core.Features;

namespace Zapisywarka.API.Modules.Identity.Controllers
{
     
    
    [Route("api/identity/users")]
    [ApiController]
    public class UsersController: ControllerBase {

        IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUser.Command request) {

            var result = await _mediator.Send(request);
            return NoContent();
        }

        public IActionResult Get() {
            return Ok(new {Text = "Users"});
        } 


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _mediator.Send(new GetAllUsers.Query());
            return Ok(users);
        }

       
    }
}