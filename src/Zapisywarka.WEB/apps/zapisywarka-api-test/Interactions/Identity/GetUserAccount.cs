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
 
  internal class GetUserAccount : IQuestionAsync<UserAccauntInfo>
  {
    string _accauntName;

    public GetUserAccount(string accauntName)
    {
      _accauntName = accauntName;
    }

    public class UserAccauntInfo
    {
      public string UserName { get; set; }
    }

    internal static IQuestionAsync<UserAccauntInfo> For(string acauntName)
    {
      return new GetUserAccount(acauntName);
    }



    public async Task<UserAccauntInfo> RequestAsAsync(IActor actor)
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