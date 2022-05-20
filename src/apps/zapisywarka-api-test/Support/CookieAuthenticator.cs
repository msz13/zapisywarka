using System.Threading.Tasks;
using RestSharp;
using RestSharp.Authenticators;
using System.Net;
using System.Linq;

namespace Zapisywarka.API.AcceptanceTests.Helpers
{
  public class CookieAuthenticator : IAuthenticator
  {
    CookieContainer _cookieContainer = new CookieContainer();

    public CookieContainer CookieContainer => _cookieContainer;

    public async ValueTask Authenticate(RestClient client, RestRequest request)
    {
      var cookie = _cookieContainer.GetAllCookies().Where(c => c.Name == "Auth").SingleOrDefault();
      if (cookie != null)
      {
        request.AddHeader("Cookie", cookie.ToString());
      }

    }
  }
}
