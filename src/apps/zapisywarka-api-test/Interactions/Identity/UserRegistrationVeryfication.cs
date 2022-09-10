using Boa.Constrictor.Screenplay;
using Boa.Constrictor.RestSharp;
using RestSharp;
using CSharpFunctionalExtensions;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
  public class UserRegistrationVeryfication 
  {
    public static IQuestion<Result<string>> Result()
    {
      return Question.Where<Result<string>>("User registration result", LastResponse<string>.Result());
    }
   
  }
}