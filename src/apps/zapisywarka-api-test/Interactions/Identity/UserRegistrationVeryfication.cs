using Boa.Constrictor.Screenplay;
using Boa.Constrictor.RestSharp;
using RestSharp;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
  public class UserRegistrationVeryfication 
  {
    public static IQuestion<RestResponse> Result()
    {
      return Question.Where<RestResponse>("User registration result", LastResponse.Received());
    }
   
  }
}