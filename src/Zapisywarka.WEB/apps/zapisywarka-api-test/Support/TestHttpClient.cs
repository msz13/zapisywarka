
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Http;

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
  public class CustomHandler : DelegatingHandler
  {
    CookieContainer _cookieContainer;

    public CustomHandler(CookieContainer container)
    {
      _cookieContainer = container;
    }

    protected async override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
    {
      var cookie = _cookieContainer.GetAllCookies().Where(c => c.Name == "Auth").Single();
      request.Headers.Add("Cookie", cookie.ToString());
      return await base.SendAsync(request, cancellationToken);
    }
  }

  public class TestHttpMessageHandlersBuilder : HttpMessageHandlerBuilder
  {
    public override IList<DelegatingHandler> AdditionalHandlers => throw new NotImplementedException();

    public override string Name { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    public override HttpMessageHandler PrimaryHandler { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

    public override HttpMessageHandler Build()
    {
      throw new NotImplementedException();
    }
  }

  public class TestClient 
  {
    CookieContainer _cookieContainer;
    HttpClient _httpClient;

    public TestClient()
    {
      _cookieContainer = new CookieContainer();
       var httpClientHandler = new HttpClientHandler();
      httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, sslPolicyErrors) => true;      
      httpClientHandler.CookieContainer = _cookieContainer;
      httpClientHandler.UseCookies = true;
      httpClientHandler.UseDefaultCredentials = true;
      
      var handlers = new TestHttpMessageHandlersBuilder();
      
     /*  _httpClient.BaseAddress = new Uri("http://localhost:5287"); */

    }
  }
}