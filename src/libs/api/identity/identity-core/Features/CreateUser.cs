using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Zapisywarka.API.Modules.Identity.Core.Features
{
  public class CreateUser
  {

    public class Command : IRequest<IdentityResult>
    {
      public string AccessCode { get; set; }


      public string UserName { get; set; }


      public string Password { get; set; }
    }

    internal class CommandValidator : FluentValidation.AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(command => command.UserName).NotNull().NotEmpty();
        RuleFor(command => command.Password).NotNull().NotEmpty();
        RuleFor(command => command.AccessCode).NotNull().NotEmpty();
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
