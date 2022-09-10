
using System;
using System.Linq;
using RestSharp;

namespace Boa.Constrictor.RestSharp
{

  public class Post : BaseHttpRequest
  {
    Post(string resource) :base( new RestRequest(resource, Method.Post))
    {
            
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
   
  }
}