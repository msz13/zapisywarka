
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Zapisywarka.API.Modules.Identity.Core.Features {
    public class CreateUser {

        public class Command : IRequest<IdentityResult>
        {
            public string AccessToken { get; set; }
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator: AbstractValidator<Command> 
        {
            public CommandValidator() {
                RuleFor(command => command.UserName).NotNull().NotEmpty();
            }
        }

      
        internal class CreatrUserHandler : IRequestHandler<Command, IdentityResult>
        {
            private readonly UserManager<IdentityUser> _userMenager;

            public CreatrUserHandler(UserManager<IdentityUser> userMenager)
            {
                _userMenager = userMenager;
            }

            public async Task<IdentityResult> Handle(Command request, CancellationToken cancellationToken)
          {
                var user = new IdentityUser
                {
                    UserName = request.UserName,
                                        
                };
                //kjkj
                var result = await _userMenager.CreateAsync(user, request.Password); 
                if(!result.Succeeded) {
                    
                var message = result.Errors.Select(e => e.Code.ToString()).ToString();
                    throw new ArgumentNullException(message);
                }
                return result;
            }
        }
    }
}