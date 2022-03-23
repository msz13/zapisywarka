
using System.Net.Http;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Infrastructure;
using Zapisywarka.API.AcceptanceTests.Helpers;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using ZapisywarkaApi.AcceptanceTests.Helpers;
using System.Security.Claims;
using CSharpFunctionalExtensions;
using System;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Linq;
using System.Net.Http.Json;
using RestSharp;

namespace Zapisywarka.API.AcceptanceTests.StepDefinitions
{
  [Binding]
  public class AuthenticationStepDefinitons : StepsBaseClass
  {
    IActor john;

    WebApplicationFactory<Program> _factory;

    CookieContainer _cookieContainer;

    RestClient _client;

    public AuthenticationStepDefinitons(ScenarioContext scenarioContext, ISpecFlowOutputHelper specFlowOutputHelper) : base(scenarioContext, specFlowOutputHelper)
    {
    }

    [BeforeScenario]
    void SetUpActor()
    {
      /*  _factory = new WebApplicationFactory<Program>().WithWebHostBuilder((host) =>
           {
             host.UseEnvironment(Microsoft.Extensions.Hosting.Environments.Development);
           }); 
      var client = _factory.CreateClient(); */
      var httpClientHandler = new HttpClientHandler();
      httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, sslPolicyErrors) => true;
      _cookieContainer = new CookieContainer();
      httpClientHandler.CookieContainer = _cookieContainer;
      httpClientHandler.UseCookies = true;
      httpClientHandler.UseDefaultCredentials = true;
      var client = new HttpClient(httpClientHandler);
      client.BaseAddress = new Uri("http://localhost:5287");
     
      var authenticator = new CookieAuthenticator();
       var options = new RestClientOptions("http://localhost:5287");
      options.CookieContainer = authenticator.CookieContainer;
      options.RemoteCertificateValidationCallback = (message, cert, chain, sslPolicyErrors) => true;

      _client = new RestClient(options) 
      {
        Authenticator = authenticator
      };




      john = new Actor(name: "Jan", logger: new BoaSpecFlowLogger(_specFlowOutputHelper));
      john.Can(new MemoryAbility());
      john.Can(new ItentityTestServerAbility(client));
      john.Can(CallApi.WithClient(client));

    }


    [Given(@"Organizator zapisów zarejestrował konto jako użytkownik ""(.*)"" z hasłem ""(.*)""")]
    public async Task GivenOrganizatorZapisowZarejestrowalKontoJakoUzytkownikZHaslem(string userName, string pasword)
    {
      var configuration = new ConfigurationBuilder().Build();

      var credentals = new UserCredentials { UserName = userName, Password = pasword };

      await john.AttemptsToAsync(
        CreateUserAccount.WithName(credentals.UserName).WithPassword(credentals.Password).WithPasswordConfirmation(credentals.Password)
        );
      john.AttemptsTo(Remember.Fact("credentials", credentals));

    }

    [Given(@"Podaje poprawne dane logowania")]
    public void GivenPodajePoprawneDaneLogowania()
    {

    }

    [When(@"Próbuje się zalogować")]
    public async Task WhenProbujeSieZalogowac()
    {
      var credentals = john.AskingFor<dynamic>(Recall.Fact("credentials")) as UserCredentials;
      // await john.AttemptsToAsync(Login.WithName(credentals.UserName).WithPassword(credentals.Password));
      await _client.PostJsonAsync(IdentityEndpoints.LogIn, credentals);

      _specFlowOutputHelper.WriteLine("cookies: " + _cookieContainer.GetCookies(new Uri("http://localhost")).Count);
    }

    [When(@"Niezalogowany użytkownik chce otrzymać dostęp do swojego konta")]
    public async Task WhenNiezalogowanyUzytkownikChceOtrzymacDostepDoSwojegoKonta()
    {

      var result = await john.AskingForAsync<Result<UserInfo>>(GetUserInfo.Now());
      john.AttemptsTo(Remember.Fact("get_user_info_result", result));
    }

    [Then(@"Powinien otrzymać dostęp do swojego konta w aplikacji")]
    public async Task ThenPowinienOtrzymacDostepDoSwojegoKontaWAplikacji()
    {
      // _specFlowOutputHelper.WriteLine("cookies: "+_cookieContainer.GetAllCookies()[0].Name+" "+_cookieContainer.GetAllCookies()[0].Domain+" "+_cookieContainer.GetAllCookies()[0].Path);
      // var userInfo = await john.AskingForAsync<Result<UserInfo>>(GetUserInfo.Now());
    /*   var client = john.Using<CallApi>().Client;
      var cookie = _cookieContainer.GetAllCookies().Where(c => c.Name == "Auth").Single();
      _specFlowOutputHelper.WriteLine("cookies auth: " + cookie.ToString());
      client.DefaultRequestHeaders.Add("Cookie", cookie.ToString()); */

      //var httpResult = await client.GetAsync(IdentityEndpoints.Me);
      
      var  userInfo = await _client.GetJsonAsync<UserInfo>(IdentityEndpoints.Me);

     /*  var userInfo = httpResult.IsSuccessStatusCode ?
          Result.Success<UserInfo>(await httpResult.Content.ReadFromJsonAsync<UserInfo>())
          : Result.Failure<UserInfo>(httpResult.StatusCode.ToString()); */

      var credentals = john.AskingFor(Recall.Fact("credentials")) as UserCredentials;
      userInfo.UserName.Should().Be(credentals.UserName);
    }

    [Then(@"Widzi komunikat błędu")]
    public void ThenWidziKomunikatBledu()
    {
      var result = john.AskingFor(Recall.Fact("get_user_info_result")) as Result<UserInfo>?;
      result.GetValueOrDefault().IsSuccess.Should().BeFalse();
      result.GetValueOrDefault().Error.Should().Be("Unauthorized");
    }

  }
}