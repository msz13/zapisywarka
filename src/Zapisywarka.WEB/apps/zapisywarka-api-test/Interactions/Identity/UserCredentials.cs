using NodaTime;
using TechTalk.SpecFlow.Assist.Attributes;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
     public class UserCredentials
  {
    string _userName;

    [TableAliases("Nazwa")]
    public string UserName
    {
      get
      {
        return _userName;
      }
      set
      {
        _userName = value + SystemClock.Instance.GetCurrentInstant().ToUnixTimeTicks();
      }
    }

    [TableAliases("Haslo")]
    public string Password { get; set; }

    [TableAliases("PotwierdzenieHasla")]
    public string PasswordConfirmation { get; set; }

  }
}

