using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using RestSharp;

namespace Boa.Constrictor.RestSharp {

  public class CanCallRestApi : IAbility
  {
    private RestClient _restClient;
    private RestResponse _lastResponse;


    public CanCallRestApi(RestClient restClient)
    {
      this._restClient = restClient;
    }

    public RestClient Client => _restClient;

    public RestResponse LastResponse() => _lastResponse;

    public async Task ExecuteAsync(RestRequest request)
    {
       _lastResponse = await _restClient.ExecuteAsync(request);
    }


    public static CanCallRestApi Using(RestClient client) {
      return new CanCallRestApi(client);
    }

    public static CanCallRestApi As(IActor actor) => actor.Using<CanCallRestApi>();
    
  }
}