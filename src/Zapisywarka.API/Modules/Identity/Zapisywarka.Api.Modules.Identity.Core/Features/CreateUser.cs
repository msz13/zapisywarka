using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Zapisywarka.API.Modules.Identity.Core.Features
{
    public class CreateUser
    {

        public class Command : IRequest<IdentityResult>
        {
            public string AccessToken { get; set; }
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : FluentValidation.AbstractValidator<Command>
        {
            public CommandValidator()
            {
                  RuleFor(command => command.UserName).NotNull().NotEmpty();
                  RuleFor(command => command.Password).NotNull().NotEmpty();
                  RuleFor(command => command.AccessToken).NotNull().NotEmpty();
            }
        }

        public class UserValidator : IUserValidator<IdentityUser>
        {
            public Task<IdentityResult> ValidateAsync(UserManager<IdentityUser> manager, IdentityUser user)
            {
                throw new NotImplementedException();
            }
        }


        internal class CreateUserHandler : IRequestHandler<Command, IdentityResult>
        {
            private readonly UserManager<IdentityUser> _userMenager;

            public CreateUserHandler(UserManager<IdentityUser> userMenager)
            {
                _userMenager = userMenager;
            }

            public async Task<IdentityResult> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = new IdentityUser
                {
                    UserName = request.UserName,

                };

                var result = await _userMenager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {

                    var message = result.Errors.Select(e => e.Code).ToList();
                    
                    throw new Zapisywarka.API.Common.Application.ValidationException(message);
                }
                return result;
            }
        }
    }
}