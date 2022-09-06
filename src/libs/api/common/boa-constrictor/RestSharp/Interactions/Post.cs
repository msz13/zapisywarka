
using System.Linq;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using RestSharp;

namespace Boa.Constrictor.RestSharp
{
  public abstract class BaseHttpRequest : ITaskAsync
  {
    protected RestRequest _request;

    protected BaseHttpRequest(RestRequest request)
    {
      _request = request;
    }

    public async Task PerformAsAsync(IActor actor)
    {
      var api = CanCallRestApi.As(actor);
       var count =  api.Client.CookieContainer.GetCookies(new System.Uri("http://localhost:5000")).Count();
      actor.Logger.Info("Number of cookies: " + count);
      await api.ExecuteAsync(_request);
    }

   
    
  }

  public class Post : BaseHttpRequest
  {
    Post(string resource) :base( new RestRequest(resource, Method.Post))
    {
            
    }

    public static Post To(string resource)
    {
        return new Post(resource);
    }

     public override string ToString()
    {
      return $"Perform post request with body: ";
    }

    public Post With<T>(T body) where T : class
    {
      _request.AddJsonBody<T>(body);
      return this;
    }
  }
}