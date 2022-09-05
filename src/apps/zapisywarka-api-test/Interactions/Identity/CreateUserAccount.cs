using System;
using System.Threading.Tasks;
using Boa.Constrictor.Screenplay;
using Boa.Constrictor.RestSharp;
using NodaTime;
using Zapisywarka.API.AcceptanceTests.Helpers;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{

  public class CreateUserAccount
  {

    public static ITaskAsync With(UserCredentials userCredentials)
    {
      return TestTask.WhereAsync($"Create user accaount with username: {userCredentials.UserName}",
         Post.To(IdentityEndpoints.SignUp).With<UserCredentials>(userCredentials)
      );
    }

  }
}
