
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using Boa.Constrictor.Screenplay;
using static System.Net.Mime.MediaTypeNames;
using System.Linq;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity 
{
   
public class ItentityTestServerAbility : IAbility
{
  HttpClient _client;
  string baseUrl = "/users";
  public ItentityTestServerAbility(HttpClient client)
  {
    _client = client;
  }

  public async Task CreateUser(string accesCode, string userName, string password, string passwordConfirmation)
  {
    
     var request = new StringContent(
        JsonSerializer.Serialize(new {
            AccessCode = accesCode, 
            UserName = userName, 
            Password = password, 
            PasswordConfirmation = passwordConfirmation
            }),
        System.Text.Encoding.UTF8,
        Application.Json
    ); 


        var response = await _client.PostAsync(baseUrl, request);
        if(!response.IsSuccessStatusCode) {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception(error);
        }            

    }

    public class UserInfo 
    {
        public string UserName {get; set; }
    }

    public async Task<IEnumerable<UserInfo>> GetUsers()
    {
        var response = await _client.GetAsync("/users");
        response.EnsureSuccessStatusCode();
        
        var users = await JsonSerializer.DeserializeAsync<IEnumerable<UserInfo>>(response.Content.ReadAsStream());
        return users;
    }
}
}

