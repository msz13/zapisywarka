
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CSharpFunctionalExtensions;
using Microsoft.AspNetCore.Identity;

[assembly: InternalsVisibleTo("Zapisywarka.API.Modules.Identity.UnitTests")]
namespace Zapisywarka.API.Modules.Identity.Core
{
  internal class AppUserValidator : IUserValidator<IdentityUser>
  {
    public class UserNameValidator
    {
      public UserNameValidator()
      {
      }

      public Result Validate(string userName)
      {
        /*  if(String.IsNullOrEmpty(userName)) {
             return Result.Failure("Puste pole");
         } */
        if (userName.Length <= 2)
        {
          return Result.Failure("Nieporawna długość");
        }

        if (userName.Length >= 33)
        {
          return Result.Failure("Nieporawna długość");
        }

        // może zawierać tylko litery, cyfry, _-.
        if (Regex.IsMatch(userName, "[^a-zA-Z0-9-_.]"))
        {
          return Result.Failure("Nieporawne znaki");
        }

        //musi zaczynać się od litery lub cyfry
        if (Regex.IsMatch(userName, "^[^a-zA-Z0-9]"))
        {
          return Result.Failure("Nieporawne znaki");
        }

        //musi kończyć się od literą lub cyfrą
        if (Regex.IsMatch(userName, "[^a-zA-Z0-9]$"))
        {
          return Result.Failure("Nieporawne znaki");
        }

        //nie może zawierać sekwancji co najmniej dwóch znaków
        if (Regex.IsMatch(userName, "[-._]{2,}"))
        {
          return Result.Failure("Nieporawne znaki");
        }

        return Result.Success();
      }
    }

    public AppUserValidator(IdentityErrorDescriber errors = null)
    {
      describer = errors ?? new IdentityErrorDescriber();
    }


    IdentityErrorDescriber describer;

    public async Task<IdentityResult> ValidateAsync(UserManager<IdentityUser> manager, IdentityUser user)
    {
      var userName = await manager.GetUserNameAsync(user);
      var result = new UserNameValidator().Validate(userName);
      return result.IsSuccess ? IdentityResult.Success : IdentityResult.Failed(describer.InvalidUserName(userName));
    }
  }

}
