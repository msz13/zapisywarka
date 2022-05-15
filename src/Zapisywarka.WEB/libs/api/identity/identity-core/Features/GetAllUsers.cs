using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Zapisywarka.API.Modules.Identity.Core.Features
{
  public class GetAllUsers
  {
    public class Query : IRequest<List<UserDTO>>
    {

    }

    public class UserDTO
    {
      public string Username { get; set; }
    }

    class GetAllUsersHAndler : IRequestHandler<Query, List<UserDTO>>
    {
      UserManager<IdentityUser> _userMenager;

      public GetAllUsersHAndler(UserManager<IdentityUser> userMenager)
      {
        _userMenager = userMenager;
      }

      public async Task<List<UserDTO>> Handle(Query request, CancellationToken cancellationToken)
      {
        return await _userMenager.Users.Select(user => new UserDTO { Username = user.UserName }).ToListAsync();
      }
    }
  }
}
