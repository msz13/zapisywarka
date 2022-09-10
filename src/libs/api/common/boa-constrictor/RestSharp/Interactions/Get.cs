using System;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using RestSharp;

namespace Boa.Constrictor.RestSharp
{
  public class Get : BaseHttpRequest
  {
    public Get(string resource) : base(new RestRequest(resource, Method.Get))
    {
    }

    public static ITaskAsync Resource(string resource)
    {
      return new Get(resource);
    }
    
    
  }
}
