using System;
using System.Linq;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity 
{
  internal class GetUserAccount : IQuestionAsync<string>
  {
     string _accauntName;

    public GetUserAccount(string accauntName)
    {
      _accauntName = accauntName;
    }

    internal static IQuestionAsync<string> For(string acauntName)
    {
      return new GetUserAccount(acauntName);
    }

    public async Task<string> RequestAsAsync(IActor actor)
    {
      var users = await actor.Using<ItentityTestServerAbility>().GetUsers();
      return users.Single<string>(name => name == "testuser");
    }
  }
}