
using System;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using Zapisywarka.API.AcceptanceTests.Helpers;
using Zapisywarka.API.AcceptanceTests.StepDefinitions;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
    public class UserInfo 
    {
        public string Id { get; set ; }
        public string UserName { get; set; }
    }
  public class GetUserInfo : IQuestionAsync<UserInfo>
  {
    public GetUserInfo() { }

    internal static IQuestionAsync<UserInfo> Now() => new GetUserInfo();


    public async Task<UserInfo> RequestAsAsync(IActor actor)
    {
      return await actor.Using<CallApi>().Client.GetFromJsonAsync<UserInfo>(IdentityEndpoints.Me);
    }

    public override string ToString()
    {
      return "get user info";
    } 
   
  }
}