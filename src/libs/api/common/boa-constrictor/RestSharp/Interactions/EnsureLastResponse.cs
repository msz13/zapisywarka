using System;
using Boa.Constrictor.Screenplay;

namespace Boa.Constrictor.RestSharp
{
  public class EnsureLastResponse : ITask 
  {
    private static bool _success;
    

    public EnsureLastResponse(bool success)
    {
      _success = success;
    }

    public static EnsureLastResponse Success()
    {
      return new EnsureLastResponse(true);
    }

    public void PerformAs(IActor actor)
    {
      var response = CanCallRestApi.As(actor).LastResponse();

      if (!response.IsSuccessful) 
      {
        throw new RestExceptionException(response.Content);
      }
    }
  }
}