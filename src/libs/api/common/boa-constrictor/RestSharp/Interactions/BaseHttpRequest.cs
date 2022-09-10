using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using RestSharp;

namespace Boa.Constrictor.RestSharp
{
  public abstract class BaseHttpRequest : ITaskAsync
  {
    protected RestRequest _request;
    private bool _ensureSucces;

    protected BaseHttpRequest(RestRequest request)
    {
      _request = request;
    }

     public ITaskAsync EnsureSuccess()
    {
      _ensureSucces = true;
      return this;
    }

    public async Task PerformAsAsync(IActor actor)
    {
      var api = CanCallRestApi.As(actor);
      await api.ExecuteAsync(_request);

      if(_ensureSucces)
      {
        ThrowIfErrorresponse(api.LastResponse());
      }
    }

     public override string ToString()
    {
      return $"Perform {_request.Method} request to {_request.Resource} ";
    }

    private static void ThrowIfErrorresponse(RestResponse lastResponse)
    {      
      if (!lastResponse.IsSuccessful)
      {
        throw new RestExceptionException(lastResponse.Request.Method + " to: " + lastResponse.ResponseUri + " error: "  + lastResponse.Content);
      }
    }




  }
}
