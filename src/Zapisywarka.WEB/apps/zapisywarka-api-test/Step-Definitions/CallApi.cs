using System;
using System.Net.Http;
using Boa.Constrictor.Screenplay;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  internal class CallApi : IAbility
  {
     HttpClient _client;   

    public CallApi(HttpClient httpClient)
    {
      _client = httpClient;
    }

    internal static IAbility WithClient(HttpClient httpClient)
    {
      var ability = new CallApi(httpClient);
    }
  }
}