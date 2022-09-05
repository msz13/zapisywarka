using System.Net.Http.Json;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using Microsoft.AspNetCore.Http;
using Zapisywarka.API.AcceptanceTests.Helpers;
using Zapisywarka.API.AcceptanceTests.StepDefinitions;
using CSharpFunctionalExtensions;
using Boa.Constrictor.RestSharp;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
  public class UserInfo
  {
    public string Id { get; set; }
    public string UserName { get; set; }
  }
  public class GetUserInfo : IQuestionAsync<Result<UserInfo>>
  {
    public GetUserInfo() { }

    internal static IQuestionAsync<Result<UserInfo>> Now() => new GetUserInfo();


    public async Task<Result<UserInfo>> RequestAsAsync(IActor actor)
    {

      return TestTask.WhereAsync("get user info", Get.Resource("offers/me"));
       

      return httpResult.IsSuccessStatusCode ?
        Result.Success<UserInfo>(await httpResult.Content.ReadFromJsonAsync<UserInfo>())
        : Result.Failure<UserInfo>(httpResult.StatusCode.ToString());

    }

    public override string ToString()
    {
      return "get user info";
    }

  }
}
