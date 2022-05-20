using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using NodaTime;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{

  public class CreateUserAccount : ITaskAsync
  {
    string _accessCode = "Code";
    string _userName = "Użytkownik";
    string _password = "Password_01";
    string _passwordConfirmation = "Password_01";

    public CreateUserAccount(string name)
    {
      _userName = name;
    }

    public static CreateUserAccount WithName(string name)
    {
      return new CreateUserAccount(name);
    }

    public CreateUserAccount WithPassword(string password)
    {
      _password = password;
      return this;
    }

    public CreateUserAccount WithPasswordConfirmation(string passwordconfirmation)
    {
      _passwordConfirmation = passwordconfirmation;
      return this;
    }

    public async Task PerformAsAsync(IActor actor)
    {
      await actor.Using<ItentityTestServerAbility>().CreateUser(_accessCode, _userName, _password, _passwordConfirmation);
    }



    public override string ToString()
    {
      return $"Create user accaount with username: {_userName}";
    }
  }
}
