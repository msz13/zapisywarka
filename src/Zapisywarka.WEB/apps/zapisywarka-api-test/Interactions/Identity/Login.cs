using System;
using System.Linq;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using Zapisywarka.API.AcceptanceTests.Helpers;
using Zapisywarka.API.AcceptanceTests.StepDefinitions;
using ZapisywarkaApi.AcceptanceTests.Helpers;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
  public class Login : ITaskAsync
  {
    private string _userName;
    private string _password;

    public string? IdentityEndpoint { get; private set; }

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
      var request = new { UserName = _userName, Password = _password };
      var response = await actor.Using<CallApi>().Client.PostAsJsonAsync(IdentityEndpoints.LogIn, request);
      response.Headers.TryGetValues("Set-cookie", out var cookies);
      actor.AttemptsTo(Remember.Fact("cookie", cookies.ToArray()[0]));
    }

    public override string ToString()
    {
      return $"log in with userName: {_userName} and password: {_password}";
    }
  }
}