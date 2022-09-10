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
      var api = CanCallRestApi.As(actor);
      var response = api.LastResponse();
      var data = api.Client.Deserialize<TData>(response).Data;

      return response.IsSuccessful ? CSharpFunctionalExtensions.Result.Success<TData>(data) 
        : CSharpFunctionalExtensions.Result.Failure<TData>(response.Content);
    }

  
  }

}