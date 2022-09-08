using System;
using Boa.Constrictor.Screenplay;
using RestSharp;
using CSharpFunctionalExtensions;

namespace Boa.Constrictor.RestSharp
{
  public class LastResponse : IQuestion<Result>
  {   
    public static LastResponse Result()
    {
      return new LastResponse();
    }

    public Result RequestAs(IActor actor)
    {
      var response = CanCallRestApi.As(actor).LastResponse();

      return response.IsSuccessful ? CSharpFunctionalExtensions.Result.Success(response.Content) 
        : CSharpFunctionalExtensions.Result.Failure(response.Content);
    }
  }
}