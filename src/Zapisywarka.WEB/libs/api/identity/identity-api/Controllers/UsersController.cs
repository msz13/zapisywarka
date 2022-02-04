
using System;
using System.Threading.Tasks;
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Zapisywarka.API.Modules.Identity.Core.Features;

namespace Zapisywarka.API.Modules.Identity.Controllers
{         
    [Route("users")]
    [ApiController]
    public class UsersController: ControllerBase {

        IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUser.Command request) 
        {

            var result = await _mediator.Send(request);
            return NoContent();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _mediator.Send(new GetAllUsers.Query());
            
            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUser.Command request) 
        {           
            return await _mediator.Send(request)
                .Tap(authResult => HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, authResult.ClaimsPrincipal))
                .Finally<LoginUser.AuthenticationResult, IActionResult, LoginUser.AuthenticationError>(result => result.IsSuccess ? Ok(result.Value.UserInfo) : Unauthorized(result.Error));
        }
       
    }
}