using System;
using Boa.Constrictor.Screenplay;
using RestSharp;

namespace Boa.Constrictor.RestSharp
{
  public class LastResponse : IQuestion<RestResponse>
  {
   
    public static LastResponse Received()
    {
      return new LastResponse();
    }

    public RestResponse RequestAs(IActor actor)
    {
      return CanCallRestApi.As(actor).LastResponse();
    }
  }
}