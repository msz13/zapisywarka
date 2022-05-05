using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;


namespace Zapisywarka.API.Modules.Identity.Core.Infrastructure
{
    internal interface IIdentityUserContext
    {
        Task SignInAsync(ClaimsPrincipal user);
    }

    internal class IdentityUserContext : IIdentityUserContext
    {

        HttpContext _context;
    public IdentityUserContext(HttpContextAccessor contextAccesor)
        {
            _context = contextAccesor.HttpContext;
        }

    public async Task SignInAsync(ClaimsPrincipal user)
        {
            await _context.SignInAsync(user);
        }
    }
}