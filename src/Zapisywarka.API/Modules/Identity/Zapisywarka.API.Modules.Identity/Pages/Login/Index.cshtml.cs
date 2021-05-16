using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Zapisywarka.API.Modules.Identity.Features.Authentication;
using IdentityServer4;

using IdentityServer4.Test;


using Microsoft.AspNetCore.Http;





namespace Zapisywarka.API.Modules.Identity.Pages.Login
{
    public class LoginModel : PageModel
    {
        TestUserStore _users;
        public LoginModel(TestUserStore users) {
            this._users =users;
        }

        [BindProperty]
        public Authenticate.Command Command {get; set;}

        public void OnGet()
        {
            
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null) {
           
          Console.WriteLine(returnUrl);
          /*
            var props = new AuthenticationProperties
                        {
                            IsPersistent = false,                            
                        };

            const string issuer = "zapisywarka.api";
            var identity = new ClaimsIdentity("1");
            identity.AddClaim(new Claim(ClaimTypes.Name, "NameAdmin", issuer));
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, "1", issuer));
            identity.AddClaim(new Claim("sub", "13", issuer));
         
            var principal = new ClaimsPrincipal(identity);
            */
             var user = _users.FindByUsername("admin");
                 

                    // only set explicit expiration here if user chooses "remember me". 
                    // otherwise we rely upon expiration configured in cookie middleware.
                    AuthenticationProperties props = null;
                    props = new AuthenticationProperties
                        {
                            IsPersistent = false,                           
                        };
                    

                    // issue authentication cookie with subject ID and username
                    var isuser = new IdentityServerUser(user.SubjectId)
                    {
                        DisplayName = user.Username
                    };
            await HttpContext.SignInAsync(isuser, props);
            return Redirect(returnUrl);
        }
    }
}
