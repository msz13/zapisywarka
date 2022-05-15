using System;
using System.Net.Http;
using Boa.Constrictor.Screenplay;
using RestSharp;
using Zapisywarka.API.AcceptanceTests.Helpers;

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
  internal class CallApi : IAbility
  {
    HttpClient _client;

    public HttpClient Client
    {
      get
      {
        return _client;
      }
    }

    public CallApi(HttpClient httpClient)
    {
      _client = httpClient;
    }

    internal static IAbility WithClient(HttpClient httpClient)
    {
      var ability = new CallApi(httpClient);
      return ability;
    }
  }
}

internal class CallApiRestSharp : IAbility
{
  RestClient _client;

  public RestClient Client
  {
    get
    {
      return _client;
    }
  }

  public CallApiRestSharp(RestClient httpClient)
  {
    _client = httpClient;
  }

  internal static CallApiRestSharp WithBaseAdress(string baseAddress)
  {
    RestClient client = CreateClient(baseAddress);

    var ability = new CallApiRestSharp(client);
    return ability;
  }

  private static RestClient CreateClient(string baseAddress)
  {
    var authenticator = new CookieAuthenticator();
    var options = new RestClientOptions(baseAddress);
    options.CookieContainer = authenticator.CookieContainer;
    options.RemoteCertificateValidationCallback = (message, cert, chain, sslPolicyErrors) => true;

    var client = new RestClient(options)
    {
      Authenticator = authenticator
    };
    return client;
  }
}
