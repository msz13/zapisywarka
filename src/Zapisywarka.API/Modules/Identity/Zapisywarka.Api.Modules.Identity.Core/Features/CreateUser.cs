
using MediatR;
using Microsoft.AspNetCore.Identity;
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

                return await _userMenager.CreateAsync(user, request.Password); ;
            }
        }
    }
}