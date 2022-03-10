
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Zapisywarka.API.Modules.Identity.Core.Features;
using static Zapisywarka.API.Modules.Identity.Core.Features.GetUserByName;

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

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetByUserName(string userName)
        {
            var user = await _mediator.Send<Result<UserDTO>>(new GetUserByName.Query {UserName = userName});
            
            return Ok(user.Value);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUser.Command request) 
        {           
            return await _mediator.Send(request)
                .Tap(authResult => HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, authResult.ClaimsPrincipal))
                .Finally<LoginUser.AuthenticationResult, IActionResult, LoginUser.AuthenticationError>(result => result.IsSuccess ? Ok(result.Value.UserInfo) : Unauthorized(result.Error));
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> UserInfo()
        {            
           var userClaims = User.Claims;
                             
           var userInfo = new {
               Id = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value,
               UserName = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Name).Value,                 
           };
          
           return Ok(userInfo);
           
        }
       
    }
}