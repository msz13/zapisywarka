
using System.Security.Claims;
using System.Threading.Tasks;
using Zapisywarka.API.Modules.Identity.Core.Infrastructure;

namespace Zapisywarka.Api.Modules.Identity.IntegrationTests
{
    public class FakeIdentityUserContext : IIdentityUserContext
    {
        public FakeIdentityUserContext()
        {
            
        }

        public ClaimsPrincipal SignedInUser {get; private set; }

        public int Counter {get; set;} = 1;
        public async Task SignInAsync(ClaimsPrincipal user)
        {
            this.Counter++;
            await Task.Run(() => SignedInUser = user);
            
        }
    }
}