using System;
using System.Linq;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Boa.Constrictor.RestSharp;
using Boa.Constrictor.Screenplay;
using Zapisywarka.API.AcceptanceTests.Helpers;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
  public class Login 
  {    
    public static ITaskAsync WithCredentials(UserCredentials credentials)
    {
      return TestTask.WhereAsync($"log in with userName: {credentials.UserName} and password: {credentials.Password}",
        Post.To("users/login").With<UserCredentials>(credentials).EnsureSuccess()        
        );        
    }     
   
  }
}
