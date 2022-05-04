

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
    using RestSharp;
  public static class RestSharpClientFactory
  {
    public static RestClient WithCookieAuthentication(string baseAddress)
    {
      var authenticator = new CookieAuthenticator();
      var options = new RestClientOptions(baseAddress);
      options.CookieContainer = authenticator.CookieContainer;
      options.RemoteCertificateValidationCallback = (message, cert, chain, sslPolicyErrors) => true;

      return new RestClient(options)
      {
        Authenticator = authenticator
      };

      
    }
  }
}