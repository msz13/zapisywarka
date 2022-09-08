using System;
using Boa.Constrictor.Screenplay;
using RestSharp;
using CSharpFunctionalExtensions;

namespace Boa.Constrictor.RestSharp
{
  public class LastResponse<TData> : IQuestion<Result<TData>>
  {   
    public static LastResponse<TData> Result()
    {
      return new LastResponse<TData>();
    }

    public Result<TData> RequestAs(IActor actor)
    {
      var rest = CanCallRestApi.As(actor);
      var response = rest.LastResponse();
      var data = rest.Client.Deserialize<TData>(response).Data;

      return response.IsSuccessful ? CSharpFunctionalExtensions.Result.Success<TData>(data) 
        : CSharpFunctionalExtensions.Result.Failure<TData>(response.ErrorMessage);
    }
    
  }

  public class RawLastResponse : IQuestion<RestResponse>
  {
     public static RawLastResponse Result()
    {
      return new RawLastResponse();
    }

    public RestResponse RequestAs(IActor actor)
    {
      var api = CanCallRestApi.As(actor);
      return api.LastResponse();
    }
  }
}

