using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using CSharpFunctionalExtensions;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Zapisywarka.API.Modules.Identity.Core.Infrastructure;


namespace Zapisywarka.API.Modules.Identity.Core.Features
{
    public class LoginUser
    {

        public class Command : IRequest<Result<AuthenticationResult, AuthenticationError>>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public bool RememberMe { get; set; } = false;

        }

        public class UserInfo
        {
            public string Id { get; set; }
            public string UserName { get; set; }

        }

        public class AuthenticationResult
        {           
            public UserInfo UserInfo;
            public ClaimsPrincipal ClaimsPrincipal;
            public AuthenticationProperties authenticationProperties;

        }

        public class AuthenticationError
        {
            public string Message { get; set; } = "Błędny login lub hasło";
        }

          

        class CommandValidator : FluentValidation.AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(command => command.UserName).NotNull().NotEmpty();
                RuleFor(command => command.Password).NotNull().NotEmpty();
            }
        }

        class Handler : IRequestHandler<Command, Result<AuthenticationResult, AuthenticationError>>
        {
            UserManager<IdentityUser> _userManager;
            IUserClaimsPrincipalFactory<IdentityUser> _claimsFactory;

            public Handler(UserManager<IdentityUser> userManager, IUserClaimsPrincipalFactory<IdentityUser> claimsFactory)
            {
                _userManager = userManager;
                _claimsFactory = claimsFactory;
            }

            public async Task<Result<AuthenticationResult, AuthenticationError>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.UserName);

                var result = await ValidateLoginCredentials(user, request.Password);

                if (!result)
                {
                    return Result.Failure<AuthenticationResult, AuthenticationError>(new AuthenticationError());
                }
                
                return Result.Success<AuthenticationResult, AuthenticationError>(await CreateResult(user));
            }

            private async Task<bool> ValidateLoginCredentials(IdentityUser user, string password)
            {
                var result = true;

                if (user == null)
                {
                    result = false;
                }

                var passwordIsValid = await _userManager.CheckPasswordAsync(user, password);
                if (!passwordIsValid)
                {
                    result = false;
                }
                return result;
            }

            private async Task<AuthenticationResult> CreateResult(IdentityUser user)
            {
                return new AuthenticationResult
                {
                    UserInfo = new UserInfo { Id = user.Id, UserName = user.UserName },
                    ClaimsPrincipal = await _claimsFactory.CreateAsync(user)
                };
            }
          
        }

    }
}