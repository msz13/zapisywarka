
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using Boa.Constrictor.Screenplay;
using static System.Net.Mime.MediaTypeNames;
using System.Linq;
using static Zapisywarka.API.AcceptanceTests.Interactions.Identity.GetUserAccount;
using System.Net.Http.Json;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity 
{
   
internal class ItentityTestServerAbility : IAbility
{
  HttpClient _client;
  string _baseUrl = "/users";
  public ItentityTestServerAbility(HttpClient client)
  {
    _client = client;
  }

  public async Task CreateUser(string accesCode, string userName, string password, string passwordConfirmation)
  {         
        var request = new {
            AccessCode = accesCode, 
            UserName = userName, 
            Password = password, 
            PasswordConfirmation = passwordConfirmation
            };

        await _client.PostAsJsonAsync(_baseUrl, request);

    }

    internal async Task<UserInfo> GetUser(string accauntName)
    {
      var response = await _client.GetFromJsonAsync<UserInfo>($"/users/{accauntName}");
                        
        return response;
    }

   
}
}

