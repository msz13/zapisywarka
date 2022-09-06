using System.Net.Http.Json;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using Microsoft.AspNetCore.Http;
using Zapisywarka.API.AcceptanceTests.Helpers;
using Zapisywarka.API.AcceptanceTests.StepDefinitions;
using CSharpFunctionalExtensions;
using Boa.Constrictor.RestSharp;
using RestSharp;
using System;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
  public class UserInfo
  {
    public string Id { get; set; }
    public string UserName { get; set; }
  }

  public class GetUserInfo
  {    
    public static ITaskAsync OfLoggedUser()
    {
      return TestTask.WhereAsync("get user info", Get.Resource(IdentityEndpoints.Me));
    }

    internal static IQuestion<RestResponse> Result()
    {
      return Question.Where("get las rest response", LastResponse.Received());
    }
  }
}
