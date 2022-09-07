using NodaTime;
using TechTalk.SpecFlow.Assist.Attributes;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Identity
{
  public class UserCredentials
  {
    string _userName = "John" + SystemClock.Instance.GetCurrentInstant().ToUnixTimeTicks();

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
    public string Password { get; set; } = "Password_01";

    [TableAliases("PotwierdzenieHasla")]
    public string PasswordConfirmation { get; set; } = "Password_01";

  }
}

