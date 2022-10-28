using System;
using Boa.Constrictor.Screenplay;
using Boa.Constrictor.WebDriver;

namespace ZapisywarkaApi.Test.Interactions.Registrations
{
  internal class LocateRegistrationForm
  {
    internal static ITask ViaURLForOfferId(string offerId)
    {
      return TestTask.Where($"Locate Registration Form with Id: {offerId}", Navigate.ToUrl($"http://localhost:4200/offers/{offerId}"));
    }
  }
}