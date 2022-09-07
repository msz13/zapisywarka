

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
  using HttpTracer;
  using HttpTracer.Logger;
  using RestSharp;
  using TechTalk.SpecFlow.Infrastructure;

  public static class RestSharpClientFactory
  {
    public static RestClient WithCookieAuthentication(string baseAddress, ILogger logger)
    {
      var authenticator = new CookieAuthenticator();
      var options = new RestClientOptions(baseAddress);
      options.CookieContainer = authenticator.CookieContainer;
      options.RemoteCertificateValidationCallback = (message, cert, chain, sslPolicyErrors) => true;
      options.ConfigureMessageHandler = handler => new HttpTracerHandler(handler, logger, HttpMessageParts.All);
      
      return new RestClient(options)
      {
        Authenticator = authenticator
      };
      
    }
  }
}
