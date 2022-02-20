using System;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
  public class Login : ITaskAsync
  {
    private string _userName;
    private string _password;

    public Login(string userName)
    {
      _userName= userName;
    }
    
    public static Login WithName(string userName)
    {
      return new Login(userName);
    }

    internal Login WithPassword(string password)
    {
      _password = password;
      return this;
    }

    public async Task PerformAsAsync(IActor actor)
    {
      
    }

    public override string ToString()
    {
      return $"Log with userName: {_userName} and {_password}";
    }
  }
}