
using System;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using RestSharp;

namespace Boa.Constrictor.RestSharp
{
    public class EnsureLastResponse : ITask
    {
    private bool success;

    public EnsureLastResponse(bool success)
    {
      this.success = success;
    }

    public static ITask Succes()
        {
            return new EnsureLastResponse(true);
        }

    public static ITask Failure()
        {
            return new EnsureLastResponse(false);
        }

    public void PerformAs(IActor actor)
    {
      var api = CanCallRestApi.As(actor);

      if(success == true) {
        ThrowIfErrorResponse(api.LastResponse()); 
      } else
      {
        ThrowIfSuccessResponse(api.LastResponse());
      } 
           
      
    }

    private void ThrowIfSuccessResponse(RestResponse lastResponse)
    {
      if (lastResponse.IsSuccessful)
      {
        throw new RestExceptionException(lastResponse.Request.Method + " to: " + lastResponse.ResponseUri + " was succesfult, but should have failed");
      }
    }

     private static void ThrowIfErrorResponse(RestResponse lastResponse)
    {      
      if (!lastResponse.IsSuccessful)
      {
        throw new RestExceptionException(lastResponse.Request.Method + " to: " + lastResponse.ResponseUri + " error: "  + lastResponse.Content);
      }
    }

    public override string ToString()
    {
      return $"Ensures rest response success";
    }

   
   
  }
}