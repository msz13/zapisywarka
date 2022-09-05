
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using RestSharp;

namespace Boa.Constrictor.RestSharp 
{
  public class Post : ITaskAsync
  {

    RestRequest _request;

    Post(string resource)
    {
        _request = new RestRequest(resource, Method.Post);    
    }

    public static Post To(string resource)
    {
        return new Post(resource);
    }

    public Post With<T>(T body) where T : class
    {
        _request.AddJsonBody<T>(body);
        return this;
    }

    

    public async Task PerformAsAsync(IActor actor)
    {
      var api = CanCallRestApi.As(actor);
      await api.ExecuteAsync(_request);
    }

    public override string ToString()
    {        
      return $"Perform post request with body: ";
    }
  }
}