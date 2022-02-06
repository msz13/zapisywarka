using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using Zapisywarka.API.AcceptanceTests.Interactions;
using ZapisywarkaApi.AcceptanceTests.Helpers;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{

  public class CreateUserAccount : ITaskAsync
  {
    string _accessCode = "Code";
    string _userName = "Użytkownik";
    string _password = "Password_01";
    string _passwordConfirmation = "Password_01";

    public CreateUserAccount()    {

    }

    public static CreateUserAccount ForThemselves()
    {
      return new CreateUserAccount();

    }
    public async Task PerformAsAsync(IActor actor)
    {
      _userName = actor.Using<MemoryAbility>().Recall("UserName");
      _password = actor.Using<MemoryAbility>().Recall("Password");
      _passwordConfirmation = actor.Using<MemoryAbility>().Recall("PasswordConfirmation");

      await actor.Using<ItentityTestServerAbility>().CreateUser(_accessCode, _userName, _password, _passwordConfirmation);
    }
  }
}