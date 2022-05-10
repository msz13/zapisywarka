
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Zapisywarka.API.Modules.Identity.Core.Features
{
    public class GetUserByName
    {
        public class Query : IRequest<Result<UserDTO>>
        {
            public string UserName {get; set;}
        }

        public class UserDTO
        {
            public string Username { get; set; }
        }

    internal class GetUserByNameHandler : IRequestHandler<Query, Result<UserDTO>>
    {
        UserManager<IdentityUser> _userMenager;

      public GetUserByNameHandler(UserManager<IdentityUser> userMenager)
      {
        _userMenager = userMenager;
      }

     
        async Task<Result<UserDTO>> IRequestHandler<Query, Result<UserDTO>>.Handle(Query request, CancellationToken cancellationToken)
      {
         var user = await _userMenager.FindByNameAsync(request.UserName);
         
         if(user == null)
          throw new Exception($"User {request.UserName} not found");
         return Result.Success<UserDTO>(new UserDTO {Username = user.UserName});
      }

      
    }
  }
}
 