using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using NodaTime;
using TechTalk.SpecFlow.Assist.Attributes;
using static Zapisywarka.API.AcceptanceTests.Interactions.Identity.GetUserAccount;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
 
  internal class GetUserAccount : IQuestionAsync<UserInfo>
  {
    string _accauntName;

    public GetUserAccount(string accauntName)
    {
      _accauntName = accauntName;
    }

    public class UserInfo
    {
      public string UserName { get; set; }
    }

    internal static IQuestionAsync<UserInfo> For(string acauntName)
    {
      return new GetUserAccount(acauntName);
    }



    public async Task<UserInfo> RequestAsAsync(IActor actor)
    {
      var user = await actor.Using<ItentityTestServerAbility>().GetUser(_accauntName);
      return user;
    }

    public override string ToString()
    {
      return $"user accaount with name {_accauntName}";
    }


  }
}